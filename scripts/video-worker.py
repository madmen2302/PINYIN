#!/usr/bin/env python3
"""
Video subtitle worker for Pinyin Reader.

Runs on a machine with a GPU (e.g. the home PC with an RTX 3070) and is reached
by the Tokyo VPS over Tailscale. Given a video URL it:

  1. Tries to pull existing Chinese captions with yt-dlp (manual subs first,
     then auto-captions), returned as SRT.
  2. If there are none and `transcribe` is set, extracts the audio with yt-dlp
     and transcribes it locally with faster-whisper (GPU) into an SRT — free and
     unlimited, no OpenAI cost.

It exposes one endpoint:  POST /extract  {"url": "...", "transcribe": true}
                          -> {"source": "captions"|"whisper", "title", "lang", "srt"}

Run it on the home PC (see scripts/video-worker.README.md for full setup):

    pip install flask yt-dlp faster-whisper
    # ffmpeg must be on PATH (audio path)
    WHISPER_MODEL=large-v3 python3 scripts/video-worker.py   # listens on :8723

Then, on the VPS, set VIDEO_WORKER_URL to this host over Tailscale, e.g.
    VIDEO_WORKER_URL=http://home-pc:8723
and `pm2 restart pinyin`.
"""

import os
import re
import tempfile
import traceback

from flask import Flask, request, jsonify
import yt_dlp

# ------------------------------------------------------------------ config
HOST = os.environ.get("VIDEO_WORKER_HOST", "0.0.0.0")
PORT = int(os.environ.get("VIDEO_WORKER_PORT", "8723"))
WHISPER_MODEL_NAME = os.environ.get("WHISPER_MODEL", "large-v3")
WHISPER_DEVICE = os.environ.get("WHISPER_DEVICE", "cuda")
WHISPER_COMPUTE = os.environ.get("WHISPER_COMPUTE", "float16")
# Optional: a cookies.txt exported from your browser, needed for some
# Bilibili / XHS / Douyin content. Set VIDEO_WORKER_COOKIES to its path.
COOKIES_FILE = os.environ.get("VIDEO_WORKER_COOKIES") or None
# Chinese subtitle language codes we accept, in order of preference.
ZH_LANGS = ["zh-Hans", "zh-CN", "zh", "zh-Hant", "zh-TW", "zh-HK"]

app = Flask(__name__)
_whisper_model = None  # lazy-loaded on first transcription


# ------------------------------------------------------------------ helpers
def _vtt_to_srt(vtt: str) -> str:
    """Minimal WebVTT -> SRT conversion (no ffmpeg needed for subtitles)."""
    lines = vtt.replace("\r", "").split("\n")
    out, idx, buf, in_cue = [], 1, [], False
    for ln in lines:
        if "-->" in ln:
            # normalise the timestamp separators and drop cue settings
            ts = ln.split(" -->")
            start = ts[0].strip()
            end = ts[1].strip().split(" ")[0] if len(ts) > 1 else ""
            def fix(t):
                t = t.replace(".", ",")
                return t if t.count(":") == 2 else "00:" + t  # pad mm:ss -> hh:mm:ss
            if buf:
                out.append("\n".join(buf)); out.append("")
                buf = []
            buf = [str(idx), f"{fix(start)} --> {fix(end)}"]
            idx += 1
            in_cue = True
        elif in_cue:
            if ln.strip() == "":
                if buf:
                    out.append("\n".join(buf)); out.append("")
                    buf = []
                in_cue = False
            else:
                # strip inline timing/formatting tags
                buf.append(re.sub(r"<[^>]+>", "", ln))
    if buf:
        out.append("\n".join(buf)); out.append("")
    return "\n".join(out)


def _pick_lang(track_map):
    """Return the first available Chinese language key from a yt-dlp sub map."""
    if not track_map:
        return None
    for want in ZH_LANGS:
        if want in track_map:
            return want
    # loose match: any key that starts with 'zh'
    for key in track_map:
        if key.lower().startswith("zh"):
            return key
    return None


def _ydl_base_opts(tmpdir):
    opts = {
        "quiet": True,
        "no_warnings": True,
        "outtmpl": os.path.join(tmpdir, "%(id)s.%(ext)s"),
        "socket_timeout": 30,
    }
    if COOKIES_FILE and os.path.exists(COOKIES_FILE):
        opts["cookiefile"] = COOKIES_FILE
    return opts


def _fetch_captions(url, tmpdir):
    """Return (srt_text, lang) if Chinese captions exist, else (None, None)."""
    probe_opts = _ydl_base_opts(tmpdir)
    probe_opts.update({"skip_download": True})
    with yt_dlp.YoutubeDL(probe_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    title = info.get("title") or "Video"

    manual = info.get("subtitles") or {}
    auto = info.get("automatic_captions") or {}
    lang = _pick_lang(manual)
    use_auto = False
    if not lang:
        lang = _pick_lang(auto)
        use_auto = True
    if not lang:
        return None, None, title

    dl_opts = _ydl_base_opts(tmpdir)
    dl_opts.update({
        "skip_download": True,
        "writesubtitles": not use_auto,
        "writeautomaticsub": use_auto,
        "subtitleslangs": [lang],
        "subtitlesformat": "srt/vtt/best",
    })
    with yt_dlp.YoutubeDL(dl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
    vid = info.get("id")

    # find the written subtitle file
    for ext in ("srt", "vtt"):
        path = os.path.join(tmpdir, f"{vid}.{lang}.{ext}")
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8", errors="ignore") as fh:
                text = fh.read()
            return (text if ext == "srt" else _vtt_to_srt(text)), lang, title
    # some extractors name the file slightly differently — scan the dir
    for name in os.listdir(tmpdir):
        if name.endswith(".srt") or name.endswith(".vtt"):
            with open(os.path.join(tmpdir, name), "r", encoding="utf-8", errors="ignore") as fh:
                text = fh.read()
            return (text if name.endswith(".srt") else _vtt_to_srt(text)), lang, title
    return None, None, title


def _srt_time(seconds: float) -> str:
    if seconds < 0:
        seconds = 0
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def _get_whisper():
    global _whisper_model
    if _whisper_model is None:
        from faster_whisper import WhisperModel  # imported lazily
        _whisper_model = WhisperModel(
            WHISPER_MODEL_NAME, device=WHISPER_DEVICE, compute_type=WHISPER_COMPUTE
        )
    return _whisper_model


def _transcribe_audio(url, tmpdir):
    """Download audio and transcribe with local faster-whisper. Returns (srt, title)."""
    opts = _ydl_base_opts(tmpdir)
    opts.update({
        "format": "bestaudio/best",
        "postprocessors": [{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}],
    })
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=True)
    title = info.get("title") or "Video"
    vid = info.get("id")
    audio_path = os.path.join(tmpdir, f"{vid}.mp3")
    if not os.path.exists(audio_path):
        # fall back to whatever audio file landed in the dir
        cands = [f for f in os.listdir(tmpdir) if f.startswith(str(vid))]
        if not cands:
            raise RuntimeError("Audio download failed.")
        audio_path = os.path.join(tmpdir, cands[0])

    model = _get_whisper()
    segments, _info = model.transcribe(audio_path, language="zh", vad_filter=True)
    blocks, idx = [], 1
    for seg in segments:
        text = (seg.text or "").strip()
        if not text:
            continue
        blocks.append(f"{idx}\n{_srt_time(seg.start)} --> {_srt_time(seg.end)}\n{text}\n")
        idx += 1
    return "\n".join(blocks), title


# ------------------------------------------------------------------ routes
@app.post("/extract")
def extract():
    data = request.get_json(silent=True) or {}
    url = (data.get("url") or "").strip()
    want_transcribe = bool(data.get("transcribe", True))
    if not re.match(r"^https?://\S+$", url):
        return jsonify({"error": "Invalid URL."}), 400

    with tempfile.TemporaryDirectory() as tmpdir:
        # 1) captions
        try:
            srt, lang, title = _fetch_captions(url, tmpdir)
            if srt and srt.strip():
                return jsonify({"source": "captions", "lang": lang, "title": title, "srt": srt})
        except Exception as e:  # noqa: BLE001
            traceback.print_exc()
            title = "Video"
            # fall through to transcription if allowed

        # 2) audio -> local whisper
        if not want_transcribe:
            return jsonify({"error": "No captions found (and transcription was disabled)."}), 404
        try:
            srt, title = _transcribe_audio(url, tmpdir)
            if not srt.strip():
                return jsonify({"error": "Transcription produced no text."}), 502
            return jsonify({"source": "whisper", "lang": "zh", "title": title, "srt": srt})
        except Exception as e:  # noqa: BLE001
            traceback.print_exc()
            return jsonify({"error": f"Extraction failed: {e}"}), 502


@app.get("/health")
def health():
    return jsonify({"ok": True, "model": WHISPER_MODEL_NAME, "device": WHISPER_DEVICE})


if __name__ == "__main__":
    print(f"video-worker listening on {HOST}:{PORT} (whisper={WHISPER_MODEL_NAME}/{WHISPER_DEVICE})")
    app.run(host=HOST, port=PORT, threaded=True)

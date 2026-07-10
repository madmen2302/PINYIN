# Video subtitle worker — setup

Paste a video URL (YouTube / Bilibili / 小红书 / Douyin) in the app's **Video link**
card and get a synced, tappable transcript with tone pinyin + English — the same
pipeline as the reader.

How it works: the browser sends the URL to the **Tokyo VPS** (`/video-subs`),
which forwards it over **Tailscale** to this **worker on your home PC (RTX 3070)**.
The worker pulls existing captions with `yt-dlp`; if there are none, it extracts
the audio and transcribes it locally with **faster-whisper** on the GPU (free,
unlimited — no OpenAI cost). The VPS uses an async job model so long
transcriptions never hit the reverse-proxy timeout; the client polls until done.

Running the extractor on the home PC (a residential IP) also avoids the
`HTTP 429 Too Many Requests` that YouTube throws at datacenter IPs like the VPS.

## 1. Home PC (the RTX 3070 box)

```bash
# Python deps (in a venv if you like)
pip install flask yt-dlp faster-whisper

# ffmpeg must be on PATH (needed for the audio->whisper path)
#   Windows: winget install Gyan.FFmpeg   |  macOS: brew install ffmpeg
#   Linux:   sudo apt install ffmpeg

# First run downloads the whisper model (large-v3 ≈ 3 GB). On an 8 GB 3070,
# large-v3 fits in float16; if VRAM is tight use WHISPER_MODEL=medium.
WHISPER_MODEL=large-v3 WHISPER_DEVICE=cuda python3 scripts/video-worker.py
# -> video-worker listening on 0.0.0.0:8723
```

Check it: `curl http://localhost:8723/health` → `{"ok": true, ...}`

Keep it running (e.g. `pm2 start "python3 scripts/video-worker.py" --name video-worker`,
an NSSM service on Windows, or a systemd unit).

### Optional env
- `WHISPER_MODEL` (default `large-v3`), `WHISPER_DEVICE` (`cuda`/`cpu`), `WHISPER_COMPUTE` (`float16`/`int8`).
- `VIDEO_WORKER_PORT` (default `8723`).
- `VIDEO_WORKER_COOKIES=/path/cookies.txt` — export cookies from your browser
  (e.g. the *Get cookies.txt* extension) for Bilibili/XHS/Douyin content that
  needs a login. YouTube usually needs none.

## 2. Tailscale

Both the home PC and the Tokyo VPS must be on the same tailnet.
- Home PC: install Tailscale, `tailscale up`. Note its name/IP (e.g. `home-pc`
  or `100.x.y.z`), and allow port 8723 through the local firewall.
- VPS: if it isn't already on the tailnet, install Tailscale and `tailscale up`.

## 3. Tokyo VPS (the app server)

Add to `.env`:

```
VIDEO_WORKER_URL=http://home-pc:8723      # Tailscale name or 100.x.y.z of the home PC
```

Then `pm2 restart pinyin`. (Without `VIDEO_WORKER_URL` the Video-link card
returns a clear "not configured" message — nothing else breaks.)

## Reality check
- **YouTube** — most reliable; captions + auto-captions.
- **Bilibili** — CC subs when present; some content needs cookies.
- **小红书 / Douyin** — usually no captions → falls back to GPU transcription;
  may need cookies. Expect this to be the flakiest source.
- Extractors break when sites change — keep `yt-dlp` updated (`pip install -U yt-dlp`).
- Downloading from these platforms is against their ToS; this is for personal
  language study.

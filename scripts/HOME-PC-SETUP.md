# Home-PC Video Worker — setup brief (for Claude Code on the 3070 box)

You are being asked to stand up the **video subtitle worker** for a Mandarin-
learning web app ("Pinyin Reader"). This machine (with an RTX 3070, Docker,
Tailscale, and a Whisper container already running) is the GPU worker. A remote
**VPS in Tokyo** runs the web app and will call this worker over Tailscale.

Your job: make one HTTP service reachable from the VPS that, given a video URL,
returns Chinese subtitles as **SRT** — pulling existing captions when they
exist, and otherwise transcribing the audio with the **Whisper container that is
already running on this machine** (reuse it; do not install a second Whisper).

Work through the steps, run the discovery commands, adapt the provided worker
script, verify end-to-end, and finish by reporting the one value the VPS needs.

---

## 1. The contract you must satisfy

The VPS calls the worker like this (over Tailscale, with up to a 30-minute
timeout):

```
POST  {VIDEO_WORKER_URL}/extract
Content-Type: application/json
{ "url": "<video url>", "transcribe": true }
```

Success response (HTTP 200):

```json
{ "source": "captions" | "whisper",
  "title":  "<video title>",
  "lang":   "zh-Hans",
  "srt":    "1\n00:00:01,000 --> 00:00:03,000\n你好世界\n\n2\n..." }
```

Error response: any non-200 with `{ "error": "<message>" }`.

Also expose `GET /health` → `{ "ok": true }`.

**SRT format requirements** (the app parses this):
- Standard SRT blocks: index line, `HH:MM:SS,mmm --> HH:MM:SS,mmm` (comma before
  milliseconds), then the text line(s), blank line between blocks.
- Text must be **Chinese** (the app keeps only lines containing Chinese
  characters and adds its own pinyin + English — see the critical note below).

### CRITICAL: transcribe, do NOT translate
When falling back to Whisper, run it in **transcribe** mode with
**language = Chinese (`zh`)** so the output is the original **Chinese** text.
Do **not** use Whisper's `translate` task (that would output English). The app
generates pinyin and its own English translation from the Chinese; it needs
Chinese characters in the SRT.

---

## 2. Get the worker code

```bash
git clone https://github.com/madmen2302/PINYIN.git
cd PINYIN
cat scripts/video-worker.py          # the reference implementation
cat scripts/video-worker.README.md   # the generic (in-process faster-whisper) path
```

`scripts/video-worker.py` is a small Flask service that already implements the
`/extract` contract and the yt-dlp caption path correctly. **As shipped it loads
faster-whisper in-process.** Your main change is to rewire its `_transcribe_audio`
function to call the **existing Whisper container** instead (Section 5).

You do not have to use this script — any service that satisfies Section 1 is
fine — but adapting it is the fast path.

---

## 3. Inventory the machine

Run these and note the results:

```bash
# core tools the worker/yt-dlp path need
python3 --version ; pip --version
yt-dlp --version    || echo "NEED yt-dlp"
ffmpeg -version | head -1 || echo "NEED ffmpeg"

# what Whisper is already running?
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
```

Install what's missing on the host (the worker shells out to nothing but Python;
yt-dlp uses ffmpeg for the audio path):

```bash
pip install flask yt-dlp requests
# ffmpeg: apt install ffmpeg  /  winget install Gyan.FFmpeg  /  brew install ffmpeg
```

---

## 4. Identify the running Whisper container's API

From `docker ps`, find the Whisper container and inspect it:

```bash
docker inspect <name> --format '{{.Config.Image}} | ports: {{json .NetworkSettings.Ports}}'
docker inspect <name> --format 'gpus: {{json .HostConfig.DeviceRequests}}'   # confirm GPU access
docker logs <name> --tail 40
```

Match the image to its transcription API (these are the common ones):

| Image (contains) | Transcription API | Gives SRT directly? |
|---|---|---|
| `onerahmet/openai-whisper-asr-webservice` | `POST /asr?task=transcribe&language=zh&output=srt` (multipart field `audio_file`) | **Yes** — returns SRT as the body |
| `fedirz/faster-whisper-server`, `speaches` | `POST /v1/audio/transcriptions` (OpenAI-compatible; `file`, `language=zh`, `response_format=srt`) | **Yes** with `response_format=srt` |
| `ahmetoner/whisper-asr-webservice` | same as onerahmet `/asr` | Yes |
| generic `openai/whisper` CLI in a container | `docker exec <name> whisper … --task transcribe --language zh --output_format srt` | Yes (writes a .srt file) |

Then **test it directly** with a short Chinese audio clip so you know the exact
call before wiring the worker. Example for the asr-webservice family:

```bash
# make a 10s test clip from any Chinese video (or use a local file)
yt-dlp -x --audio-format mp3 -o test.%(ext)s "<a short chinese youtube url>"
curl -s -F "audio_file=@test.mp3" \
  "http://localhost:<PORT>/asr?task=transcribe&language=zh&output=srt" | head
# expect SRT with Chinese lines + HH:MM:SS,mmm timestamps
```

For the OpenAI-compatible family:

```bash
curl -s http://localhost:<PORT>/v1/audio/transcriptions \
  -F file=@test.mp3 -F language=zh -F response_format=srt \
  -F model=Systran/faster-whisper-large-v3 | head
```

Record: the container's **host port**, the **exact endpoint + params** that
returned Chinese SRT, and whether GPU is actually being used
(`nvidia-smi` during a run, or the container logs).

---

## 5. Wire the worker to the existing container

Edit `scripts/video-worker.py`: replace the body of `_transcribe_audio(url, tmpdir)`
so that, after yt-dlp downloads the audio, it **POSTs the audio file to the
container's API** and returns the SRT. Remove the `faster_whisper` import / model
loading (`_get_whisper`) since you're not transcribing in-process.

Pattern (asr-webservice family — returns SRT as the response body):

```python
import requests
WHISPER_URL = os.environ.get("WHISPER_ASR_URL", "http://localhost:9000/asr")

def _transcribe_audio(url, tmpdir):
    # (keep the existing yt-dlp audio download that produces audio_path + title)
    with open(audio_path, "rb") as f:
        r = requests.post(
            WHISPER_URL,
            params={"task": "transcribe", "language": "zh", "output": "srt"},
            files={"audio_file": f},
            timeout=30 * 60,
        )
    r.raise_for_status()
    srt = r.text
    return srt, title
```

Pattern (OpenAI-compatible `/v1/audio/transcriptions`):

```python
def _transcribe_audio(url, tmpdir):
    with open(audio_path, "rb") as f:
        r = requests.post(
            os.environ["WHISPER_ASR_URL"],  # .../v1/audio/transcriptions
            data={"language": "zh", "response_format": "srt",
                  "model": os.environ.get("WHISPER_MODEL", "Systran/faster-whisper-large-v3")},
            files={"file": f}, timeout=30 * 60)
    r.raise_for_status()
    return r.text, title
```

Leave `_fetch_captions` (the yt-dlp caption path) unchanged — it already returns
clean SRT. If the container returns **VTT** instead of SRT, reuse the
`_vtt_to_srt` helper already in the file.

Sanity-check the SRT it produces: numbered blocks, `,`-millisecond timestamps,
Chinese text. If the container only returns plain text or JSON segments, build
the SRT from the segments using the `_srt_time()` helper already in the file.

---

## 6. Run the worker so the VPS can reach it

- Bind to **all interfaces** on port **8723** (the script already uses
  `0.0.0.0:8723`; keep it) so the Tailscale interface is included.
- Set the env for your container, e.g.
  `WHISPER_ASR_URL=http://localhost:9000/asr` (or the OpenAI-compatible URL).
- Keep it running: `pm2 start "python3 scripts/video-worker.py" --name video-worker`
  (or a systemd unit / Windows NSSM service).
- Open the host firewall for TCP **8723** (at least on the Tailscale interface).

---

## 7. Tailscale networking

```bash
tailscale status          # confirm this box is up; note its name + 100.x.y.z IP
tailscale ip -4           # the tailnet IPv4
```

- The worker must be reachable from the VPS at `http://<this-box>:8723`. Prefer
  the MagicDNS name (e.g. `http://home-pc:8723`) or the `100.x.y.z` IP.
- From another device on the tailnet (or ask the user to test from the VPS):
  `curl http://<this-box>:8723/health` → `{"ok": true}`.
- If it's unreachable: check the host firewall for 8723, that the worker bound to
  0.0.0.0 (not 127.0.0.1), and Tailscale ACLs.

---

## 8. Verify end-to-end (do this before handing off)

```bash
# a) captions path — a video that HAS Chinese subtitles
curl -s -X POST http://localhost:8723/extract -H 'Content-Type: application/json' \
  -d '{"url":"<chinese youtube url with CC>","transcribe":true}' | head -c 600
# expect {"source":"captions", ..., "srt":"1\n00:00:...,... 你好..."}

# b) whisper path — a short clip that has NO captions
curl -s -X POST http://localhost:8723/extract -H 'Content-Type: application/json' \
  -d '{"url":"<short no-caption clip>","transcribe":true}' | head -c 600
# expect {"source":"whisper", ..., "srt":"...Chinese lines..."}  (takes longer)
```

Confirm both return SRT with **Chinese text** and `,`-millisecond timestamps, and
that `nvidia-smi` shows the container using the GPU during (b).

---

## 9. Report back to configure the VPS

When it works, report to the user the single value to set on the **VPS**:

```
VIDEO_WORKER_URL=http://<this-box-tailscale-name-or-100.x.y.z>:8723
```

They will add it to the VPS `.env` and run `pm2 restart pinyin`. (The web app's
"Video link" card then hits `/video-subs` → this worker.) Also tell them whether
GPU transcription worked and any per-platform caveats you hit.

---

## Gotchas
- **GPU in Docker:** the Whisper container must have been started with `--gpus all`
  (or a compose `deploy.resources` GPU reservation) and the NVIDIA Container
  Toolkit installed, or it'll silently run on CPU (slow). Verify with `nvidia-smi`.
- **Model / VRAM:** `large-v3` fits on an 8 GB 3070 in float16/int8; if OOM, use
  `medium` or an `int8` compute type in the container's config.
- **Chinese, transcribe (not translate):** always `language=zh`, `task=transcribe`.
- **Cookies (Bilibili / 小红书 / Douyin):** some content needs a logged-in session.
  Export `cookies.txt` (browser extension) and set `VIDEO_WORKER_COOKIES=/path`
  — `scripts/video-worker.py` already passes it to yt-dlp. YouTube usually needs none.
- **Keep yt-dlp fresh:** `pip install -U yt-dlp` (sites change and break extraction).
- **XHS/Douyin** rarely have captions → they almost always take the Whisper path.

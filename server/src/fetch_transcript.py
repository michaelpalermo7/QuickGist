import sys, json, os, time, random
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled, NoTranscriptFound, VideoUnavailable,
    _errors
)

def extract_video_id(url_or_id: str) -> str:
    u = urlparse(url_or_id)
    if u.netloc in ("youtu.be", "www.youtu.be"):
        return u.path.strip("/")
    if "youtube.com" in u.netloc:
        if u.path.startswith("/watch"):
            return parse_qs(u.query).get("v", [""])[0]
        parts = [p for p in u.path.split("/") if p]
        if parts:
            return parts[-1]
    return url_or_id

def _get_proxy():
    """Pick random proxy if YT_PROXY_LIST exists, else single proxy."""
    proxy = os.getenv("YT_PROXY", "").strip()
    proxy_list = os.getenv("YT_PROXY_LIST", "").strip()
    if proxy_list:
        choices = [p.strip() for p in proxy_list.split(",") if p.strip()]
        if choices:
            return random.choice(choices)
    return proxy or None

def _proxies_dict(url: str | None):
    return {"http": url, "https": url} if url else None

def main():
    data = json.loads(sys.stdin.read() or "{}")
    url = data.get("url", "")
    langs = data.get("languages") or ["en", "en-US", "en-GB"]

    if not url:
        print(json.dumps({"error": "No URL provided"}))
        sys.exit(2)

    video_id = extract_video_id(url)
    proxy_url = _get_proxy()

    attempts = int(os.getenv("YT_RETRY_ATTEMPTS", "3"))
    base_delay_ms = int(os.getenv("YT_RETRY_BASE_MS", "300"))

    last_err = None
    for i in range(attempts):
        try:
            fetched = YouTubeTranscriptApi.get_transcript(
                video_id, languages=langs, proxies=_proxies_dict(proxy_url)
            )
            out = [{
                "text": s["text"].replace("\n", " ").strip(),
                "start": float(s["start"]),
                "duration": float(s.get("duration", 0.0)),
            } for s in fetched]
            print(json.dumps({"videoId": video_id, "segments": out}, ensure_ascii=False))
            return
        except (_errors.RequestBlocked, _errors.IPBlocked) as e:
            last_err = {"type": "YOUTUBE_BLOCKED", "message": str(e)}
        except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable) as e:
            print(json.dumps({"videoId": video_id, "segments": [], "error": str(e)}))
            sys.exit(1)
        except Exception as e:
            last_err = {"type": "GENERIC_ERROR", "message": str(e)}

        delay = (base_delay_ms * (2 ** i)) + random.randint(0, 150)
        time.sleep(delay / 1000.0)

    if last_err and last_err["type"] == "YOUTUBE_BLOCKED":
        print(json.dumps({
            "videoId": video_id,
            "segments": [],
            "error": "RequestBlocked",
            "errorType": "YOUTUBE_BLOCKED"
        }))
        sys.exit(3)

    print(json.dumps({
        "videoId": video_id,
        "segments": [],
        "error": last_err["message"] if last_err else "Unknown error"
    }))
    sys.exit(1)

if __name__ == "__main__":
    main()

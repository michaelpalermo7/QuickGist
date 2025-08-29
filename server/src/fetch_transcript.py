import sys, json, os, time, random
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound, VideoUnavailable
from youtube_transcript_api.proxies import WebshareProxyConfig

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

def make_api() -> YouTubeTranscriptApi:
    """Initialize API with Webshare proxy if creds exist."""
    username = os.getenv("WEBSHARE_USER", "").strip()
    password = os.getenv("WEBSHARE_PASS", "").strip()
    countries = os.getenv("WEBSHARE_COUNTRIES", "").strip()

    if username and password:
        proxy_cfg = WebshareProxyConfig(
            proxy_username=username,
            proxy_password=password,
            filter_ip_locations=[c.strip() for c in countries.split(",") if c.strip()] if countries else None
        )
        return YouTubeTranscriptApi(proxy_config=proxy_cfg)
    return YouTubeTranscriptApi()

def main():
    data = json.loads(sys.stdin.read() or "{}")
    url = data.get("url", "")
    langs = data.get("languages") or ["en", "en-US", "en-GB"]

    if not url:
        print(json.dumps({"error": "No URL provided"}))
        sys.exit(2)

    video_id = extract_video_id(url)
    api = make_api()

    attempts = int(os.getenv("YT_RETRY_ATTEMPTS", "3"))
    base_delay_ms = int(os.getenv("YT_RETRY_BASE_MS", "300"))

    last_err = None
    for i in range(attempts):
        try:
            fetched = api.fetch(video_id, languages=langs)
            out = [{
                "text": s.text.replace("\n", " ").strip(),
                "start": float(s.start),
                "duration": float(getattr(s, "duration", 0.0)),
            } for s in fetched]
            print(json.dumps({"videoId": video_id, "segments": out}, ensure_ascii=False))
            return
        except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable) as e:
            # subtitles disabled / video unavailable
            print(json.dumps({"videoId": video_id, "segments": [], "error": str(e)}))
            sys.exit(1)
        except Exception as e:
            last_err = str(e)
            if i < attempts - 1:
                delay = (base_delay_ms * (2 ** i)) + random.randint(0, 150)
                time.sleep(delay / 1000.0)

    print(json.dumps({
        "videoId": video_id,
        "segments": [],
        "error": last_err or "Unknown error"
    }))
    sys.exit(1)

if __name__ == "__main__":
    main()

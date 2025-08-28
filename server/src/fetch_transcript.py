import sys, json
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound, VideoUnavailable

def extract_video_id(url_or_id: str) -> str:
    """
    Extracts the YouTube video ID from either a full URL or a raw ID string.
    This ensures downstream code always gets a clean video ID.
    """
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

def main():
    """
    Reads URL and language options from stdin, fetches the transcript, 
    and prints structured JSON so the Node.js process can consume it.
    """
    data = json.loads(sys.stdin.read() or "{}")
    url = data.get("url", "")
    langs = data.get("languages") or ["en", "en-US", "en-GB"]

    if not url:
        print(json.dumps({"error": "No URL provided"}))
        sys.exit(2)

    video_id = extract_video_id(url)
    api = YouTubeTranscriptApi()

    try:
        fetched = api.fetch(video_id, languages=langs)
        out = [{
            "text": s.text.replace("\n", " ").strip(),
            "start": float(s.start),
            "duration": float(getattr(s, "duration", 0.0)),
        } for s in fetched]
        print(json.dumps({"videoId": video_id, "segments": out}, ensure_ascii=False))
    except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable) as e:
        print(json.dumps({"videoId": video_id, "segments": [], "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

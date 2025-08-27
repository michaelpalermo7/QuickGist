import { FormEvent } from "react";
import { api } from "../api/client";

export const SubmitVideoUrl = async (event: FormEvent, videoUrl: string) => {
  event.preventDefault();

  const part1 = "youtube.com/watch?v=";
  const part2 = "youtu.be/";

  if (!videoUrl.includes(part1) && !videoUrl.includes(part2)) {
    alert("Not a valid YouTube URL");
    return null;
  }

  // NEW: call the REST /summarize endpoint
  const { data } = await api.post("/summarize", { url: videoUrl });
  // data looks like: { videoId, summary }
  return data;
};

// (Optional) if you also want raw transcript in other screens:
export const FetchTranscript = async (event: FormEvent, videoUrl: string) => {
  event.preventDefault();
  const { data } = await api.post("/transcript", { url: videoUrl });
  // data looks like: { videoId, segments: [{ text, start, duration }, ...] }
  return data;
};

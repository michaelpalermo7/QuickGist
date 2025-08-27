// controllers/transcriptController.ts
import { Request, Response } from "express";
import { getTranscriptData } from "../services/transcriptService";
import { summarizeText } from "../services/summarizeService";

export async function getTranscript(
  req: Request,
  res: Response
): Promise<void> {
  const { url } = req.body;
  console.log("[getTranscript] url=", url); // debug

  try {
    const data = await getTranscriptData(url);
    console.log("[getTranscript] transcript length=", data?.segments?.length); // debug
    res.status(200).json(data);
  } catch (e: any) {
    console.error("[getTranscript] error:", e); // debug
    res.status(500).json({
      message: "Transcript fetch failed",
      error: e.message || String(e),
    });
  }
}

export async function summarizeTranscript(
  req: Request,
  res: Response
): Promise<void> {
  const { url } = req.body;
  console.log("[summarizeTranscript] url=", url); // debug

  try {
    const data = await getTranscriptData(url);
    console.log(
      "[summarizeTranscript] segments length=",
      data?.segments?.length
    ); // debug

    const fullText = data.segments.map((s: any) => s.text).join(" ");
    console.log("[summarizeTranscript] fullText chars=", fullText.length); // debug

    const summary = await summarizeText(fullText);
    console.log("[summarizeTranscript] summary length=", summary?.length || 0); // debug

    res.status(200).json({ videoId: data.videoId, summary });
  } catch (e: any) {
    console.error("[summarizeTranscript] error:", e); // debug
    res.status(500).json({
      message: "Summarization failed",
      error: e.message || String(e),
    });
  }
}

import { Request, Response } from "express";
import { getTranscriptData } from "../services/transcriptService";
import { summarizeTextToJSON } from "../services/summarizeService";

/**
 * Handles transcript fetch requests.
 * Returns raw transcript JSON so the client can view or further process it.
 */
export async function getTranscript(
  req: Request,
  res: Response
): Promise<void> {
  const { url } = req.body;
  console.log("[getTranscript] url=", url);

  try {
    const data = await getTranscriptData(url);
    res.status(200).json(data);
  } catch (e: any) {
    console.error("[getTranscript] error:", e);
    res
      .status(500)
      .json({ message: "Transcript fetch failed", error: e.message });
  }
}

/**
 * Handles summarization requests.
 * Fetches transcript first, then produces structured JSON summary.
 */
export async function summarizeTranscript(
  req: Request,
  res: Response
): Promise<void> {
  const { url } = req.body;
  console.log("[summarizeTranscript] url=", url);

  try {
    const data = await getTranscriptData(url);
    const fullText = data.segments.map((s: any) => s.text).join(" ");
    console.log("[summarizeTranscript] fullText chars=", fullText.length);

    const summaryText = await summarizeTextToJSON(fullText, data.title);
    res.status(200).json({ videoId: data.videoId, summary: summaryText });
  } catch (e: any) {
    console.error("[summarizeTranscript] error:", e);
    res.status(500).json({ message: "Summarization failed", error: e.message });
  }
}

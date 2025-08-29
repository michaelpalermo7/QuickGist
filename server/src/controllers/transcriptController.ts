import { Request, Response } from "express";
import { runPython } from "../utils/pythonHelper";
import { summarizeTextToJSON } from "../services/summarizeService";

/**
 * Handles transcript fetch requests.
 * Returns raw transcript JSON so the client can view or process it.
 */
export async function getTranscript(
  req: Request,
  res: Response
): Promise<void> {
  const { url } = req.body;
  console.log("[getTranscript] url=", url);

  try {
    const data = await runPython(url);
    if (!data?.segments?.length) {
      res.status(400).json({ message: "Transcript unavailable", ...data });
      return;
    }
    res.status(200).json(data);
  } catch (e: any) {
    console.error("[getTranscript] error:", e);
    res.status(e.httpStatus || 500).json({
      message: "Transcript fetch failed",
      error: e.message,
      ...(e.body || {}),
    });
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
  console.log("[summarizeTranscript] body=", req.body);
  const { url } = req.body;
  console.log("[summarizeTranscript] url=", url);

  try {
    const data = await runPython(url);
    if (!data?.segments?.length) {
      res.status(400).json({ message: "Transcript unavailable", ...data });
      return;
    }

    const fullText = data.segments.map((s: any) => s.text).join(" ");
    const summaryText = await summarizeTextToJSON(fullText, data.title);

    res.status(200).json({ videoId: data.videoId, summary: summaryText });
  } catch (e: any) {
    console.error("[summarizeTranscript] error:", e);
    res.status(e.httpStatus || 500).json({
      message: "Summarization failed",
      error: e.message,
      ...(e.body || {}),
    });
  }
}

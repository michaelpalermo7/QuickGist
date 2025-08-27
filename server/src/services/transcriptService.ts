import { runPython } from "../utils/pythonHelper";

/**
 * Fetches raw transcript JSON from the Python helper.
 * @param url YouTube video URL
 * @returns { videoId, segments: [{ text, start, duration }] }
 */
export async function getTranscriptData(url: string) {
  if (!url) {
    throw new Error("No URL provided");
  }

  // Calls Python script and returns the parsed JSON
  const data = await runPython(url);
  return data;
}

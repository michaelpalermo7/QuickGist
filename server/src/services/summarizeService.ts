// src/services/summarizeService.ts
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Final JSON shape sent to the frontend (no import required) */
type FinalSummary = {
  title: string;
  executive_summary: string; // 1 compact paragraph (4–6 sentences)
  key_highlights: string[]; // 5–8 concise bullets
  core_insights: string[]; // 4–6 concise bullets
  actionable_takeaways: string[]; // 3–5 practical bullets
};

/** ---- Tunables ---- */
const CHUNK_MAX_WORDS = 1600; // fewer chunks → fewer API calls
const CHUNK_CONCURRENCY = 4; // summarize chunks in parallel (batch of 4)
const CHUNK_MAX_TOKENS = 600; // shorter per-chunk output = cheaper/faster
const MERGE_MAX_TOKENS = 2200; // room for final structured JSON

const CHUNK_MODEL = "gpt-4o-mini";
const MERGE_MODEL = "gpt-4o-mini";

/** ---- Prompts (hoisted for tiny perf win) ---- */
const CHUNK_SYSTEM_PROMPT = `
You are a professional summarizer. Summarize this text in 2–4 sentences.
No markdown, no lists, no sections—just a cohesive paragraph.
`.trim();

const MERGE_SYSTEM_PROMPT = `
You are a professional video summarizer.
Merge the provided chunk summaries into ONE JSON object with EXACT fields:

{
  "title": string,                    // video title or a clear inferred one
  "executive_summary": string,        // 1 paragraph (4–6 sentences), no bullets
  "key_highlights": string[],         // 5–8 concise bullets (one sentence each)
  "core_insights": string[],          // 4–6 concise bullets (deeper ideas)
  "actionable_takeaways": string[]    // 3–5 practical, imperative bullets
}

Rules:
- Output ONLY raw JSON (no backticks, no markdown).
- Avoid repetition; cover the full arc of the video beginning to end.
- Keep bullets short and informative (one sentence each).
`.trim();

/** Split transcript into chunks by word count */
function chunkTranscript(text: string, maxWords = CHUNK_MAX_WORDS): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }
  return chunks;
}

/** Summarize one chunk in plain prose (no formatting) */
async function summarizeChunkPlain(chunk: string): Promise<string> {
  const resp = await openAi.chat.completions.create({
    model: CHUNK_MODEL,
    temperature: 0.3,
    max_tokens: CHUNK_MAX_TOKENS,
    messages: [
      { role: "system", content: CHUNK_SYSTEM_PROMPT },
      { role: "user", content: chunk },
    ],
  });
  return resp.choices[0]?.message?.content?.trim() || "";
}

/** Simple batching with Promise.all for concurrency */
async function summarizeChunksBatched(chunks: string[]): Promise<string[]> {
  const out: string[] = [];
  for (let i = 0; i < chunks.length; i += CHUNK_CONCURRENCY) {
    const batch = chunks.slice(i, i + CHUNK_CONCURRENCY);
    const results = await Promise.all(batch.map(summarizeChunkPlain));
    out.push(...results);
  }
  return out;
}

/** Merge many plain chunk summaries into ONE structured JSON */
async function mergeSummariesToJSON(
  summaries: string[],
  videoTitle?: string
): Promise<FinalSummary> {
  const user = [
    videoTitle ? `Title: ${videoTitle}` : "",
    "Chunk summaries:",
    summaries.join("\n\n"),
  ].join("\n\n");

  const resp = await openAi.chat.completions.create({
    model: MERGE_MODEL, // consider "gpt-4o" here for higher quality, same API
    temperature: 0.25,
    max_tokens: MERGE_MAX_TOKENS,
    messages: [
      { role: "system", content: MERGE_SYSTEM_PROMPT },
      { role: "user", content: user },
    ],
  });

  const raw = (resp.choices[0]?.message?.content || "").trim();
  // Remove accidental code fences if present
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "");

  try {
    const parsed = JSON.parse(cleaned);
    // Minimal shape guard & normalization
    return {
      title: String(parsed.title || videoTitle || "Video Summary"),
      executive_summary: String(parsed.executive_summary || "").trim(),
      key_highlights: Array.isArray(parsed.key_highlights)
        ? parsed.key_highlights.map(String)
        : [],
      core_insights: Array.isArray(parsed.core_insights)
        ? parsed.core_insights.map(String)
        : [],
      actionable_takeaways: Array.isArray(parsed.actionable_takeaways)
        ? parsed.actionable_takeaways.map(String)
        : [],
    };
  } catch {
    // Safe fallback
    return {
      title: videoTitle || "Video Summary",
      executive_summary:
        "A structured summary could not be parsed from the model response.",
      key_highlights: [],
      core_insights: [],
      actionable_takeaways: [],
    };
  }
}

/** Public entry: Chunk → summarize each (batched) → merge into structured JSON */
export async function summarizeTextToJSON(
  fullText: string,
  videoTitle?: string
): Promise<FinalSummary> {
  // Trim & normalize whitespace to save tokens
  const text = (fullText || "").replace(/\s+/g, " ").trim();

  if (!text) {
    return {
      title: videoTitle || "Video Summary",
      executive_summary: "No transcript available.",
      key_highlights: [],
      core_insights: [],
      actionable_takeaways: [],
    };
  }

  // 1) Split into chunks
  const chunks = chunkTranscript(text);

  // 2) Summarize each chunk (in parallel batches)
  const parts = await summarizeChunksBatched(chunks);

  // 3) Merge into final structured JSON
  return await mergeSummariesToJSON(parts, videoTitle);
}

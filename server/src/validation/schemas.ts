import { z } from "zod";

// supports both full URLs and raw video IDs
const youTubeLike = (s: string) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(s) ||
  /^[\w-]{11}$/.test(s);

/**
 * Schema for summarization requests.
 * Ensures we always get a valid YouTube URL or ID so backend work isn't wasted.
 */
export const SummarizeBodySchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "url is required")
    .refine(youTubeLike, "Must be a YouTube URL or video id"),
  languages: z.array(z.string()).optional(),
});

/** Reuse same schema for transcript-only requests to keep API consistent */
export const TranscriptBodySchema = SummarizeBodySchema;

import { z } from "zod";

// very light YouTube URL/ID guard
const youTubeLike = (s: string) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(s) ||
  /^[\w-]{11}$/.test(s); // raw video id

export const SummarizeBodySchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "url is required")
    .refine(youTubeLike, "Must be a YouTube URL or video id"),
  languages: z.array(z.string()).optional(),
});

export const TranscriptBodySchema = SummarizeBodySchema;

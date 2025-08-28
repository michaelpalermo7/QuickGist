/** Response shape for summarization so UI always knows video + summary text */
export type SummarizeResponse = { videoId: string; summary: string };

/** Raw transcript format for feeding into summarization */
export type TranscriptResponse = {
  videoId: string;
  segments: Array<{ text: string; start: number; duration: number }>;
};

/** Structured error so frontend can show field-level validation messages */
export type ValidationError = {
  message: "Validation error";
  issues: Array<{ path: string; message: string }>;
};

// src/services/api/types.ts
export type SummarizeResponse = { videoId: string; summary: string };
export type TranscriptResponse = {
  videoId: string;
  segments: Array<{ text: string; start: number; duration: number }>;
};

export type ValidationError = {
  message: "Validation error";
  issues: Array<{ path: string; message: string }>;
};

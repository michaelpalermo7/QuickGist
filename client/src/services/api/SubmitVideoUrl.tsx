import { FormEvent } from "react";
import { api } from "../api/client";
import type { SummarizeResponse } from "./types";

/**
 * Handles video URL submission from the form.
 * Ensures UI gets either structured summary data or a clear error message.
 */
export const SubmitVideoUrl = async (
  event: FormEvent,
  videoUrl: string
): Promise<SummarizeResponse | string | null> => {
  event.preventDefault();

  try {
    const { data } = await api.post<SummarizeResponse>("/api/summarize", {
      url: videoUrl,
    });
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    // map server errors to human-friendly messages for the user
    if (status === 400) {
      return "Not a valid YouTube URL";
    }
    return "Could not summarize video";
  }
};

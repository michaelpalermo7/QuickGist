// src/services/api/SubmitVideoUrl.ts
import { FormEvent } from "react";
import { api } from "../api/client";
import type { SummarizeResponse } from "./types";

export const SubmitVideoUrl = async (
  event: FormEvent,
  videoUrl: string
): Promise<SummarizeResponse | string | null> => {
  event.preventDefault();

  try {
    const { data } = await api.post<SummarizeResponse>("/summarize", {
      url: videoUrl,
    });
    return data; // success → returns { videoId, summary }
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 400) {
      return "Not a valid YouTube URL"; // <--- fixed message
    }
    return "Could not summarize video"; // <--- fallback message
  }
};

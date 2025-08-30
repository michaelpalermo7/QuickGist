import React, { useState, FormEvent } from "react";
import { SubmitVideoUrl } from "../services/api/SubmitVideoUrl";
import { StructuredSummary } from "../types/summary";
import { SubmitButton } from "./SubmitButton";
import FeatureBullets from "./FeatureBullets";

interface PromptUrlProps {
  setSummary: React.Dispatch<React.SetStateAction<StructuredSummary | string>>;
}

export const PromptUrl = ({ setSummary }: PromptUrlProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await SubmitVideoUrl(event, videoUrl);

      if (typeof result === "string") {
        setSummary(result);
      } else if (result?.summary) {
        setSummary(result.summary);
      } else {
        setSummary("No summary available.");
      }
    } catch {
      setSummary("Could not summarize video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-[470px] md:min-h-[510px] p-6 md:p-8 rounded-2xl shadow-xl bg-[var(--bg-card)] backdrop-blur border border-green-400/20 flex flex-col">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-wide">
        Enter a URL
      </h1>

      <div className="mt-5 flex-1 flex">
        <form onSubmit={SubmitHandler} className="w-full space-y-3">
          <input
            type="text"
            placeholder="Enter YouTube URL..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0b1730] border border-[#1e2a44] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] placeholder-[var(--text-muted)]"
            disabled={loading}
          />

          <div className="mt-1">
            <SubmitButton loading={loading} />
          </div>
          <div className="mt-1">
            <FeatureBullets />
          </div>
        </form>
      </div>
    </div>
  );
};

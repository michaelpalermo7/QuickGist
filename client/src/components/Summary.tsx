import React from "react";
import type { StructuredSummary } from "../types/summary";

function isStructured(x: any): x is StructuredSummary {
  return (
    x &&
    typeof x === "object" &&
    typeof x.executive_summary === "string" &&
    Array.isArray(x.key_highlights) &&
    Array.isArray(x.core_insights) &&
    Array.isArray(x.actionable_takeaways)
  );
}

export const Summary = ({
  summary,
}: {
  summary: StructuredSummary | string;
}) => {
  // Allow backend to return JSON as a string
  const data: StructuredSummary | null =
    typeof summary === "string"
      ? (() => {
          try {
            return JSON.parse(summary) as StructuredSummary;
          } catch {
            return null;
          }
        })()
      : isStructured(summary)
      ? summary
      : null;

  // Fallback: plain string
  if (!data) {
    return (
      <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl h-[420px] md:h-[460px] p-6 md:p-8 mt-12 md:mt-8 mx-auto rounded-2xl shadow-xl bg-[var(--bg-card)] backdrop-blur flex flex-col">
        <div className="flex-1 rounded-lg overflow-y-auto">
          <p className="text-[var(--text-muted)] text-base leading-7 whitespace-pre-wrap">
            {typeof summary === "string" ? summary : "No summary available."}
          </p>
        </div>
      </div>
    );
  }

  // Pretty, bot-style rendering
  return (
    <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl p-6 md:p-8 mt-12 md:mt-8 mx-auto rounded-2xl shadow-xl bg-[var(--bg-card)] backdrop-blur">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {data.title || "Video Summary"}
      </h2>

      {/* Executive Summary */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          📹 Executive Summary
        </h3>
        <p className="text-[var(--text-muted)] text-base leading-7 whitespace-pre-wrap">
          {data.executive_summary}
        </p>
      </section>

      {/* Key Highlights */}
      {!!data.key_highlights.length && (
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            ✨ Key Highlights
          </h3>
          <ul className="space-y-1">
            {data.key_highlights.map((item, i) => (
              <li
                key={i}
                className="text-[var(--text-muted)] text-base leading-7"
              >
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Core Insights */}
      {!!data.core_insights.length && (
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            💡 Core Insights
          </h3>
          <ul className="space-y-1">
            {data.core_insights.map((item, i) => (
              <li
                key={i}
                className="text-[var(--text-muted)] text-base leading-7"
              >
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Actionable Takeaways */}
      {!!data.actionable_takeaways.length && (
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">
            🎯 Actionable Takeaways
          </h3>
          <ul className="space-y-1">
            {data.actionable_takeaways.map((item, i) => (
              <li
                key={i}
                className="text-[var(--text-muted)] text-base leading-7"
              >
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

// src/types/summary.ts

// Bot-style outline (no timestamps)
export type StructuredSummary = {
  title: string;
  executive_summary: string; // 1 compact paragraph (4–6 sentences)
  key_highlights: string[]; // 5–8 concise bullets (emojis allowed)
  core_insights: string[]; // 4–6 concise bullets (deeper ideas)
  actionable_takeaways: string[]; // 3–5 practical bullets (imperative)
};

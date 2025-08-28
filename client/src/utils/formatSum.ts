import type { StructuredSummary } from "../types/summary";

export function toMarkdown(summary: StructuredSummary | string): string {
  if (typeof summary === "string") {
    return `# Summary\n\n${summary}`;
  }

  const {
    title,
    executive_summary,
    key_highlights,
    core_insights,
    actionable_takeaways,
  } = summary;

  const section = (name: string, items: string[]) =>
    items.length
      ? `\n## ${name}\n` + items.map((i) => `- ${i}`).join("\n")
      : "";

  return [
    `# ${title || "Video Summary"}`,
    `\n${executive_summary}`,
    section("Key Highlights", key_highlights),
    section("Core Insights", core_insights),
    section("Actionable Takeaways", actionable_takeaways),
  ].join("\n\n");
}

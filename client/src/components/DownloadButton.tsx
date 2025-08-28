// src/components/DownloadSummaryButton.tsx
import React from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadText } from "../utils/downloads";
import { toMarkdown } from "../utils/formatSum";
import type { StructuredSummary } from "../types/summary";

type Props = {
  summary: StructuredSummary | string;
  filename?: string;
};

export const DownloadSummaryButton: React.FC<Props> = ({
  summary,
  filename = "summary.md",
}) => {
  const handleDownload = () => {
    const content = toMarkdown(summary);
    downloadText(filename, content);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      disabled={!summary}
      sx={{
        borderColor: "#1e88e5",
        color: "#1e88e5",
        textTransform: "none",
        fontWeight: 600,
        "&:hover": {
          borderColor: "#1565c0",
          backgroundColor: "rgba(21,101,192,0.08)",
        },
      }}
    >
      Download Summary
    </Button>
  );
};

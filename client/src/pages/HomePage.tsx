import React, { useState } from "react";
import { PromptUrl } from "../components/PromptUrl";
import { Summary } from "../components/Summary";
import { PageBackground } from "../components/PageBackground";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

export const HomePage = () => {
  const [summary, setSummary] = useState(
    "Summary of the video will appear here..."
  );

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Hero />
      <PageBackground />

      <main className="relative flex flex-col min-h-[calc(100vh-64px)]">
        <div className="flex flex-col flex-1 items-center justify-center px-4 sm:px-6 md:px-8 py- md:py-12 space-y-16">
          <PromptUrl setSummary={setSummary} />
          <Summary summary={summary} />
        </div>
      </main>
    </div>
  );
};

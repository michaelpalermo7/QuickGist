import React, { useState } from "react";
import { PromptUrl } from "../components/PromptUrl";
import { Summary } from "../components/Summary";
import { PageBackground } from "../components/PageBackground";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import type { StructuredSummary } from "../types/summary";
import Chips from "../components/Chips";
import Footer from "../components/Footer";
import CountUp from "../components/CountUp";

export const HomePage = () => {
  const [summary, setSummary] = useState<StructuredSummary | string>(
    "Summary of the video will appear here..."
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar />
      <PageBackground />

      <div className="mt-10 flex justify-center items-center">
        <Chips />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
        <Hero />
      </div>

      <main className="relative flex-1 mt-10">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <PromptUrl setSummary={setSummary} />
            </div>

            <div className="lg:col-span-7">
              <Summary summary={summary} />
            </div>
          </div>
        </section>

        <section
          aria-label="Stats"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12"
        >
          <div className="w-full flex justify-center">
            <div className="text-center">
              <CountUp />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

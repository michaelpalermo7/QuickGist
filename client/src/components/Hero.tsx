import React from "react";

export const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center py-0 mt-15 space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-white leading-snug max-w-3xl mx-auto">
        Turn Any Youtube Video Into A{" "}
        <span className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
          Cohesive Summary
        </span>{" "}
        Using{" "}
        <span className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
          AI
        </span>
      </h1>

      <p className="text-lg sm:text-md text-[var(--text-muted)] max-w-2xl mx-auto">
        Quickly extract insights from videos without watching hours of content.
      </p>
    </section>
  );
};

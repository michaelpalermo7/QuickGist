import React from "react";

export const PageBackground = () => {
  return (
    <section
      style={{
        backgroundImage:
          "radial-gradient(100% 140% at 50% 0%, #1e3a8a 0%, #0b1220 70%)",
      }}
      className="absolute inset-0 z-[-1] max-h-screen bg-[#0b1220]"
      aria-hidden="true"
    />
  );
};

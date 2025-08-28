import React from "react";

import { Navbar } from "../components/Navbar";
import { PageBackground } from "../components/PageBackground";

export const LoginPage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <PageBackground />

      <main className="relative flex flex-col min-h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            <h1 className="text-center text-6xl mt-30">Coming Soon.</h1>
          </div>
        </div>
      </main>
    </div>
  );
};

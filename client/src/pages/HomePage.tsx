import React from 'react';

import { PromptUrl } from "../components/PromptUrl";
import { Summary } from "../components/Summary";
import { PageBackground } from "../components/PageBackground";
import { useState } from "react";
import { Navbar } from "../components/Navbar";


export const HomePage = () => {
    const [summary, setSummary] = useState("Summary of the video will appear here...");

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col h-full overflow-hidden"> 
        <PageBackground/>

      <div className="flex gap-x-2 h-full pb-3 pt-3">
        
        <div className="flex items-start justify-center w-1/2 bg-transparent p-6">
          <PromptUrl setSummary={setSummary} />
        </div>

        <div className="w-1/2 bg-transparent p-6">
          <Summary summary={summary} />
        </div>
      </div>
    </div>
    </div>
  );
};

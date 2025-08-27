// src/services/summarizeService.ts
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeText(fullText: string): Promise<string> {
  const completion = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You will summarize the transcript professionally.",
      },
      { role: "user", content: fullText },
    ],
    temperature: 0.3,
  });
  return completion.choices[0]?.message?.content ?? "";
}

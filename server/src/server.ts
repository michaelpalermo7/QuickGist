import express, { Request, Response } from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const responseGenerate = async (prompt: string) => {
    const completion = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You will summarize the transcript of a youtube video provided by the user. You are professional and informative."},
        {"role": "user", "content": `Write a half-page summary that is specific and encompasses all important events for the following youtube video transcript: "${prompt}"`}
      ]
    });

    return completion.choices[0].message.content;
};


app.post("/api", async (req: Request, res: Response) => {
    const { url } = req.body;

    console.log(url)

  if (url) {
    const transcript = await YoutubeTranscript.fetchTranscript(url,{ lang: 'en' });

    const cleanedTexts = transcript.map((entry: { text: string }) => {
        return entry.text
        .replace(/\/n/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    });

    const joinedText = cleanedTexts.join(" ");

    const aiOutput  = await responseGenerate(joinedText)

    res.status(201).json({
        message: "AI output created successfully.",
        aiOutput,
      });
  } else {
    res.status(400).json({ message: "No URL provided" });
  }
});

app.listen(5001, () => {
    console.log('Server started on port 5001.');
});
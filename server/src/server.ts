import express, { Request, Response } from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
app.use(cors());
app.use(express.json());


app.post("/api", async (req: Request, res: Response) => {
    const { url } = req.body;

    console.log(url)

  if (url) {
    const transcript = await YoutubeTranscript.fetchTranscript(url,{ lang: 'en' });
    res.status(200).json({ transcript });
  } else {
    res.status(400).json({ message: "No URL provided" });
  }
});

app.listen(5001, () => {
    console.log('Server started on port 5001.');
});
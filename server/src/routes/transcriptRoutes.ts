import { Router } from "express";
import {
  getTranscript,
  summarizeTranscript,
} from "../controllers/transcriptController";

const router = Router();

router.post("/transcript", getTranscript);
router.post("/summarize", summarizeTranscript);

export default router;

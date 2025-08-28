// src/routes/transcriptRoutes.ts
import { Router } from "express";
import {
  getTranscript,
  summarizeTranscript,
} from "../controllers/transcriptController";
import { validate } from "../middleware/validate";
import {
  TranscriptBodySchema,
  SummarizeBodySchema,
} from "../validation/schemas";

const router = Router();

router.post("/transcript", validate(TranscriptBodySchema), getTranscript);
router.post("/summarize", validate(SummarizeBodySchema), summarizeTranscript);

export default router;

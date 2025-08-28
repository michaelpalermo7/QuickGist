import express from "express";
import cors from "cors";
import transcriptRoutes from "./routes/transcriptRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use("/api", transcriptRoutes);

const port = Number(process.env.PORT) || 5001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

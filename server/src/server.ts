import express from "express";
import cors from "cors";
import transcriptRoutes from "../src/routes/transcriptRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use("/api", transcriptRoutes);

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});

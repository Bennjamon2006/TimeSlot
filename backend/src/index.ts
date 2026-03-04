import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "@/config/env";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "timeslot-backend" });
});

app.listen(env.port, () => {
  console.log(`TimeSlot backend running on http://localhost:${env.port}`);
});

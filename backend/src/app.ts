import express from "express";
import cors from "cors";

import { prisma } from "./database";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "timeslot-backend" });
});

app.get("/test-db", async (_req, res) => {
  try {
    const timeSlots = await prisma.timeSlot.findMany({});
    res.json({ timeSlots, message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ ok: false, error: "Database connection error" });
  }
});

export default app;

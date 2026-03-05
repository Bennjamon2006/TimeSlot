import { Router } from "express";
import timeSlotsController from "@/controllers/timeSlots.controller";

const timeSlotsRouter = Router();

timeSlotsRouter.get("/", timeSlotsController.getTimeSlots);

export default timeSlotsRouter;

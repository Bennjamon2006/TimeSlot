import { Router } from "express";
import timeSlotsController from "@/controllers/timeSlots.controller";
import adminValidator from "@/middlewares/adminValidator";
import bodyValidator from "@/middlewares/bodyValidator";
import createTimeSlotSchema from "@/schemas/createTimeSlot.schema";
import filterParser from "@/middlewares/filterParser";
import { getTimeSlotsQuerySchema } from "@/filters/getTimeSlots.filter";

const timeSlotsRouter = Router();

timeSlotsRouter.get(
  "/",
  filterParser(getTimeSlotsQuerySchema),
  timeSlotsController.getTimeSlots,
);

timeSlotsRouter.post(
  "/",
  adminValidator,
  bodyValidator(createTimeSlotSchema),
  timeSlotsController.createTimeSlot,
);

export default timeSlotsRouter;

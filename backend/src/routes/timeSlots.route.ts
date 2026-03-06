import { Router } from "express";
import timeSlotsController from "@/controllers/timeSlots.controller";
import adminValidator from "@/middlewares/adminValidator";
import bodyValidator from "@/middlewares/bodyValidator";
import createTimeSlotSchema from "@/schemas/createTimeSlot.schema";
import {
  updateTimeSlotParamsSchema,
  updateTimeSlotSchema,
} from "@/schemas/updateTimeSlot.schema";
import filterParser from "@/middlewares/filterParser";
import { getTimeSlotsQuerySchema } from "@/filters/getTimeSlots.filter";
import paramsValidator from "@/middlewares/paramsValidator";

const timeSlotsRouter = Router();

timeSlotsRouter.get(
  "/",
  filterParser(getTimeSlotsQuerySchema),
  timeSlotsController.getTimeSlots,
);

timeSlotsRouter.get(
  "/:id",
  paramsValidator(updateTimeSlotParamsSchema),
  timeSlotsController.getTimeSlotById,
);

timeSlotsRouter.post(
  "/",
  adminValidator,
  bodyValidator(createTimeSlotSchema),
  timeSlotsController.createTimeSlot,
);

timeSlotsRouter.put(
  "/:id",
  adminValidator,
  bodyValidator(updateTimeSlotSchema),
  paramsValidator(updateTimeSlotParamsSchema),
  timeSlotsController.updateTimeSlot,
);

timeSlotsRouter.delete(
  "/:id",
  adminValidator,
  paramsValidator(updateTimeSlotParamsSchema),
  timeSlotsController.deleteTimeSlot,
);

export default timeSlotsRouter;

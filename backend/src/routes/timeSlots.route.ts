import { Router } from "express";
import timeSlotsController from "@/controllers/timeSlots.controller";
import adminValidator from "@/middlewares/adminValidator";
import bodyValidator from "@/middlewares/bodyValidator";
import createTimeSlotSchema from "@/schemas/createTimeSlot.schema";
import { updateTimeSlotSchema } from "@/schemas/updateTimeSlot.schema";
import filterParser from "@/middlewares/filterParser";
import { getTimeSlotsQuerySchema } from "@/filters/getTimeSlots.filter";
import paramsValidator from "@/middlewares/paramsValidator";
import { findByIdParamsSchema } from "@/schemas/findById.schema";

const timeSlotsRouter = Router();

timeSlotsRouter.get(
  "/",
  filterParser(getTimeSlotsQuerySchema),
  timeSlotsController.getTimeSlots,
);

timeSlotsRouter.get(
  "/:id",
  paramsValidator(findByIdParamsSchema),
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
  paramsValidator(findByIdParamsSchema),
  timeSlotsController.updateTimeSlot,
);

timeSlotsRouter.delete(
  "/:id",
  adminValidator,
  paramsValidator(findByIdParamsSchema),
  timeSlotsController.deleteTimeSlot,
);

export default timeSlotsRouter;

import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import timeSlotsService from "@/services/timeSlots.service";
import createTimeSlotSchema from "@/schemas/createTimeSlot.schema";
import { updateTimeSlotSchema } from "@/schemas/updateTimeSlot.schema";
import { getTimeSlotsQuerySchema } from "@/filters/getTimeSlots.filter";
import { findByIdParamsSchema } from "@/schemas/findById.schema";

const getTimeSlots = async (
  req: Request<any, any, any, typeof getTimeSlotsQuerySchema>,
) => {
  const timeSlots = await timeSlotsService.getTimeSlots(
    req.filters!,
    req.pagination!,
  );

  return new Response(timeSlots);
};

const createTimeSlot = async (req: Request<typeof createTimeSlotSchema>) => {
  const timeSlotData = req.body;

  const newTimeSlot = await timeSlotsService.createTimeSlot(timeSlotData);

  return new Response(newTimeSlot, 201);
};

const updateTimeSlot = async (
  req: Request<typeof updateTimeSlotSchema, typeof findByIdParamsSchema>,
) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await timeSlotsService.updateTimeSlot(id, data);

  return new Response(updated);
};

const deleteTimeSlot = async (
  req: Request<any, typeof findByIdParamsSchema>,
) => {
  const { id } = req.params;

  await timeSlotsService.deleteTimeSlot(id);

  return new Response({ success: true }, 204);
};

const getTimeSlotById = async (
  req: Request<any, typeof findByIdParamsSchema>,
) => {
  const { id } = req.params;

  const timeSlot = await timeSlotsService.getTimeSlotById(id);

  return new Response(timeSlot);
};

const timeSlotsController = wrapController({
  getTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
});

export default timeSlotsController;

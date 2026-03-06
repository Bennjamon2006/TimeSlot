import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import timeSlotsService from "@/services/timeSlots.service";
import createTimeSlotSchema from "@/schemas/createTimeSlot.schema";
import { getTimeSlotsQuerySchema } from "@/filters/getTimeSlots.filter";

const getTimeSlots = async (
  req: Request<any, any, any, typeof getTimeSlotsQuerySchema>,
) => {
  console.log(req.filters);

  const timeSlots = await timeSlotsService.getTimeSlots(req.filters!);

  return new Response(timeSlots);
};

const createTimeSlot = async (req: Request<typeof createTimeSlotSchema>) => {
  const timeSlotData = req.body;

  const newTimeSlot = await timeSlotsService.createTimeSlot(timeSlotData);

  return new Response(newTimeSlot, 201);
};

const timeSlotsController = wrapController({
  getTimeSlots,
  createTimeSlot,
});

export default timeSlotsController;

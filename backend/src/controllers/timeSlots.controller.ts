import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import timeSlotsService from "@/services/timeSlots.service";

const getTimeSlots = async (req: Request) => {
  const timeSlots = await timeSlotsService.getTimeSlots();

  return new Response(timeSlots);
};

const timeSlotsController = wrapController({
  getTimeSlots,
});

export default timeSlotsController;

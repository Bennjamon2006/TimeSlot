import { prisma } from "@/database";
import RequestError from "@/helpers/RequestError";
import { CreateTimeSlotInput } from "@/schemas/createTimeSlot.schema";

const getTimeSlots = async () => {
  const timeSlots = await prisma.timeSlot.findMany({
    orderBy: { startTime: "asc" },
  });

  return timeSlots;
};

const checkTimeSlotOverlap = async (startTime: Date, endTime: Date) => {
  const overlappingSlot = await prisma.timeSlot.findFirst({
    where: {
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
  });

  if (overlappingSlot) {
    throw new RequestError(
      "Time slot overlaps with an existing slot",
      409,
      "TIME_SLOT_OVERLAP",
    );
  }
};

const createTimeSlot = async (data: CreateTimeSlotInput) => {
  await checkTimeSlotOverlap(data.startTime, data.endTime);

  const newTimeSlot = await prisma.timeSlot.create({
    data,
  });

  return newTimeSlot;
};

const timeSlotsService = {
  getTimeSlots,
  createTimeSlot,
};

export default timeSlotsService;

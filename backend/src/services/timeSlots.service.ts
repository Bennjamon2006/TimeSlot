import { prisma } from "@/database";
import { CreateTimeSlotInput } from "@/schemas/createTimeSlot.schema";

const getTimeSlots = async () => {
  const timeSlots = await prisma.timeSlot.findMany({
    orderBy: { startTime: "asc" },
  });

  return timeSlots;
};

const createTimeSlot = async (data: CreateTimeSlotInput) => {
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

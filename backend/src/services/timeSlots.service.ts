import { prisma } from "@/database";
import {
  getTimeSlotsFilter,
  TimeSlotFilters,
} from "@/filters/getTimeSlots.filter";
import RequestError from "@/helpers/RequestError";
import { CreateTimeSlotInput } from "@/schemas/createTimeSlot.schema";

const getTimeSlots = async (filters: TimeSlotFilters) => {
  const where = getTimeSlotsFilter(filters);

  const timeSlots = await prisma.timeSlot.findMany({
    orderBy: { startTime: "asc" },
    where,
    include: {
      booking: true,
    },
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

const updateTimeSlot = async (
  id: string,
  data: Partial<CreateTimeSlotInput>,
) => {
  const existing = await prisma.timeSlot.findUnique({ where: { id } });

  if (!existing) {
    throw new RequestError("Time slot not found", 404, "NOT_FOUND");
  }

  const startTime = data.startTime ?? existing.startTime;
  const endTime = data.endTime ?? existing.endTime;

  await checkTimeSlotOverlap(startTime, endTime);

  const updated = await prisma.timeSlot.update({
    where: { id },
    data,
  });

  return updated;
};

const timeSlotsService = {
  getTimeSlots,
  createTimeSlot,
  updateTimeSlot,
};

export default timeSlotsService;

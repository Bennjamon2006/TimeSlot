import { prisma } from "@/database";
import {
  getTimeSlotsFilter,
  TimeSlotFilters,
} from "@/filters/getTimeSlots.filter";
import RequestError from "@/helpers/RequestError";
import { CreateTimeSlotInput } from "@/schemas/createTimeSlot.schema";
import { PaginationParams } from "@/schemas/pagination.schema";

const getTimeSlots = async (
  filters: TimeSlotFilters,
  pagination: PaginationParams,
) => {
  const where = getTimeSlotsFilter(filters);
  const skip = (pagination.page - 1) * pagination.pageSize;
  const take = pagination.pageSize;

  const [timeSlots, total] = await prisma.$transaction([
    prisma.timeSlot.findMany({
      orderBy: { startTime: "asc" },
      where,
      include: {
        booking: true,
      },
      skip,
      take,
    }),
    prisma.timeSlot.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pagination.pageSize);

  return {
    data: timeSlots,
    pagination: {
      total,
      page: pagination.page,
      took: timeSlots.length,
      pageSize: pagination.pageSize,
      totalPages,
    },
  };
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

const deleteTimeSlot = async (id: string) => {
  const existing = await prisma.timeSlot.findUnique({ where: { id } });

  if (!existing) {
    throw new RequestError("Time slot not found", 404, "NOT_FOUND");
  }

  await prisma.timeSlot.delete({ where: { id } });

  return { success: true };
};

const getTimeSlotById = async (id: string) => {
  const timeSlot = await prisma.timeSlot.findUnique({
    where: { id },
    include: { booking: true },
  });

  if (!timeSlot) {
    throw new RequestError("Time slot not found", 404, "NOT_FOUND");
  }

  return timeSlot;
};

const timeSlotsService = {
  getTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};

export default timeSlotsService;

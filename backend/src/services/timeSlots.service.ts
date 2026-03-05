import { prisma } from "@/database";

const getTimeSlots = async () => {
  const timeSlots = await prisma.timeSlot.findMany({
    orderBy: { startTime: "asc" },
  });

  return timeSlots;
};

const timeSlotsService = {
  getTimeSlots,
};

export default timeSlotsService;

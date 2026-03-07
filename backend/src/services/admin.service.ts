import { prisma } from "@/database";

const getStats = async () => {
  const [totalTimeSlots, totalBookings, totalUsers] = await prisma.$transaction(
    [prisma.timeSlot.count(), prisma.booking.count(), prisma.user.count()],
  );

  return {
    totalTimeSlots,
    totalBookings,
    totalUsers,
  };
};

const adminService = {
  getStats,
};

export default adminService;

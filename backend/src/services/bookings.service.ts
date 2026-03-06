import { prisma } from "@/database";

const getBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      timeSlot: true,
      user: true,
    },
  });

  return bookings;
};

const bookingsService = {
  getBookings,
};

export default bookingsService;

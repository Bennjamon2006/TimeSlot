import { prisma } from "@/database";
import timeSlotsService from "./timeSlots.service";
import isUniqueError from "@/helpers/isUniqueError";
import RequestError from "@/helpers/RequestError";

const getBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      timeSlot: true,
      user: true,
    },
  });

  return bookings;
};

const createBooking = async (userId: string, timeSlotId: string) => {
  // Check if time slot exists
  await timeSlotsService.getTimeSlotById(timeSlotId);

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        timeSlotId,
      },
    });

    return newBooking;
  } catch (error) {
    if (isUniqueError(error)) {
      throw new RequestError(
        "Time slot already booked",
        400,
        "TIME_SLOT_BOOKED",
      );
    }

    throw error;
  }
};

const bookingsService = {
  getBookings,
  createBooking,
};

export default bookingsService;

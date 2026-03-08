import { prisma } from "@/database";
import timeSlotsService from "./timeSlots.service";
import isUniqueError from "@/helpers/isUniqueError";
import RequestError from "@/helpers/RequestError";
import isForeignError from "@/helpers/isForeignError";

const getBookings = async (userId: string, userRole: string) => {
  const where = userRole === "ADMIN" ? {} : { userId };

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      timeSlot: true,
      user: true,
    },
  });

  return bookings;
};

const createBooking = async (userId: string, timeSlotId: string) => {
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

    if (isForeignError(error)) {
      throw new RequestError("Time slot not found", 404, "TIME_SLOT_NOT_FOUND");
    }

    throw error;
  }
};

const deleteBooking = async (id: string, userId: string, userRole: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new RequestError("Booking not found", 404, "NOT_FOUND");
  }

  // Only owner or admin can delete
  if (booking.userId !== userId && userRole !== "ADMIN") {
    throw new RequestError("Forbidden", 403, "FORBIDDEN");
  }

  await prisma.booking.delete({ where: { id } });
};

const getBookingById = async (id: string, userId: string, userRole: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { timeSlot: true, user: true },
  });

  if (!booking) {
    throw new RequestError("Booking not found", 404, "NOT_FOUND");
  }

  if (booking.userId !== userId && userRole !== "ADMIN") {
    throw new RequestError("Forbidden", 403, "FORBIDDEN");
  }

  return booking;
};

const deleteAllUserBookings = async (userId: string) => {
  await prisma.booking.deleteMany({
    where: { userId },
  });
};

const bookingsService = {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
  deleteAllUserBookings,
};

export default bookingsService;

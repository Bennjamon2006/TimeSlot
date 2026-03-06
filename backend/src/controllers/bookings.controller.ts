import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import bookingsService from "@/services/bookings.service";
import createBookingSchema from "@/schemas/createBooking.schema";

const getBookings = async (req: Request) => {
  const bookings = await bookingsService.getBookings();

  return new Response(bookings);
};

const createBooking = async (req: Request<typeof createBookingSchema>) => {
  const timeSlotId = req.body.timeSlotId;
  const userId = req.user!.id;

  const newBooking = await bookingsService.createBooking(userId, timeSlotId);

  return new Response(newBooking, 201);
};

const bookingsController = wrapController({
  getBookings,
  createBooking,
});

export default bookingsController;

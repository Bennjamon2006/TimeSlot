import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import bookingsService from "@/services/bookings.service";
import createBookingSchema from "@/schemas/createBooking.schema";
import { findByIdParamsSchema } from "@/schemas/findById.schema";

const getBookings = async (req: Request) => {
  const userId = req.user!.id;
  const userRole = req.user!.role;

  const bookings = await bookingsService.getBookings(userId, userRole);

  return new Response(bookings);
};

const getBookingById = async (req: Request<any, typeof findByIdParamsSchema>) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const userRole = req.user!.role;

  const booking = await bookingsService.getBookingById(id, userId, userRole);

  return new Response(booking);
};

const createBooking = async (req: Request<typeof createBookingSchema>) => {
  const timeSlotId = req.body.timeSlotId;
  const userId = req.user!.id;

  const newBooking = await bookingsService.createBooking(userId, timeSlotId);

  return new Response(newBooking, 201);
};

const deleteBooking = async (req: Request<any, typeof findByIdParamsSchema>) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const userRole = req.user!.role;

  await bookingsService.deleteBooking(id, userId, userRole);

  return new Response(null, 204);
};

const bookingsController = wrapController({
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
});

export default bookingsController;

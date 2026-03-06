import { Router } from "express";
import bookingsController from "@/controllers/bookings.controller";
import authValidator from "@/middlewares/authValidator";
import bodyValidator from "@/middlewares/bodyValidator";
import createBookingSchema from "@/schemas/createBooking.schema";

const bookingsRouter = Router();

bookingsRouter.get("/", bookingsController.getBookings);

bookingsRouter.post(
  "/",
  authValidator,
  bodyValidator(createBookingSchema),
  bookingsController.createBooking,
);

export default bookingsRouter;

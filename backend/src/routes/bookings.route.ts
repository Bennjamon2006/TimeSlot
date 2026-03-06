import { Router } from "express";
import bookingsController from "@/controllers/bookings.controller";
import authValidator from "@/middlewares/authValidator";
import bodyValidator from "@/middlewares/bodyValidator";
import createBookingSchema from "@/schemas/createBooking.schema";
import { findByIdParamsSchema } from "@/schemas/findById.schema";
import paramsValidator from "@/middlewares/paramsValidator";

const bookingsRouter = Router();

bookingsRouter.get("/", authValidator, bookingsController.getBookings);

bookingsRouter.get(
  "/:id",
  authValidator,
  paramsValidator(findByIdParamsSchema),
  bookingsController.getBookingById,
);

bookingsRouter.post(
  "/",
  authValidator,
  bodyValidator(createBookingSchema),
  bookingsController.createBooking,
);

bookingsRouter.delete(
  "/:id",
  authValidator,
  paramsValidator(findByIdParamsSchema),
  bookingsController.deleteBooking,
);

export default bookingsRouter;

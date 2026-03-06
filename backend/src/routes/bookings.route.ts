import { Router } from "express";
import bookingsController from "@/controllers/bookings.controller";

const bookingsRouter = Router();

bookingsRouter.get("/", bookingsController.getBookings);

export default bookingsRouter;

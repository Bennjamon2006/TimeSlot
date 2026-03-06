import { Router } from "express";
import usersRouter from "./users.route";
import authRouter from "./auth.route";
import timeSlotsRouter from "./timeSlots.route";
import bookingsRouter from "./bookings.route";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/time-slots", timeSlotsRouter);
router.use("/bookings", bookingsRouter);

export default router;

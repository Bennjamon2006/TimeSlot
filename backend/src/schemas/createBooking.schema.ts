import { z } from "zod";

const createBookingSchema = z.object({
  timeSlotId: z.uuid(),
});

export default createBookingSchema;

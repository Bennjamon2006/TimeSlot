import z from "zod";
import dateFromString from "./dateFromString";

const createTimeSlotSchema = z
  .object({
    startTime: dateFromString("Invalid date format for startTime"),
    endTime: dateFromString("Invalid date format for endTime"),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "startTime must be before endTime",
  });

export type CreateTimeSlotInput = z.infer<typeof createTimeSlotSchema>;

export default createTimeSlotSchema;

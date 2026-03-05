import z from "zod";

const dateFromString = (message: string) =>
  z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message,
    })
    .transform((value) => new Date(value));

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

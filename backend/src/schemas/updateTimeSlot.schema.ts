import z from "zod";
import dateFromString from "./dateFromString";

const updateTimeSlotSchema = z
  .object({
    startTime: dateFromString("Invalid date format for startTime").optional(),
    endTime: dateFromString("Invalid date format for endTime").optional(),
  })
  .refine(
    (data) => data.startTime !== undefined || data.endTime !== undefined,
    {
      message: "At least one of startTime or endTime is required",
    },
  )
  .refine(
    (data) => !data.startTime || !data.endTime || data.startTime < data.endTime,
    {
      message: "startTime must be before endTime",
    },
  );

export type UpdateTimeSlotInput = z.infer<typeof updateTimeSlotSchema>;

export { updateTimeSlotSchema };

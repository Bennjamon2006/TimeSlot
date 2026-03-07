import { z } from "zod";
import filterBuilder from "@/helpers/filterBuilder";
import dateFromString from "@/schemas/dateFromString";

const getTimeSlotsQuerySchema = z.object({
  startBefore: dateFromString(
    "startBefore must be a valid date string",
  ).optional(),
  startAfter: dateFromString(
    "startAfter must be a valid date string",
  ).optional(),
  endBefore: dateFromString("endBefore must be a valid date string").optional(),
  endAfter: dateFromString("endAfter must be a valid date string").optional(),
  booked: z
    .string()
    .refine((value) => value === "true" || value === "false", {
      message: "booked must be 'true' or 'false'",
    })
    .transform((value) => value === "true")
    .optional(),
});

export type TimeSlotFilters = z.infer<typeof getTimeSlotsQuerySchema>;

const getTimeSlotsFilter = filterBuilder<"TimeSlot", TimeSlotFilters>({
  startBefore: (prev, value) => ({
    ...prev,
    startTime: {
      ...((prev.startTime || {}) as object),
      lt: value,
    },
  }),
  startAfter: (prev, value) => ({
    ...prev,
    startTime: {
      ...((prev.startTime || {}) as object),
      gt: value,
    },
  }),
  endBefore: (prev, value) => ({
    ...prev,
    endTime: {
      ...((prev.endTime || {}) as object),
      lt: value,
    },
  }),
  endAfter: (prev, value) => ({
    ...prev,
    endTime: {
      ...((prev.endTime || {}) as object),
      gt: value,
    },
  }),
  booked: (prev, value) => ({
    ...prev,
    booking:
      value === true
        ? {
            isNot: null,
          }
        : value === false
          ? {
              is: null,
            }
          : undefined,
  }),
});

export { getTimeSlotsQuerySchema, getTimeSlotsFilter };

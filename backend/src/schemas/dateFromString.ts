import { z } from "zod";

const dateFromString = (message: string) =>
  z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message,
    })
    .transform((value) => new Date(value));

export default dateFromString;

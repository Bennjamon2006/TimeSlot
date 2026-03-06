import { z } from "zod";

const paginationSchema = z.object({
  page: z.coerce
    .number("Page must be a number")
    .int("Page must be an integer")
    .positive("Page must be a positive number")
    .default(1),
  pageSize: z.coerce
    .number("Page size must be a number")
    .int("Page size must be an integer")
    .positive("Page size must be a positive number")
    .max(100, "Page size cannot exceed 100")
    .default(20),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export { paginationSchema };

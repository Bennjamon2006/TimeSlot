import z from "zod";

const uuidSchema = z.string().uuid("Invalid ID format");

export const findByIdParamsSchema = z.object({
  id: uuidSchema,
});

export type FindByIdParams = z.infer<typeof findByIdParamsSchema>;

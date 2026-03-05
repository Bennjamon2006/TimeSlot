import { z } from "zod";
import createUserSchema from "./createUser.schema";

const updateUserSchema = createUserSchema.partial();

export default updateUserSchema;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

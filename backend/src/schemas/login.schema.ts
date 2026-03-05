import { z } from "zod";

const loginSchema = z.object(
  {
    email: z.email(),
    password: z.string().min(6),
  },
  {
    message: "Invalid login data",
  },
);

export default loginSchema;

export type LoginInput = z.infer<typeof loginSchema>;

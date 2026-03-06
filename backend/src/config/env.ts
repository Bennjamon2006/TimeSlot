import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default("localhost"),
  POSTGRES_URL: z
    .string()
    .default("postgresql://user:password@localhost:5432/timeslot"),
  JWT_SECRET: z.string().default("your_jwt_secret_key"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  server: {
    port: parsedEnv.data.PORT,
    host: parsedEnv.data.HOST,
  },
  database: {
    url: parsedEnv.data.POSTGRES_URL,
  },
  auth: {
    jwtSecret: parsedEnv.data.JWT_SECRET,
  },
};

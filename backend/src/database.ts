import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./config/env";

const createPrismaClient = () => {
  const connectionString = process.env.POSTGRES_TEST_URL || env.database.url;
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
    }),
  });
};

export const prisma = createPrismaClient();

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

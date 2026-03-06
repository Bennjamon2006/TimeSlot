// src/__tests__/e2e/setup.ts
// E2E test setup - uses PostgreSQL test container

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const createPrisma = () =>
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString:
        process.env.POSTGRES_TEST_URL ||
        "postgresql://test:test@localhost:5433/timeslot_test",
    }),
  });

let prismaInstance: PrismaClient | null = null;

export const getPrisma = () => {
  if (!prismaInstance) {
    prismaInstance = createPrisma();
  }
  return prismaInstance;
};

export const prisma = getPrisma();

// Clean before EACH test para evitar conflictos entre tests paralelos
beforeEach(async () => {
  const p = getPrisma();
  await p.booking.deleteMany();
  await p.timeSlot.deleteMany();
  await p.user.deleteMany();
});

afterAll(async () => {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = null;
  }
});

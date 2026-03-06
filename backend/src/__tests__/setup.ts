// src/__tests__/setup.ts
// Global setup - mocks before any imports

/* eslint-disable @typescript-eslint/no-explicit-any */
const mockPrisma: any = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  timeSlot: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  booking: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  $connect: jest.fn().mockResolvedValue(undefined),
  $disconnect: jest.fn().mockResolvedValue(undefined),
  $transaction: jest.fn((promises: any) => Promise.all(promises)),
};

const mockBcrypt = {
  compareSync: jest.fn(() => true),
  hashSync: jest.fn(() => "$2a$10$hashed"),
};

// Mock bcrypt
jest.mock("bcrypt", () => mockBcrypt);

jest.mock("@/database", () => ({
  prisma: mockPrisma,
}));

jest.mock("@/config/env", () => ({
  env: {
    database: { url: "postgres://test:test@localhost:5432/test" },
    auth: { jwtSecret: "test-secret" },
    server: { port: 4000, host: "localhost" },
  },
}));

export const prismaMock = mockPrisma;
export const bcryptMock = mockBcrypt;

export const resetMocks = () => {
  Object.values(mockPrisma).forEach((model: any) => {
    if (typeof model === "object" && model !== null) {
      Object.keys(model).forEach((method: any) => {
        model[method] = jest.fn();
      });
    }
  });
};

beforeEach(() => {
  resetMocks();
});

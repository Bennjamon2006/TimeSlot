// src/__tests__/e2e/fixtures.ts
// E2E test fixtures - helper functions

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from './setup';

export const JWT_SECRET = 'your_jwt_secret_key'; // Must match .env

export const createToken = (userId: string, role = 'USER') => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

export const createUser = async (email: string, role = 'USER') => {
  return prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash('password123', 10),
      name: email.split('@')[0],
      role,
    },
  });
};

export const createTimeSlot = async (startTime: Date, endTime: Date) => {
  return prisma.timeSlot.create({
    data: { startTime, endTime },
  });
};

export const createBooking = async (userId: string, timeSlotId: string) => {
  return prisma.booking.create({
    data: { userId, timeSlotId },
  });
};

import { hashSync } from "bcrypt";
// src/__tests__/fixtures.ts
// Reusable test data

export const adminUser = {
  id: "admin-uuid",
  email: "admin@test.com",
  name: "Admin",
  password: hashSync("password123", 10),
  role: "ADMIN",
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

export const regularUser = {
  id: "user-uuid",
  email: "user@test.com",
  name: "User",
  password: hashSync("password123", 10),
  role: "USER",
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

export const timeSlot = {
  id: "timeslot-uuid",
  startTime: new Date("2026-03-06T09:00:00Z"),
  endTime: new Date("2026-03-06T10:00:00Z"),
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

export const timeSlot2 = {
  id: "timeslot-uuid-2",
  startTime: new Date("2026-03-06T14:00:00Z"),
  endTime: new Date("2026-03-06T15:00:00Z"),
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

export const booking = {
  id: "booking-uuid",
  userId: "user-uuid",
  timeSlotId: "timeslot-uuid",
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

export const newUserData = {
  name: "New User",
  email: "newuser@test.com",
  password: "password123",
};

export const newTimeSlotData = {
  startTime: new Date("2026-03-07T09:00:00Z"),
  endTime: new Date("2026-03-07T10:00:00Z"),
};

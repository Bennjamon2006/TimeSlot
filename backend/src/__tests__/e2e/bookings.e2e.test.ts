// src/__tests__/e2e/bookings.e2e.test.ts
// E2E tests for Bookings endpoints

import request from "supertest";
import { Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./setup";

const JWT_SECRET = "your_jwt_secret_key";

const createToken = (userId: string, role = "USER") => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
};

describe("Bookings E2E", () => {
  let app: Express;
  let userToken: string;
  let adminToken: string;
  let otherUserToken: string;
  let userId: string;
  let otherUserId: string;
  let adminId: string;
  let timeSlotId: string;
  let bookingId: string;

  beforeAll(async () => {
    app = (await import("@/app")).default;
  });

  beforeEach(async () => {
    const regularUser = await prisma.user.create({
      data: {
        email: "user@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "User",
      },
    });
    userId = regularUser.id;
    userToken = createToken(userId);

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "Admin",
        role: "ADMIN",
      },
    });
    adminId = adminUser.id;
    adminToken = createToken(adminId, "ADMIN");

    const otherUser = await prisma.user.create({
      data: {
        email: "other@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "Other",
      },
    });
    otherUserId = otherUser.id;
    otherUserToken = createToken(otherUserId);

    const timeSlot = await prisma.timeSlot.create({
      data: {
        startTime: new Date("2026-03-06T09:00:00Z"),
        endTime: new Date("2026-03-06T10:00:00Z"),
      },
    });

    timeSlotId = timeSlot.id;

    const booking = await prisma.booking.create({
      data: { userId, timeSlotId },
    });

    bookingId = booking.id;
  });

  describe("GET /api/bookings", () => {
    it("should return 200 with user bookings", async () => {
      const response = await request(app)
        .get("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/bookings");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/bookings/:id", () => {
    it("should return booking by id for owner", async () => {
      const response = await request(app)
        .get(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(bookingId);
    });

    it("should return booking by id for admin", async () => {
      const response = await request(app)
        .get(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });

    it("should return 403 for non-owner non-admin", async () => {
      const response = await request(app)
        .get(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${otherUserToken}`);

      expect(response.status).toBe(403);
    });

    it("should return 400 for invalid booking ID", async () => {
      const response = await request(app)
        .get("/api/bookings/invalid-id")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent booking", async () => {
      const response = await request(app)
        .get("/api/bookings/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/bookings", () => {
    it("should create booking successfully", async () => {
      const ts = await prisma.timeSlot.create({
        data: {
          startTime: new Date("2026-03-06T09:00:00Z"),
          endTime: new Date("2026-03-06T10:00:00Z"),
        },
      });

      const response = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ timeSlotId: ts.id });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 400 for invalid time slot ID", async () => {
      const response = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ timeSlotId: "invalid-id" });

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent time slot", async () => {
      const response = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ timeSlotId: "00000000-0000-0000-0000-000000000000" });

      expect(response.status).toBe(404);
    });

    it("should return 400 for already booked time slot", async () => {
      const ts = await prisma.timeSlot.create({
        data: {
          startTime: new Date("2026-03-06T09:00:00Z"),
          endTime: new Date("2026-03-06T10:00:00Z"),
        },
      });
      await prisma.booking.create({
        data: { userId, timeSlotId: ts.id },
      });

      const response = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ timeSlotId: ts.id });

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /api/bookings/:id", () => {
    it("should delete booking as owner", async () => {
      const response = await request(app)
        .delete(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(204);
    });

    it("should delete booking as admin", async () => {
      const response = await request(app)
        .delete(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(204);
    });

    it("should return 403 for non-owner non-admin", async () => {
      const response = await request(app)
        .delete(`/api/bookings/${bookingId}`)
        .set("Authorization", `Bearer ${otherUserToken}`);

      expect(response.status).toBe(403);
    });

    it("should return 400 for invalid booking ID", async () => {
      const response = await request(app)
        .delete("/api/bookings/invalid-id")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent booking", async () => {
      const response = await request(app)
        .delete("/api/bookings/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
    });
  });
});

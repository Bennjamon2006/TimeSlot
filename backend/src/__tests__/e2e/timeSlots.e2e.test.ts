// src/__tests__/e2e/timeSlots.e2e.test.ts
// E2E tests for TimeSlots endpoints

import request from "supertest";
import { Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./setup";

const JWT_SECRET = "your_jwt_secret_key";

const createToken = (userId: string, role = "USER") => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
};

describe("TimeSlots E2E", () => {
  let app: Express;
  let userToken: string;
  let adminToken: string;
  let userId: string;
  let adminId: string;

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
  });

  describe("GET /api/time-slots", () => {
    it("should return 200 with time slots list", async () => {
      await prisma.timeSlot.create({
        data: {
          startTime: new Date("2026-03-06T09:00:00Z"),
          endTime: new Date("2026-03-06T10:00:00Z"),
        },
      });

      const response = await request(app)
        .get("/api/time-slots")
        .query({ page: 1, pageSize: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });

    it("should return empty list when no time slots", async () => {
      const response = await request(app)
        .get("/api/time-slots")
        .query({ page: 1, pageSize: 10 });

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });
  });

  describe("GET /api/time-slots/:id", () => {
    it("should return time slot by id", async () => {
      const ts = await prisma.timeSlot.create({
        data: {
          startTime: new Date("2026-03-06T09:00:00Z"),
          endTime: new Date("2026-03-06T10:00:00Z"),
        },
      });

      const response = await request(app).get(`/api/time-slots/${ts.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(ts.id);
    });

    it("should return 400 for invalid id format", async () => {
      const response = await request(app).get("/api/time-slots/invalid-id");

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent time slot", async () => {
      const response = await request(app).get(
        "/api/time-slots/00000000-0000-0000-0000-000000000000",
      );

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/time-slots (admin only)", () => {
    it("should create time slot as admin", async () => {
      const response = await request(app)
        .post("/api/time-slots")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startTime: "2026-03-06T09:00:00Z",
          endTime: "2026-03-06T10:00:00Z",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 403 for non-admin", async () => {
      const response = await request(app)
        .post("/api/time-slots")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          startTime: "2026-03-06T09:00:00Z",
          endTime: "2026-03-06T10:00:00Z",
        });

      expect(response.status).toBe(403);
    });

    it("should return 401 without token", async () => {
      const response = await request(app).post("/api/time-slots").send({
        startTime: "2026-03-06T09:00:00Z",
        endTime: "2026-03-06T10:00:00Z",
      });

      expect(response.status).toBe(401);
    });

    it("should return 400 on invalid time range", async () => {
      const response = await request(app)
        .post("/api/time-slots")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startTime: "2026-03-06T10:00:00Z",
          endTime: "2026-03-06T09:00:00Z",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /api/time-slots/:id (admin only)", () => {
    it("should delete time slot as admin", async () => {
      const ts = await prisma.timeSlot.create({
        data: {
          startTime: new Date("2026-03-06T09:00:00Z"),
          endTime: new Date("2026-03-06T10:00:00Z"),
        },
      });

      const response = await request(app)
        .delete(`/api/time-slots/${ts.id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(204);
    });

    it("should return 400 for invalid id format", async () => {
      const response = await request(app)
        .delete("/api/time-slots/invalid-id")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent time slot", async () => {
      const response = await request(app)
        .delete("/api/time-slots/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });
});

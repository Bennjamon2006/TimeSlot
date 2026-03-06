// src/__tests__/e2e/users.e2e.test.ts
// E2E tests for Users endpoints

import request from "supertest";
import { Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./setup";

const JWT_SECRET = "your_jwt_secret_key";

const createToken = (userId: string, role = "USER") => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
};

describe("Users E2E", () => {
  let app: Express;
  let userToken: string;
  let adminToken: string;
  let regularUserId: string;
  let adminUserId: string;

  beforeAll(async () => {
    app = (await import("@/app")).default;
  });

  beforeEach(async () => {
    const regularUser = await prisma.user.create({
      data: {
        email: "user@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "Regular User",
        role: "USER",
      },
    });
    regularUserId = regularUser.id;
    userToken = createToken(regularUserId);

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "Admin User",
        role: "ADMIN",
      },
    });
    adminUserId = adminUser.id;
    adminToken = createToken(adminUserId, "ADMIN");
  });

  describe("POST /api/users", () => {
    it("should create user and return 201", async () => {
      const response = await request(app).post("/api/users").send({
        name: "New User",
        email: "new@test.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 409 on duplicate email", async () => {
      const response = await request(app).post("/api/users").send({
        name: "User",
        email: "user@test.com",
        password: "password123",
      });

      expect(response.status).toBe(409);
    });

    it("should return 400 on missing fields", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({ name: "User" });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/users/me", () => {
    it("should return 200 with user data", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("user@test.com");
    });

    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/users/me");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/users (admin)", () => {
    it("should return 200 with user list for admin", async () => {
      const response = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 403 for non-admin", async () => {
      const response = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by id", async () => {
      const response = await request(app)
        .get(`/api/users/${regularUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(regularUserId);
    });

    it("should return 400 for invalid id format", async () => {
      const response = await request(app)
        .get("/api/users/invalid-id")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .get("/api/users/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user as admin", async () => {
      const response = await request(app)
        .delete(`/api/users/${regularUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(204);
    });

    it("should return 403 when user tries to delete another user", async () => {
      const otherUser = await prisma.user.create({
        data: {
          email: "other@test.com",
          password: await bcrypt.hash("password123", 10),
          name: "Other User",
        },
      });

      const response = await request(app)
        .delete(`/api/users/${otherUser.id}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });
});

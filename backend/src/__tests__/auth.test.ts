// src/__tests__/auth.test.ts
// Unit tests for Auth service

import authService from "@/services/auth.service";
import { bcryptMock, prismaMock } from "./setup";
import { regularUser } from "./fixtures";

describe("Auth Service", () => {
  describe("login", () => {
    it("should return token on valid credentials", async () => {
      prismaMock.user.findUnique.mockResolvedValue(regularUser);

      const result = await authService.login({
        email: regularUser.email,
        password: "password123",
      });

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: regularUser.email },
      });
      expect(result).toHaveProperty("token");
    });

    it("should throw on invalid email", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login({
          email: "invalid@test.com",
          password: "password123",
        }),
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw on invalid password", async () => {
      prismaMock.user.findUnique.mockResolvedValue(regularUser);

      bcryptMock.compareSync.mockReturnValue(false);

      await expect(
        authService.login({
          email: regularUser.email,
          password: "wrongpassword",
        }),
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("verifyToken", () => {
    it("should return user on valid token", async () => {
      const jwt = require("jsonwebtoken");
      const token = jwt.sign({ userId: regularUser.id }, "test-secret");
      prismaMock.user.findUnique.mockResolvedValue(regularUser);

      const result = await authService.verifyToken(token);

      expect(result).toEqual(regularUser);
    });

    it("should throw on invalid token", async () => {
      await expect(authService.verifyToken("invalid-token")).rejects.toThrow(
        "Invalid session",
      );
    });

    it("should throw if user not found", async () => {
      const jwt = require("jsonwebtoken");
      const token = jwt.sign({ userId: "non-existent" }, "test-secret");
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(authService.verifyToken(token)).rejects.toThrow(
        "Invalid session",
      );
    });
  });
});

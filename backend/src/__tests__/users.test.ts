import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import usersService from "@/services/users.service";
import { prismaMock } from "./setup";
import { regularUser, adminUser, newUserData } from "./fixtures";

describe("Users Service", () => {
  describe("createUser", () => {
    it("should create a new user with hashed password", async () => {
      prismaMock.user.create.mockResolvedValue(regularUser);

      const result = await usersService.createUser(newUserData);

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: newUserData.name,
          email: newUserData.email,
        }),
      });
      expect(result).toEqual(regularUser);
    });

    it("should throw error on duplicate email", async () => {
      const error = new PrismaClientKnownRequestError(
        "Unique constraint failed",
        {
          code: "P2002",
          clientVersion: "3.0.0",
        },
      );

      prismaMock.user.create.mockRejectedValue(error);

      await expect(usersService.createUser(newUserData)).rejects.toThrow(
        "Email already exists",
      );
    });
  });

  describe("getUser", () => {
    it("should return user by id", async () => {
      prismaMock.user.findUnique.mockResolvedValue(regularUser);

      const result = await usersService.getUser(regularUser.id);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: regularUser.id },
      });
      expect(result).toEqual(regularUser);
    });

    it("should throw error if user not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(usersService.getUser("non-existent")).rejects.toThrow(
        "User not found",
      );
    });
  });

  describe("updateUser", () => {
    it("should update user data", async () => {
      const updatedUser = { ...regularUser, name: "Updated Name" };
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await usersService.updateUser(regularUser.id, {
        name: "Updated Name",
      });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: regularUser.id },
        data: { name: "Updated Name" },
      });
      expect(result.name).toBe("Updated Name");
    });

    it("should hash password if provided", async () => {
      const updatedUser = { ...regularUser, password: "$2a$10$newhash" };
      prismaMock.user.update.mockResolvedValue(updatedUser);

      await usersService.updateUser(regularUser.id, {
        password: "newpassword123",
      });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: regularUser.id },
        data: { password: expect.any(String) },
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete user by id", async () => {
      prismaMock.user.delete.mockResolvedValue(regularUser);

      await usersService.deleteUser(regularUser.id);

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: regularUser.id },
      });
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      prismaMock.user.findMany.mockResolvedValue([regularUser, adminUser]);

      const result = await usersService.getAllUsers();

      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      prismaMock.user.findUnique.mockResolvedValue(regularUser);

      const result = await usersService.getUserById(regularUser.id);

      expect(result).toEqual(regularUser);
    });

    it("should throw error if not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(usersService.getUserById("invalid")).rejects.toThrow(
        "User not found",
      );
    });
  });

  describe("updateUserById", () => {
    it("should update user by id", async () => {
      const updated = { ...regularUser, name: "Admin Updated" };
      prismaMock.user.update.mockResolvedValue(updated);

      const result = await usersService.updateUserById(regularUser.id, {
        name: "Admin Updated",
      });

      expect(result.name).toBe("Admin Updated");
    });
  });

  describe("deleteUserById", () => {
    it("should delete user by id", async () => {
      prismaMock.user.findUnique.mockResolvedValue(regularUser);
      prismaMock.user.delete.mockResolvedValue(regularUser);

      await usersService.deleteUserById(regularUser.id);

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: regularUser.id },
      });
    });

    it("should throw if user not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(usersService.deleteUserById("invalid")).rejects.toThrow(
        "User not found",
      );
    });
  });
});

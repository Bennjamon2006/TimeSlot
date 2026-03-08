import { hashSync } from "bcrypt";
import { prisma } from "@/database";
import RequestError from "@/helpers/RequestError";
import isUniqueError from "@/helpers/isUniqueError";
import { CreateUserInput } from "@/schemas/createUser.schema";
import { UpdateUserInput } from "@/schemas/updateUser.schema";
import authService from "./auth.service";
import bookingsService from "./bookings.service";

const createUser = async (userData: CreateUserInput) => {
  const hashedPassword = hashSync(userData.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const token = authService.signUser(user.id);

    return { token };
  } catch (error) {
    if (isUniqueError(error)) {
      throw new RequestError("Email already exists", 409, "EMAIL_EXISTS");
    }

    throw error;
  }
};

const updateUser = async (userId: string, updateData: UpdateUserInput) => {
  if (updateData.password) {
    updateData.password = hashSync(updateData.password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    if (isUniqueError(error)) {
      throw new RequestError("Email already exists", 409, "EMAIL_EXISTS");
    }

    throw error;
  }
};

const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new RequestError("User not found", 404, "NOT_FOUND");
  }
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return users;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new RequestError("User not found", 404, "NOT_FOUND");
  }
  return user;
};

const updateUserById = async (id: string, updateData: UpdateUserInput) => {
  if (updateData.password) {
    updateData.password = hashSync(updateData.password, 10);
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return user;
  } catch (error) {
    if (isUniqueError(error)) {
      throw new RequestError("Email already exists", 409, "EMAIL_EXISTS");
    }
    throw error;
  }
};

const deleteUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new RequestError("User not found", 404, "NOT_FOUND");
  }

  await bookingsService.deleteAllUserBookings(user.id);

  await prisma.user.delete({ where: { id } });
};

const usersService = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

export default usersService;

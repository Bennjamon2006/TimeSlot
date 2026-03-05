import { hashSync } from "bcrypt";
import { prisma } from "@/database";
import RequestError from "@/helpers/RequestError";
import isUniqueError from "@/helpers/isUniqueError";
import { CreateUserInput } from "@/schemas/createUser.schema";
import { UpdateUserInput } from "@/schemas/updateUser.schema";

const createUser = async (userData: CreateUserInput) => {
  const hashedPassword = hashSync(userData.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return user;
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

const usersService = {
  createUser,
  updateUser,
  deleteUser,
};

export default usersService;

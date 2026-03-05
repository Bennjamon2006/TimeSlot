import { hashSync } from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "@/database";
import RequestError from "@/helpers/RequestError";
import isUniqueError from "@/helpers/isUniqueError";

const createUser = async (userData: Omit<User, "id">) => {
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

const usersService = {
  createUser,
};

export default usersService;

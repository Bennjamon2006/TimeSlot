import type { Request, Response } from "express";
import usersService from "@/services/users.service";
import RequestError from "@/helpers/RequestError";
import createUserSchema from "@/schemas/createUser.schema";
import z from "zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new RequestError(
        "Invalid user data",
        400,
        "INVALID_USER_DATA",
        z.treeifyError(validatedData.error).properties,
      );
    }

    const user = await usersService.createUser(validatedData.data);

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof RequestError) {
      res.status(error.statusCode).json({
        error: error.message,
        code: error.code,
        details: error.details,
      });
    } else {
      console.error(error);

      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const usersController = {
  createUser,
};

export default usersController;

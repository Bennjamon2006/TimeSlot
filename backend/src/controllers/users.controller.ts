import type { Request, Response } from "express";
import usersService from "@/services/users.service";
import RequestError from "@/helpers/RequestError";
import { CreateUserInput } from "@/schemas/createUser.schema";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserInput = req.body;

    const user = await usersService.createUser(userData);

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

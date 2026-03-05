import type { NextFunction, Request, Response } from "express";
import usersService from "@/services/users.service";
import { CreateUserInput } from "@/schemas/createUser.schema";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUserInput = req.body;

    const user = await usersService.createUser(userData);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const usersController = {
  createUser,
};

export default usersController;

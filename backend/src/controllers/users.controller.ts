import type { Request, Response } from "express";
import usersService from "@/services/users.service";
import { CreateUserInput } from "@/schemas/createUser.schema";
import wrapController from "@/helpers/wrapController";

const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserInput = req.body;

  const user = await usersService.createUser(userData);

  res.status(201).json(user);
};

const usersController = wrapController({
  createUser,
});

export default usersController;

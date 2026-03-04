import type { Request, Response } from "express";
import usersService from "@/services/users.service";

const createUser = async (req: Request, res: Response) => {
  // Logic to create a user
  const user = await usersService.createUser(req.body);

  res.status(201).json(user);
};

const usersController = {
  createUser,
};

export default usersController;

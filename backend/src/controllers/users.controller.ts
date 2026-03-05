import type { Request, Response } from "express";
import usersService from "@/services/users.service";
import RequestError from "@/helpers/RequestError";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await usersService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof RequestError) {
      res
        .status(error.statusCode)
        .json({ error: error.message, code: error.code });
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

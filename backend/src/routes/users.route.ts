import { Router } from "express";
import usersController from "@/controllers/users.controller";
import bodyValidator from "@/middlewares/bodyValidator";
import createUserSchema from "@/schemas/createUser.schema";
import authValidator from "@/middlewares/authValidator";
import updateUserSchema from "@/schemas/updateUser.schema";

const usersRouter = Router();

usersRouter.post(
  "/",
  bodyValidator(createUserSchema),
  usersController.createUser,
);

usersRouter.get("/me", authValidator, usersController.getUser);

usersRouter.put(
  "/me",
  authValidator,
  bodyValidator(updateUserSchema.partial()),
  usersController.updateUser,
);

export default usersRouter;

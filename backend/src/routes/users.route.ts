import { Router } from "express";
import usersController from "@/controllers/users.controller";
import bodyValidator from "@/middlewares/bodyValidator";
import createUserSchema from "@/schemas/createUser.schema";
import authValidator from "@/middlewares/authValidator";

const usersRouter = Router();

usersRouter.post(
  "/",
  bodyValidator(createUserSchema),
  usersController.createUser,
);

usersRouter.get("/me", authValidator, usersController.getUser);

export default usersRouter;

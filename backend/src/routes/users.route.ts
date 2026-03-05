import { Router } from "express";
import usersController from "@/controllers/users.controller";
import bodyValidator from "@/middlewares/bodyValidator";
import createUserSchema from "@/schemas/createUser.schema";

const usersRouter = Router();

usersRouter.post(
  "/",
  bodyValidator(createUserSchema),
  usersController.createUser,
);

export default usersRouter;

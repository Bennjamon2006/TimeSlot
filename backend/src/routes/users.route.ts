import { Router } from "express";
import usersController from "@/controllers/users.controller";
import bodyValidator from "@/middlewares/bodyValidator";
import createUserSchema from "@/schemas/createUser.schema";
import authValidator from "@/middlewares/authValidator";
import adminValidator from "@/middlewares/adminValidator";
import updateUserSchema from "@/schemas/updateUser.schema";
import { findByIdParamsSchema } from "@/schemas/findById.schema";
import paramsValidator from "@/middlewares/paramsValidator";

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

usersRouter.delete("/me", authValidator, usersController.deleteUser);

// Admin routes
usersRouter.get(
  "/",
  authValidator,
  adminValidator,
  usersController.getAllUsers,
);

usersRouter.get(
  "/:id",
  authValidator,
  adminValidator,
  paramsValidator(findByIdParamsSchema),
  usersController.getUserById,
);

usersRouter.put(
  "/:id",
  authValidator,
  adminValidator,
  paramsValidator(findByIdParamsSchema),
  usersController.updateUserById,
);

usersRouter.delete(
  "/:id",
  authValidator,
  adminValidator,
  paramsValidator(findByIdParamsSchema),
  usersController.deleteUserById,
);

export default usersRouter;

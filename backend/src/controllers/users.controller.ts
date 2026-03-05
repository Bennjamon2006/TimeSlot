import usersService from "@/services/users.service";
import createUserSchema from "@/schemas/createUser.schema";
import wrapController from "@/helpers/wrapController";
import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import updateUserSchema from "@/schemas/updateUser.schema";

const createUser = async (req: Request<typeof createUserSchema>) => {
  const userData = req.body;

  const user = await usersService.createUser(userData);

  return new Response(user, 201);
};

const getUser = async (req: Request) => {
  const user = req.user;

  return new Response(user);
};

const updateUser = async (req: Request<typeof updateUserSchema>) => {
  const userId = req.user!.id;
  const updateData = req.body;

  const updatedUser = await usersService.updateUser(userId, updateData);

  return new Response(updatedUser);
};

const usersController = wrapController({
  createUser,
  getUser,
  updateUser,
});

export default usersController;

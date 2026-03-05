import usersService from "@/services/users.service";
import createUserSchema from "@/schemas/createUser.schema";
import wrapController from "@/helpers/wrapController";
import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import updateUserSchema from "@/schemas/updateUser.schema";
import mapUser from "@/mappers/user.mapper";

const createUser = async (req: Request<typeof createUserSchema>) => {
  const userData = req.body;

  const user = await usersService.createUser(userData);

  return new Response(mapUser(user), 201);
};

const getUser = async (req: Request) => {
  const user = req.user!;

  return new Response(mapUser(user));
};

const updateUser = async (req: Request<typeof updateUserSchema>) => {
  const userId = req.user!.id;
  const updateData = req.body;

  const updatedUser = await usersService.updateUser(userId, updateData);

  return new Response(mapUser(updatedUser));
};

const deleteUser = async (req: Request) => {
  await usersService.deleteUser(req.user!.id);

  return new Response(null, 204);
};

const usersController = wrapController({
  createUser,
  getUser,
  updateUser,
  deleteUser,
});

export default usersController;

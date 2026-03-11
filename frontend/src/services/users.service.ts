import api from "@/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");

  return response;
};

const deleteCurrentUser = async (): Promise<void> => {
  await api.delete("/users/me");
};

const updateCurrentUser = async (
  data: Partial<{ name: string; email: string; password: string }>,
): Promise<User> => {
  const response = await api.put<User>("/users/me", data);

  return response;
};

const usersService = {
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
};

export default usersService;

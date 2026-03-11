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
}

const usersService = {
  getCurrentUser,
  deleteCurrentUser,
};

export default usersService;

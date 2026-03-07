import api from "@/api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

const getCurrentUser = async (): Promise<User> => {
  const response = api.get<User>("/users/me");

  return response;
};

const usersService = {
  getCurrentUser,
};

export default usersService;

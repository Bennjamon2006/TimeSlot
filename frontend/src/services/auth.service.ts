import api from "@/api";
import usersService from "./users.service";

type LoginInput = {
  email: string;
  password: string;
};

type TokenResponse = {
  token: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

const login = async (data: LoginInput) => {
  const response = await api.post<TokenResponse>("/auth/login", data);

  return response;
};

const loadSession = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = await usersService.getCurrentUser();

    return user;
  }

  return null;
};

const register = async (data: RegisterInput) => {
  const response = await api.post<TokenResponse>("/users", data);

  return response;
};

const authService = {
  login,
  loadSession,
  register,
};

export default authService;

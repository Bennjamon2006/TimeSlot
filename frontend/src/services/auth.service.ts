import api from "@/api";
import usersService from "./users.service";

type LoginInput = {
  email: string;
  password: string;
};

type TokenResponse = {
  token: string;
};

const login = async (data: LoginInput) => {
  const response = await api.post<TokenResponse>("/auth/login", {
    email: data.email,
    password: data.password,
  });

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

const authService = {
  login,
  loadSession,
};

export default authService;

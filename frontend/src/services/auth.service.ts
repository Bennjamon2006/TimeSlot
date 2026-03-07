import api from "@/api";
import usersService from "./users.service";

const login = async (email: string, password: string) => {
  const response = await api.post<{ token: string }>("/auth/login", {
    email,
    password,
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

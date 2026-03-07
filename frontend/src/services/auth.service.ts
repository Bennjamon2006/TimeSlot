import api from "@/api";

const login = async (email: string, password: string) => {
  const response = await api.post<{ token: string }>("/auth/login", {
    email,
    password,
  });

  return response;
};

const authService = {
  login,
};

export default authService;

import { useContext } from "react";
import AuthContext from "@/context/auth/Auth.context";

export default function useAuth() {
  const context = useContext(AuthContext);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    context.refetchSession();
  };

  const destroySession = () => {
    localStorage.removeItem("token");
    context.refetchSession();
  };

  return {
    user: context.user,
    error: context.error,
    state: context.state,
    isAuthenticated: context.isAuthenticated,
    setToken,
    destroySession,
  };
}

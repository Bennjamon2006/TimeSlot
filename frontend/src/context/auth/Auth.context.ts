import { createContext } from "react";
import { User } from "@/services/users.service";
import { OperationState } from "@/hooks/useOperation";

interface AuthState {
  state: OperationState;
  isAuthenticated: boolean;
  user: User | null;
  error: Error | null;
  refetchSession: () => void;
}

const AuthContext = createContext<AuthState>({
  state: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
  refetchSession: () => {},
});

export default AuthContext;

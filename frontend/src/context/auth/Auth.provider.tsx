import useQuery from "@/hooks/useQuery";
import authService from "@/services/auth.service";
import AuthContext from "./Auth.context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadSessionQuery = useQuery("session", authService.loadSession, 10000);
  const isAuthenticated =
    loadSessionQuery.state === "success" && loadSessionQuery.data !== null;
  const operationData = {
    error: loadSessionQuery.error,
    state: loadSessionQuery.state,
  };

  const refetchSession = () => {
    loadSessionQuery.refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        ...operationData,
        isAuthenticated,
        user: loadSessionQuery.data,
        refetchSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

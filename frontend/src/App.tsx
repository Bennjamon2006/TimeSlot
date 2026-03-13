import Router from "./components/Router";
import AuthProvider from "./context/auth/Auth.provider";
import QueryClient from "./context/query-client/QueryClient";

export default function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClient>
  );
}

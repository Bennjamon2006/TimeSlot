import Router from "./components/Router";
import AuthProvider from "./context/auth/Auth.provider";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

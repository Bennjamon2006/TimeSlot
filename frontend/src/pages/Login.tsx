import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useState } from "react";

import useMutation from "@/hooks/useMutation";
import authService from "@/services/auth.service";
import APIError from "@/helpers/APIError";
import useAuth from "@/hooks/useAuth";
import { loginMessages } from "@/constants/messages";

const parseLoginError = (error: unknown): string | null => {
  if (error === null) return null;

  if (error instanceof APIError) {
    if (error.status === 401 || error.status === 400) {
      return loginMessages.INVALID_CREDENTIALS;
    }
  }

  return loginMessages.UNEXPECTED_ERROR;
};

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation(authService.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disabled = loginMutation.state === "loading";
  const error = parseLoginError(loginMutation.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.reset();

    try {
      const response = await loginMutation.execute({ email, password });

      setToken(response.token);

      navigate("/dashboard");
    } catch (err) {
      if (!(err instanceof APIError)) {
        console.error("Login error:", err);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            TimeSlot
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            Inicia sesión para continuar
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } },
              }}
              disabled={disabled}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="Contraseña"
              type="password"
              fullWidth
              required
              sx={{ mb: 3 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } },
              }}
              disabled={disabled}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)",
                },
              }}
              disabled={disabled}
            >
              Iniciar Sesión
            </Button>
          </form>

          {error && (
            <Typography
              variant="body2"
              color="error"
              textAlign="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              component={RouterLink}
              underline="hover"
              fontWeight="bold"
            >
              Regístrate
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

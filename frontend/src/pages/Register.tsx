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
import { registerMessages } from "@/constants/messages";

const parseRegisterError = (error: unknown): string | null => {
  if (error === null) return null;

  if (error instanceof APIError) {
    if (error.status === 409) {
      return registerMessages.EMAIL_ALREADY_EXISTS;
    }

    if (error.status === 400 && "password" in error.data.details) {
      return registerMessages.PASSWORD_TOO_SHORT;
    }
  }

  return registerMessages.UNEXPECTED_ERROR;
};

export default function Register() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const registerMutation = useMutation(authService.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disabled = registerMutation.state === "loading";
  const error = parseRegisterError(registerMutation.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.reset();

    try {
      const response = await registerMutation.execute({
        name,
        email,
        password,
      });

      setToken(response.token);
      navigate("/"); // PROVISIONAL: Redirigir a la página principal después del registro
    } catch (error) {
      console.error(error);
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
            Crea tu cuenta
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nombre"
              fullWidth
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } },
              }}
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } },
              }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Contraseña"
              type="password"
              fullWidth
              required
              sx={{ mb: 3 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } },
              }}
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
            >
              Crear Cuenta{" "}
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
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              component={RouterLink}
              underline="hover"
              fontWeight="bold"
            >
              Inicia sesión
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

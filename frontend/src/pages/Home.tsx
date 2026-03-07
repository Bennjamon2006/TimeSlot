import { useNavigate } from "react-router-dom";
import { Container, Box, Button, Typography, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";

function Buttons() {
  const { isAuthenticated, user, destroySession } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <Stack spacing={2} sx={{ mt: 2 }} textAlign="center">
        <Typography variant="h5" color="white">
          Bienvenido de nuevo, {user?.name}
        </Typography>

        <Button
          onClick={() => navigate("/dashboard")}
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            py: 1.5,
            bgcolor: "white",
            color: "#667eea",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          Ir al Dashboard
        </Button>
        <Button
          onClick={destroySession}
          variant="outlined"
          size="large"
          sx={{
            py: 1.5,
            borderColor: "white",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Cerrar Sesión
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Button
        onClick={() => navigate("/register")}
        variant="contained"
        size="large"
        sx={{
          py: 1.5,
          bgcolor: "white",
          color: "#667eea",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        Registrarse
      </Button>
      <Button
        onClick={() => navigate("/login")}
        variant="outlined"
        size="large"
        sx={{
          py: 1.5,
          borderColor: "white",
          color: "white",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        Iniciar Sesión
      </Button>
    </Stack>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", color: "white" }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            TimeSlot
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
            Gestiona tus horarios de forma sencilla
          </Typography>
        </Box>

        <Buttons />
      </Container>
    </Box>
  );
}

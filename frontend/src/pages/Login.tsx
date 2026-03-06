import { Box, Container, TextField, Button, Typography, Link, Paper } from "@mui/material";

export default function Login() {
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
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            TimeSlot
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Inicia sesión para continuar
          </Typography>

          <form>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } }
              }}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              required
              sx={{ mb: 3 }}
              slotProps={{
                input: { sx: { borderRadius: 2 } }
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
                  background: "linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)",
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            ¿No tienes cuenta?{" "}
            <Link href="/register" underline="hover" fontWeight="bold">
              Regístrate
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

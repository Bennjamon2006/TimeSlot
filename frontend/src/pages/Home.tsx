import { Container, Box, Button, Typography, Stack } from "@mui/material";

export default function Home() {
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

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Button
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
        </Box>
      </Container>
    </Box>
  );
}

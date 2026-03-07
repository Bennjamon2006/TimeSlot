import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const initials = user!.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            TimeSlot
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">{user?.name}</Typography>
            <Avatar
              sx={{ width: 36, height: 36, bgcolor: "white", color: "#667eea" }}
            >
              {initials}
            </Avatar>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            >
              Cerrar Sesión
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenido, {user?.name.split(" ")[0]}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Gestiona tus horarios y reservas
        </Typography>

        <Grid container spacing={3}>
          {/* Mis Reservas */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Mis Reservas
              </Typography>
              <Stack spacing={2}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      15 de Marzo, 2026
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      09:00 - 10:00
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Confirmada
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      18 de Marzo, 2026
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      14:00 - 15:00
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Confirmada
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Paper>
          </Grid>

          {/* Horarios Disponibles */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Horarios Disponibles
              </Typography>
              <Stack spacing={2}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    bgcolor: "rgba(102, 126, 234, 0.05)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        20 de Marzo, 2026
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        09:00 - 10:00
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small">
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    bgcolor: "rgba(102, 126, 234, 0.05)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        20 de Marzo, 2026
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        10:00 - 11:00
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small">
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    bgcolor: "rgba(102, 126, 234, 0.05)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        21 de Marzo, 2026
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        14:00 - 15:00
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small">
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

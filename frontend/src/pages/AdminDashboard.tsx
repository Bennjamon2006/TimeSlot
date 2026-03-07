import Header from "@/components/Header";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: "Usuarios", value: "24", color: "#667eea" },
            { label: "Reservas", value: "156", color: "#764ba2" },
            { label: "Horarios", value: "42", color: "#48bb78" },
            { label: "Pendientes", value: "8", color: "#ed8936" },
          ].map((stat) => (
            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                  borderTop: `4px solid ${stat.color}`,
                }}
              >
                <Typography variant="h3" fontWeight="bold" color={stat.color}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Crear Horario */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Crear Horario
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Fecha inicio"
                  type="datetime-local"
                  fullWidth
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  label="Fecha fin"
                  type="datetime-local"
                  fullWidth
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <Button variant="contained" fullWidth>
                  Crear
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Últimas Reservas */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Últimas Reservas
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Usuario</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      {
                        user: "Juan Pérez",
                        date: "15/03/2026 09:00",
                        status: "confirmada",
                      },
                      {
                        user: "María García",
                        date: "16/03/2026 10:00",
                        status: "confirmada",
                      },
                      {
                        user: "Carlos López",
                        date: "17/03/2026 14:00",
                        status: "pendiente",
                      },
                    ].map((booking) => (
                      <TableRow key={booking.user}>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={booking.status}
                            size="small"
                            color={
                              booking.status === "confirmada"
                                ? "success"
                                : "warning"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" color="error">
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

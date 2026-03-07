import {
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";

export default function OpenBookings() {
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Reservas Abiertas
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
                        booking.status === "confirmada" ? "success" : "warning"
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
  );
}

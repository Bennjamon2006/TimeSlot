import {
  Grid,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";

import BookingCard from "./BookingCard";
import useQuery from "@/hooks/useQuery";
import bookingsService from "@/services/bookings.service";

export default function MyBookings() {
  const getBookingsQuery = useQuery(
    "user-bookings",
    () => bookingsService.getBookings(),
    10000,
  );
  const bookings = getBookingsQuery.data || [];

  const handleRefresh = () => {
    getBookingsQuery.refetch();
  };

  return (
    <Grid size={{ xs: 12, md: 8 }} mx="auto">
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Mis Reservas
        </Typography>
        <Stack spacing={2}>
          {getBookingsQuery.state === "loading" && (
            <Typography variant="body1" color="text.secondary">
              Cargando tus reservas...
            </Typography>
          )}
          {getBookingsQuery.state === "success" && bookings.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              No tienes reservas activas.
            </Typography>
          )}
          {getBookingsQuery.state === "success" &&
            bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
          {getBookingsQuery.state === "error" && (
            <Box textAlign="center" py={5}>
              <Typography variant="body1" color="error.main">
                Error al cargar tus reservas.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleRefresh}>
                Reintentar
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
}

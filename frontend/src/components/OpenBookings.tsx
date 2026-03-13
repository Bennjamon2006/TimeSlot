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

import bookingsService, {
  BookingWithRelations,
} from "@/services/bookings.service";
import useQuery from "@/hooks/useQuery";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import formatDate from "@/helpers/formatDate";
import useMutation from "@/hooks/useMutation";

function BookingRow(data: { booking: BookingWithRelations }) {
  const { booking } = data;
  const formattedDate = formatDate(
    new Date(booking.timeSlot!.startTime),
    new Date(booking.timeSlot!.endTime),
  );

  const cancelBookingMutation = useMutation(bookingsService.cancelBooking);
  const disabled = cancelBookingMutation.state === "loading";

  if (cancelBookingMutation.state === "success") {
    return null;
  }

  const handleCancel = async () => {
    await cancelBookingMutation.execute(booking.id);
  };

  return (
    <TableRow>
      <TableCell>{booking.user?.name}</TableCell>
      <TableCell>
        {formattedDate.day} {formattedDate.time}
      </TableCell>
      <TableCell>
        <Button
          size="small"
          color="error"
          onClick={handleCancel}
          disabled={disabled}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function OpenBookings() {
  const getBookingsQuery = useQuery(
    "open-bookings",
    bookingsService.getBookings,
    10000,
  );
  const bookings = getBookingsQuery.data || [];

  if (getBookingsQuery.state === "loading") {
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <LoadingPlaceholder variant="detail" />;
      </Grid>
    );
  }

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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}

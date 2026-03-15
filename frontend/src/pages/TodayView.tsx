import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import useDay from "@/hooks/useDay";
import formatDate from "@/helpers/formatDate";
import QueryClientContext from "@/context/query-client/QueryClient.context";
import useMutation from "@/hooks/useMutation";
import bookingsService from "@/services/bookings.service";
import { useContext, useState } from "react";

export default function TodayView() {
  const today = new Date();

  const { availableSlots, bookings, day, year, name, loading } = useDay(
    today.getDate(),
  );

  const queryClient = useContext(QueryClientContext);
  const createBookingMutation = useMutation(bookingsService.createBooking);
  const cancelBookingMutation = useMutation(bookingsService.cancelBooking);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const isCreatingBooking = createBookingMutation.state === "loading";
  const isCancellingBooking = cancelBookingMutation.state === "loading";

  const handleBook = async (slotId: string) => {
    setSelectedSlot(slotId);

    await createBookingMutation.execute(slotId);
    queryClient.invalidateQuery("available-time-slots");
    queryClient.invalidateQuery("user-bookings");
  };

  const handleCancel = async (bookingId: string) => {
    setSelectedBooking(bookingId);

    await cancelBookingMutation.execute(bookingId);
    queryClient.invalidateQuery("available-time-slots");
    queryClient.invalidateQuery("user-bookings");
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <LoadingPlaceholder variant="page" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header del día */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <CalendarTodayIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {day} de {name} {year}
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
            </Box>
          </Box>
        </Paper>

        {/* Mi reserva de hoy */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
          >
            <EventBusyIcon color="primary" />
            Mis Reservas ({bookings.length})
          </Typography>

          {bookings.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No tienes reservas para hoy.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {bookings.map((booking) => (
                <Box
                  key={booking.id}
                  sx={{
                    p: 2,
                    bgcolor: "rgba(102, 126, 234, 0.1)",
                    borderRadius: 1,
                    border: "1px solid rgba(102, 126, 234, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="body1" fontWeight="medium">
                      {
                        formatDate(
                          new Date(booking.timeSlot.startTime),
                          new Date(booking.timeSlot.endTime),
                        ).time
                      }
                    </Typography>
                  </Box>
                  <Chip
                    label="Cancelar"
                    size="small"
                    color="error"
                    sx={{ mt: 1 }}
                    onClick={() => handleCancel(booking.id)}
                    disabled={
                      isCancellingBooking && selectedBooking === booking.id
                    }
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Horarios disponibles hoy */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
          >
            <EventAvailableIcon color="success" />
            Disponibles Hoy ({availableSlots.length})
          </Typography>

          {availableSlots.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No hay horarios disponibles para hoy.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {availableSlots.map((slot) => (
                <Box
                  key={slot.id}
                  sx={{
                    p: 1.5,
                    bgcolor: "rgba(72, 187, 120, 0.1)",
                    borderRadius: 1,
                    border: "1px solid rgba(72, 187, 120, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    {
                      formatDate(
                        new Date(slot.startTime),
                        new Date(slot.endTime),
                      ).time
                    }
                  </Typography>

                  <Chip
                    label="Reservar"
                    size="small"
                    variant="outlined"
                    color="success"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleBook(slot.id)}
                    disabled={isCreatingBooking && selectedSlot === slot.id}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

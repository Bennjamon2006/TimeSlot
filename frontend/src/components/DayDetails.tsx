import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import formatDate from "@/helpers/formatDate";
import useDay from "@/hooks/useDay";
import useMutation from "@/hooks/useMutation";
import bookingsService from "@/services/bookings.service";
import { useContext, useState } from "react";
import QueryClientContext from "@/context/query-client/QueryClient.context";

export default function DayDetails({
  day,
  open,
  onClose,
}: {
  day: number;
  open: boolean;
  onClose: () => void;
}) {
  const { name, year, availableSlots, bookings } = useDay(day);
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {day} de {name} {year}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Mi reserva */}
        {bookings.length > 0 && (
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              color="primary"
              fontWeight="bold"
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <EventBusyIcon fontSize="small" />
              Mis Reservas ({bookings.length})
            </Typography>
            <Stack spacing={1}>
              {bookings.map((booking) => (
                <Box
                  key={booking.id}
                  sx={{
                    p: 1.5,
                    bgcolor: "rgba(102, 126, 234, 0.1)",
                    borderRadius: 1,
                    border: "1px solid rgba(102, 126, 234, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="body2" fontWeight="medium">
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
                    variant="outlined"
                    disabled={
                      isCancellingBooking && selectedBooking === booking.id
                    }
                    onClick={() => handleCancel(booking.id)}
                    sx={{
                      mt: 1,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Disponibles */}
        <Box>
          <Typography
            variant="subtitle2"
            color="success.main"
            fontWeight="bold"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
          >
            <EventAvailableIcon fontSize="small" />
            Horarios Disponibles ({availableSlots.length})
          </Typography>

          {availableSlots.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No hay horarios disponibles este día.
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
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon fontSize="small" color="success" />
                    <Typography variant="body2">
                      {
                        formatDate(
                          new Date(slot.startTime),
                          new Date(slot.endTime),
                        ).time
                      }
                    </Typography>
                  </Box>
                  <Chip
                    label="Reservar"
                    size="small"
                    color="success"
                    variant="outlined"
                    disabled={isCreatingBooking && selectedSlot === slot.id}
                    onClick={() => handleBook(slot.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

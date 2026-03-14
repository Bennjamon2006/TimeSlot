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
import timeSlotsService, { TimeSlot } from "@/services/timeSlots.service";
import getMonth from "@/helpers/getMonth";
import useQuery from "@/hooks/useQuery";
import bookingsService from "@/services/bookings.service";
import { useMemo } from "react";
import formatDate from "@/helpers/formatDate";

export default function DayDetails({
  day,
  open,
  onClose,
}: {
  day: number;
  open: boolean;
  onClose: () => void;
}) {
  const { month, name, year } = getMonth();

  const getBookingsQuery = useQuery("user-bookings", () =>
    bookingsService.getBookings(),
  );
  const getTimeSlotsQuery = useQuery(
    "available-time-slots",
    () =>
      timeSlotsService.getTimeSlots({
        startAfter: new Date(year, month, day).toISOString(),
        booked: false,
      }),
    10000,
  );

  const { availableSlots, bookedSlots } = useMemo(() => {
    const timeSlots = getTimeSlotsQuery.data?.data || [];
    const bookings = getBookingsQuery.data || [];

    const availableSlots = timeSlots.filter(
      (ts) => new Date(ts.startTime).getDate() === day,
    );

    const bookedSlots =
      bookings
        .filter((b) => new Date(b.timeSlot.startTime).getDate() === day)
        .map((b) => b.timeSlot) || [];

    return { availableSlots, bookedSlots };
  }, [getBookingsQuery.data, getTimeSlotsQuery.data]);

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
        {bookedSlots.length > 0 && (
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
              Mis Reservas ({bookedSlots.length})
            </Typography>
            <Stack spacing={1}>
              {bookedSlots.map((slot) => (
                <Box
                  key={slot.id}
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
                          new Date(slot.startTime),
                          new Date(slot.endTime),
                        ).time
                      }
                    </Typography>
                  </Box>
                  <Chip
                    label="Cancelar"
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "error.main",
                        color: "#fff",
                      },
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
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "success.main",
                        color: "#fff",
                      },
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

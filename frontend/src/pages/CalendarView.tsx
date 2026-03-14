import { Box, Container, Typography, Paper, Grid, Stack } from "@mui/material";
import { useState } from "react";

import getMonth from "@/helpers/getMonth";
import timeSlotsService from "@/services/timeSlots.service";
import bookingsService from "@/services/bookings.service";
import useQuery from "@/hooks/useQuery";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import DayDetails from "@/components/DayDetails";

function DayCell({
  day,
  isAvailable,
  isBooked,
  isToday,
}: {
  day: number;
  isAvailable: boolean;
  isBooked: boolean;
  isToday: boolean;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <Grid
        size={{ xs: 12 / 7 }}
        key={day}
        onClick={() => (isAvailable || isBooked ? setDetailsOpen(true) : null)}
      >
        <Box
          sx={{
            height: 60,
            border: isToday ? "2px solid #667eea" : "1px solid #eee",
            borderRadius: 1,
            p: 0.5,
            cursor: isAvailable || isBooked ? "pointer" : "default",
            bgcolor: isAvailable
              ? "rgba(72, 187, 120, 0.4)"
              : isBooked
                ? "rgba(102, 126, 234, 0.4)"
                : "transparent",
            "&:hover": isAvailable
              ? { bgcolor: "rgba(102, 126, 234, 0.2)" }
              : isBooked
                ? { bgcolor: "rgba(102, 126, 234, 0.2)" }
                : {},
          }}
        >
          <Typography
            variant="body2"
            fontWeight={isToday ? "bold" : "normal"}
            color={isToday ? "primary" : "text.primary"}
          >
            {day}
          </Typography>
          {isAvailable ? (
            <Typography variant="caption" color="success.main" fontSize={9}>
              Disponible
            </Typography>
          ) : isBooked ? (
            <Typography variant="caption" color="primary.main" fontSize={9}>
              Reservado
            </Typography>
          ) : null}
        </Box>
      </Grid>
      <DayDetails
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        day={day}
      />
    </>
  );
}

export default function CalendarView() {
  const { name, year, month, monthDays, firstDayOfMonth } = getMonth();
  const days = Array.from({ length: monthDays }, (_, i) => i + 1);

  const getTimeSlotsQuery = useQuery(
    "available-time-slots",
    () =>
      timeSlotsService.getTimeSlots({
        startAfter: new Date(year, month, 1).toISOString(),
        startBefore: new Date(year, month + 1, 0, 23, 59, 59).toISOString(),
        booked: false,
      }),
    10000,
  );
  const getBookingsQuery = useQuery(
    "user-bookings",
    () => bookingsService.getBookings(),
    10000,
  );

  const availableDays = new Set(
    getTimeSlotsQuery.data?.data.map((ts) => new Date(ts.startTime).getDate()),
  );

  const bookedDays = new Set(
    getBookingsQuery.data?.map((b) => new Date(b.timeSlot.startTime).getDate()),
  );

  if (
    getTimeSlotsQuery.state === "loading" ||
    getBookingsQuery.state === "loading"
  ) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <LoadingPlaceholder variant="page" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {name} {year}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <Grid size={{ xs: 12 / 7 }} key={d}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                  display="block"
                >
                  {d}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={1}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <Grid size={{ xs: 12 / 7 }} key={`empty-${i}`}>
                <Box sx={{ height: 60 }} />
              </Grid>
            ))}

            {days.map((day) => {
              const isAvailable = availableDays.has(day);
              const isBooked = bookedDays.has(day);
              const isToday = day === new Date().getDate();

              return (
                <DayCell
                  key={day}
                  day={day}
                  isAvailable={isAvailable}
                  isBooked={isBooked}
                  isToday={isToday}
                />
              );
            })}
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "rgba(72, 187, 120, 0.3)",
                  borderRadius: 1,
                }}
              />
              <Typography variant="caption">Disponible</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "rgba(102, 126, 234, 0.3)",
                  borderRadius: 1,
                }}
              />
              <Typography variant="caption">Reservado</Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

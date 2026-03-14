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

import LoadingPlaceholder from "./LoadingPlaceholder";
import timeSlotsService from "@/services/timeSlots.service";
import useQuery from "@/hooks/useQuery";
import TimeSlotCard from "./TimeSlotCard";

export default function AvailableTimeSlots() {
  const getTimeSlotsQuery = useQuery(
    "available-time-slots",
    () =>
      timeSlotsService.getTimeSlots({
        startAfter: new Date().toISOString(),
        booked: false,
      }),
    10000,
  );

  const timeSlots = getTimeSlotsQuery.data?.data || [];

  const handleRefresh = () => {
    getTimeSlotsQuery.refetch();
  };

  return (
    <Grid size={{ xs: 12, md: 8 }} mx="auto">
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Horarios Disponibles
        </Typography>
        <Stack spacing={2}>
          {getTimeSlotsQuery.state === "loading" && (
            <LoadingPlaceholder variant="list" />
          )}
          {getTimeSlotsQuery.state === "success" &&
            timeSlots.map((ts) => <TimeSlotCard key={ts.id} timeSlot={ts} />)}

          {getTimeSlotsQuery.state === "success" && timeSlots.length === 0 && (
            <Box textAlign="center" py={5}>
              <Typography variant="body1" color="text.secondary">
                No hay horarios disponibles por el momento.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleRefresh}>
                Refrescar
              </Button>
            </Box>
          )}

          {getTimeSlotsQuery.state === "error" && (
            <Box textAlign="center" py={5}>
              <Typography variant="body1" color="error.main">
                Error al cargar los horarios.
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

import formatDate from "@/helpers/formatDate";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";

import QueryClientContext from "@/context/query-client/QueryClient.context";
import timeSlotsService, { TimeSlot } from "@/services/timeSlots.service";
import useMutation from "@/hooks/useMutation";
import bookingsService from "@/services/bookings.service";
import useProfile from "@/hooks/useProfile";

export default function TimeSlotCard({ timeSlot }: { timeSlot: TimeSlot }) {
  const { role } = useProfile();
  const { invalidateQuery } = useContext(QueryClientContext);
  const createBookingMutation = useMutation(bookingsService.createBooking);
  const deleteTimeSlotMutation = useMutation(() =>
    timeSlotsService.deleteTimeSlot(timeSlot.id),
  );
  const disabled =
    createBookingMutation.state === "loading" ||
    createBookingMutation.state === "success" ||
    deleteTimeSlotMutation.state === "loading";
  const created = createBookingMutation.state === "success";

  const { startTime, endTime } = timeSlot;

  const formattedDate = formatDate(new Date(startTime), new Date(endTime));

  const handleBooking = async () => {
    if (role === "ADMIN") {
      await deleteTimeSlotMutation.execute();
      invalidateQuery("available-time-slots");
      return;
    }

    await createBookingMutation.execute(timeSlot.id);

    invalidateQuery("available-time-slots");
    invalidateQuery("user-bookings");
  };

  return (
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
            {formattedDate.day}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedDate.time}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color={created ? "success" : "primary"}
          size="small"
          onClick={handleBooking}
          disabled={disabled}
        >
          {role === "ADMIN"
            ? disabled
              ? "Eliminando..."
              : "Eliminar"
            : created
              ? "Reservado"
              : disabled
                ? "Reservando..."
                : "Reservar"}
        </Button>
      </CardContent>
    </Card>
  );
}

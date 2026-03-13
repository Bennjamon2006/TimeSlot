import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";

import QueryClientContext from "@/context/query-client/QueryClient.context";
import bookingsService, {
  BookingWithRelations,
} from "@/services/bookings.service";
import formatDate from "@/helpers/formatDate";
import useMutation from "@/hooks/useMutation";

export default function BookingCard({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const { invalidateQuery } = useContext(QueryClientContext);
  const cancelBookingMutation = useMutation(bookingsService.cancelBooking);
  const disabled =
    cancelBookingMutation.state === "loading" ||
    cancelBookingMutation.state === "success";
  const canceled = cancelBookingMutation.state === "success";

  const { timeSlot } = booking;
  const formattedDate = formatDate(
    new Date(timeSlot!.startTime),
    new Date(timeSlot!.endTime),
  );

  const handleCancel = async () => {
    await cancelBookingMutation.execute(booking.id);

    invalidateQuery("available-time-slots");
    invalidateQuery("user-bookings");
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1" fontWeight="bold">
              {formattedDate.day}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formattedDate.time}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color={disabled ? "primary" : "error"}
            size="small"
            onClick={handleCancel}
            disabled={disabled}
          >
            {canceled ? "Cancelado" : disabled ? "Cancelando..." : "Cancelar"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

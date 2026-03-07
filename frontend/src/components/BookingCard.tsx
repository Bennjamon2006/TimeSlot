import { Card, CardContent, Typography } from "@mui/material";
import { BookingWithRelations } from "@/services/bookings.service";
import formatDate from "@/helpers/formatDate";

export default function BookingCard({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const { timeSlot } = booking;
  const formattedDate = formatDate(
    new Date(timeSlot!.startTime),
    new Date(timeSlot!.endTime),
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {formattedDate.day}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate.time}
        </Typography>
        <Typography variant="body2" color="success.main">
          Confirmada
        </Typography>
      </CardContent>
    </Card>
  );
}

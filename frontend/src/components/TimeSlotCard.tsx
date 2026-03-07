import { TimeSlot } from "@/services/timeSlots.service";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function TimeSlotCard({ timeSlot }: { timeSlot: TimeSlot }) {
  const { startTime, endTime } = timeSlot;

  const dayString = new Date(startTime).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeString = `${new Date(startTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${new Date(endTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

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
            {dayString}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeString}
          </Typography>
        </Box>
        <Button variant="contained" size="small">
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}

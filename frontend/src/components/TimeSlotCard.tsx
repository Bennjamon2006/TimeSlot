import formatDate from "@/helpers/formatDate";
import { TimeSlot } from "@/services/timeSlots.service";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function TimeSlotCard({ timeSlot }: { timeSlot: TimeSlot }) {
  const { startTime, endTime } = timeSlot;

  const formattedDate = formatDate(new Date(startTime), new Date(endTime));

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
        <Button variant="contained" size="small">
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}

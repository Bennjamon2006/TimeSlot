import { Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import DayDetails from "./DayDetails";

export default function DayCell({
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

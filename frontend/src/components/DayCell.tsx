import { Grid, Box, Typography } from "@mui/material";

export default function DayCell({
  day,
  isAvailable,
  isBooked,
  isToday,
  onClick,
}: {
  day: number;
  isAvailable: boolean;
  isBooked: boolean;
  isToday: boolean;
  onClick?: () => void;
}) {
  const hasContent = isAvailable || isBooked;

  return (
    <Grid size={{ xs: 12 / 7 }} key={day}>
      <Box
        sx={{
          height: 60,
          border: isToday ? "2px solid #667eea" : "1px solid #eee",
          borderRadius: 1,
          p: 0.5,
          cursor: hasContent ? "pointer" : "default",
          bgcolor: isAvailable
            ? "rgba(72, 187, 120, 0.4)"
            : isBooked
              ? "rgba(102, 126, 234, 0.4)"
              : "transparent",
          "&:hover": hasContent
            ? { bgcolor: "rgba(102, 126, 234, 0.2)" }
            : {},
        }}
        onClick={hasContent ? onClick : undefined}
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
  );
}
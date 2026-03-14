import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";

export default function CalendarView() {
  // Días de ejemplo
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const availableDays = [5, 8, 12, 15, 18, 22, 25, 28];
  const bookedDays = [8, 22];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Calendario */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Marzo 2026
          </Typography>

          {/* Días de la semana */}
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

          {/* Días del mes */}
          <Grid container spacing={1}>
            {/* Espacios vacíos para comenzar desde lunes (primer día del mes) */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid size={{ xs: 12 / 7 }} key={`empty-${i}`}>
                <Box sx={{ height: 60 }} />
              </Grid>
            ))}

            {days.map((day) => {
              const isAvailable = availableDays.includes(day);
              const isBooked = bookedDays.includes(day);
              const isToday = day === 14;

              return (
                <Grid size={{ xs: 12 / 7 }} key={day}>
                  <Box
                    sx={{
                      height: 60,
                      border: isToday ? "2px solid #667eea" : "1px solid #eee",
                      borderRadius: 1,
                      p: 0.5,
                      cursor: isAvailable ? "pointer" : "default",
                      bgcolor: isBooked
                        ? "rgba(102, 126, 234, 0.4)"
                        : isAvailable
                          ? "rgba(72, 187, 120, 0.4)"
                          : "transparent",
                      "&:hover": isAvailable
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
                    {isAvailable && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontSize={9}
                      >
                        {isBooked ? "Reservado" : "Disponible"}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Leyenda */}
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

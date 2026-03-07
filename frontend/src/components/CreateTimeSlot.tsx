import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

import timeSlotsService from "@/services/timeSlots.service";
import useMutation from "@/hooks/useMutation";
import { createTimeSlotMessages } from "@/constants/messages";
import APIError from "@/helpers/APIError";

function parseCreateTimeSlotError(error: unknown): string | null {
  if (error === null) return null;

  if (error instanceof APIError) {
    if (error.status === 409) {
      return createTimeSlotMessages.OVERLAPPING_SLOT;
    } else if (error.status === 400) {
      return createTimeSlotMessages.INVALID_DATES;
    }
  }

  return createTimeSlotMessages.UNEXPECTED_ERROR;
}

export default function CreateTimeSlot() {
  const nowRef = useRef(new Date());
  const nowLocal = new Date(
    nowRef.current.getTime() - nowRef.current.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 16);

  const createTimeSlotMutation = useMutation(timeSlotsService.createTimeSlot);
  const [startDate, setStartDate] = useState(nowLocal);
  const [endDate, setEndDate] = useState(nowLocal);

  const disabled = createTimeSlotMutation.state === "loading";
  const error = parseCreateTimeSlotError(createTimeSlotMutation.error);
  const isValid =
    new Date(startDate) < new Date(endDate) && new Date(startDate) > new Date();

  const handleCreate = async () => {
    if (!isValid) return;

    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    await createTimeSlotMutation.execute({ startTime: start, endTime: end });
  };

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Crear Horario
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Fecha inicio"
            type="datetime-local"
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="Fecha fin"
            type="datetime-local"
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCreate}
            disabled={!isValid || disabled}
          >
            {createTimeSlotMutation.state === "loading"
              ? "Creando..."
              : "Crear Horario"}
          </Button>

          {!isValid && (
            <Typography variant="body2" color="error">
              La fecha de inicio debe ser anterior a la fecha de fin y ambas
              deben ser futuras.
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          {createTimeSlotMutation.state === "success" && (
            <Typography variant="body2" color="success.main">
              Horario creado exitosamente.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
}

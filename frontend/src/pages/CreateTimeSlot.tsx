import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateTimeSlot() {
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
          />
          <TextField
            label="Fecha fin"
            type="datetime-local"
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Button variant="contained" fullWidth>
            Crear
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

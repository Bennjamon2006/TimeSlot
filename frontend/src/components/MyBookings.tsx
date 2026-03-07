import {
  Grid,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";

export default function MyBookings() {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Mis Reservas
        </Typography>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                15 de Marzo, 2026
              </Typography>
              <Typography variant="body2" color="text.secondary">
                09:00 - 10:00
              </Typography>
              <Typography variant="body2" color="success.main">
                Confirmada
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                18 de Marzo, 2026
              </Typography>
              <Typography variant="body2" color="text.secondary">
                14:00 - 15:00
              </Typography>
              <Typography variant="body2" color="success.main">
                Confirmada
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Paper>
    </Grid>
  );
}

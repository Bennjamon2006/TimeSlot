import {
  Grid,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";

export default function AvailableBookings() {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Horarios Disponibles
        </Typography>
        <Stack spacing={2}>
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
                  20 de Marzo, 2026
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  09:00 - 10:00
                </Typography>
              </Box>
              <Button variant="contained" size="small">
                Reservar
              </Button>
            </CardContent>
          </Card>
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
                  20 de Marzo, 2026
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  10:00 - 11:00
                </Typography>
              </Box>
              <Button variant="contained" size="small">
                Reservar
              </Button>
            </CardContent>
          </Card>
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
                  21 de Marzo, 2026
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  14:00 - 15:00
                </Typography>
              </Box>
              <Button variant="contained" size="small">
                Reservar
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Paper>
    </Grid>
  );
}

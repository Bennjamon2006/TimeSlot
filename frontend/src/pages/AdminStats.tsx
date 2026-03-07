import { Grid, Paper, Typography } from "@mui/material";

export default function AdminStats() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[
        { label: "Usuarios", value: "24", color: "#667eea" },
        { label: "Reservas", value: "156", color: "#764ba2" },
        { label: "Horarios", value: "42", color: "#48bb78" },
        { label: "Pendientes", value: "8", color: "#ed8936" },
      ].map((stat) => (
        <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              textAlign: "center",
              borderTop: `4px solid ${stat.color}`,
            }}
          >
            <Typography variant="h3" fontWeight="bold" color={stat.color}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

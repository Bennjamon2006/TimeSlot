import { Grid, Paper, Typography } from "@mui/material";

import adminService from "@/services/admin.service";
import useQuery from "@/hooks/useQuery";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

const COLORS = {
  users: "#667eea",
  bookings: "#764ba2",
  timeSlots: "#48bb78",
};

function StatCard(stat: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
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
  );
}

export default function AdminStats() {
  const getStatsQuery = useQuery(adminService.getAdminStats);
  const stats = getStatsQuery.data;

  if (getStatsQuery.state === "loading") {
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <LoadingPlaceholder variant="detail" />;
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
      <StatCard
        label="Usuarios Totales"
        value={stats?.totalUsers ?? 0}
        color={COLORS.users}
      />
      <StatCard
        label="Reservas Totales"
        value={stats?.totalBookings ?? 0}
        color={COLORS.bookings}
      />
      <StatCard
        label="Horarios Totales"
        value={stats?.totalTimeSlots ?? 0}
        color={COLORS.timeSlots}
      />
    </Grid>
  );
}

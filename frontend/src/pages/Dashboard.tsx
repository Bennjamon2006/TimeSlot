import { Box, Container, Typography, Grid } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import Header from "@/components/Header";
import MyBookings from "@/components/MyBookings";
import AvailableBookings from "@/components/AvailableBookings";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenido, {user?.name.split(" ")[0]}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Gestiona tus horarios y reservas
        </Typography>

        <Grid container spacing={3}>
          <MyBookings />

          <AvailableBookings />
        </Grid>
      </Container>
    </Box>
  );
}

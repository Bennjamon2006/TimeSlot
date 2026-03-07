import Header from "@/components/Header";
import { Box, Container, Grid } from "@mui/material";
import AdminStats from "../components/AdminStats";
import CreateTimeSlot from "../components/CreateTimeSlot";
import OpenBookings from "../components/OpenBookings";

export default function AdminDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AdminStats />
        <Grid container spacing={3}>
          <CreateTimeSlot />
          <OpenBookings />
        </Grid>
      </Container>
    </Box>
  );
}

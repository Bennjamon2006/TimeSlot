import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Header from "@/components/Header";
import MyBookings from "@/components/MyBookings";
import AvailableTimeSlots from "@/components/AvailableTimeSlots";
import CalendarView from "@/pages/CalendarView";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenido, {user?.name.split(" ")[0]}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Gestiona tus horarios y reservas
        </Typography>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
            <Tab label="Mis Reservas" />
            <Tab label="Horarios Disponibles" />
            <Tab label="Calendario" />
          </Tabs>
        </Paper>

        {/* Contenido según tab */}
        {tab === 0 && (
          <Grid container spacing={3} alignItems="stretch">
            <MyBookings />
          </Grid>
        )}

        {tab === 1 && (
          <Grid container spacing={3} alignItems="stretch">
            <AvailableTimeSlots />
          </Grid>
        )}

        {tab === 2 && <CalendarView />}
      </Container>
    </Box>
  );
}

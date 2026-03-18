import {
  Box,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { useState } from "react";

import Header from "@/components/Header";
import AdminStats from "../components/AdminStats";
import CreateTimeSlot from "../components/CreateTimeSlot";
import OpenBookings from "../components/OpenBookings";
import useProfile from "@/hooks/useProfile";
import CalendarView from "@/components/CalendarView";
import AvailableTimeSlots from "@/components/AvailableTimeSlots";
import Users from "@/components/Users";

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const { name } = useProfile();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1">
            Bienvenido, {name}!
          </Typography>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
            <Tab label="General" />
            <Tab label="Calendario" />
            <Tab label="Horarios" />
            <Tab label="Usuarios" />
          </Tabs>
        </Paper>

        <Box>
          {tab === 0 && (
            <>
              <AdminStats />
              <Grid container spacing={3}>
                <CreateTimeSlot />
                <OpenBookings />
              </Grid>
            </>
          )}

          {tab === 1 && <CalendarView />}

          {tab === 2 && <AvailableTimeSlots />}

          {tab === 3 && <Users />}
        </Box>
      </Container>
    </Box>
  );
}

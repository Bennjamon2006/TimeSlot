import Header from "@/components/Header";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AdminStats from "./AdminStats";
import CreateTimeSlot from "./CreateTimeSlot";
import OpenBookings from "./OpenBookings";

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

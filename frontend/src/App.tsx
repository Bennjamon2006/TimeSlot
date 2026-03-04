import { Container, Grid, Stack } from '@mui/material';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Header />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard title="Frontend listo" description="React + TypeScript + MUI" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard title="Backend listo" description="Node + Express + TypeScript" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard title="Siguiente paso" description="Agregar lógica de negocio" />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

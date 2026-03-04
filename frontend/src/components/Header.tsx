import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Paper, Stack, Typography } from '@mui/material';

export default function Header() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <AccessTimeIcon color="primary" />
        <Typography variant="h4" fontWeight={700}>
          TimeSlot
        </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Boilerplate base para tu proyecto full-stack.
      </Typography>
    </Paper>
  );
}

import { Card, CardContent, Typography } from '@mui/material';

type Props = {
  title: string;
  description: string;
};

export default function DashboardCard({ title, description }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

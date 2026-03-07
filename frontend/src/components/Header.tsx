import {
  AppBar,
  Avatar,
  Button,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const initials = user!.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          TimeSlot
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">{user?.name}</Typography>
          <Avatar
            sx={{ width: 36, height: 36, bgcolor: "white", color: "#667eea" }}
          >
            {initials}
          </Avatar>
          <Button
            color="inherit"
            size="small"
            variant="outlined"
            sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
          >
            Cerrar Sesión
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

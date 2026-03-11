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
import { useState } from "react";
import ProfileView from "./ProfileView";
import useProfile from "@/hooks/useProfile";

export default function Header() {
  const { destroySession } = useAuth();
  const { name, initials, avatarColor } = useProfile();

  const [profileOpen, setProfileOpen] = useState(false);

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
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={() => setProfileOpen(true)}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">{name}</Typography>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "white",
                color: avatarColor,
              }}
            >
              {initials}
            </Avatar>
          </Stack>
          <Button
            onClick={destroySession}
            color="inherit"
            size="small"
            variant="outlined"
            sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
          >
            Cerrar Sesión
          </Button>
        </Stack>
      </Toolbar>

      <ProfileView opened={profileOpen} close={() => setProfileOpen(false)} />
    </AppBar>
  );
}

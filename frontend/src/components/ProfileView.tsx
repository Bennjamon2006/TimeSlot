import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

import useProfile from "@/hooks/useProfile";
import DeletionConfirmation from "./DeletionConfirmation";

export default function ProfileView({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { name, email, initials, avatarColor, hash } = useProfile();
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const password = "*".repeat(6 + (hash % 10));

  return (
    <Dialog
      open={opened}
      onClose={close}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Mi perfil
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} alignItems="center" mt={1}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: avatarColor }}>
            {initials}
          </Avatar>

          <Box textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Nombre
            </Typography>
            <Typography fontWeight="bold">{name}</Typography>
          </Box>

          <Box textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Correo electrónico
            </Typography>
            <Typography>{email}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Contraseña
            </Typography>
            <Typography fontFamily="monospace">{password}</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button fullWidth variant="contained">
          Actualizar perfil
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={() => setDeletionDialogOpen(true)}
        >
          Eliminar cuenta
        </Button>
      </DialogActions>
      <DeletionConfirmation
        opened={deletionDialogOpen}
        close={() => setDeletionDialogOpen(false)}
      />
    </Dialog>
  );
}

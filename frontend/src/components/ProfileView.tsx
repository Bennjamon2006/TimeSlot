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
  TextField,
} from "@mui/material";
import { useState } from "react";

import useProfile from "@/hooks/useProfile";
import DeletionConfirmation from "./DeletionConfirmation";
import usersService from "@/services/users.service";
import useMutation from "@/hooks/useMutation";
import APIError from "@/helpers/APIError";
import { registerMessages } from "@/constants/messages";

const parseUpdateError = (error: unknown): string | null => {
  if (error === null) return null;

  if (error instanceof APIError) {
    if (error.status === 409) {
      return registerMessages.EMAIL_ALREADY_EXISTS;
    }

    if (error.status === 400 && "password" in error.data.details) {
      return registerMessages.PASSWORD_TOO_SHORT;
    }
  }

  return registerMessages.UNEXPECTED_ERROR;
};

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

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState("");
  const updateUserMutation = useMutation(usersService.updateCurrentUser);

  const error = parseUpdateError(updateUserMutation.error);
  const isLoading = updateUserMutation.state === "loading";
  const hasChanges =
    editedName !== name ||
    editedEmail !== email ||
    (isEditingPassword && editedPassword.length > 0);

  const handleSaveChanges = async () => {
    const updatedProfile: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (editedName !== name) {
      updatedProfile.name = editedName;
    }

    if (editedEmail !== email) {
      updatedProfile.email = editedEmail;
    }

    if (isEditingPassword) {
      updatedProfile.password = editedPassword;
    }

    await updateUserMutation.execute(updatedProfile);

    setIsEditing(false);
    setEditedPassword("");
    setIsEditingPassword(false);
  };

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
            {isEditing ? (
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
                size="small"
              />
            ) : (
              <Typography fontWeight="bold">{name}</Typography>
            )}
          </Box>

          <Box textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Correo electrónico
            </Typography>
            {isEditing ? (
              <TextField
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                fullWidth
                size="small"
              />
            ) : (
              <Typography fontWeight="bold">{email}</Typography>
            )}
          </Box>
          <Box textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Contraseña
            </Typography>
            {isEditing ? (
              isEditingPassword ? (
                <TextField
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                  fullWidth
                  size="small"
                  type="password"
                />
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsEditingPassword(true)}
                  sx={{
                    display: "block",
                  }}
                >
                  Cambiar contraseña
                </Button>
              )
            ) : (
              <Typography fontWeight="bold">{password}</Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {isEditing ? (
          <>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSaveChanges}
              disabled={isLoading || !hasChanges}
            >
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>

            {error && (
              <Typography color="error" textAlign="center" mt={2}>
                {error}
              </Typography>
            )}
          </>
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
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
          </>
        )}
      </DialogActions>
      <DeletionConfirmation
        opened={deletionDialogOpen}
        close={() => setDeletionDialogOpen(false)}
      />
    </Dialog>
  );
}

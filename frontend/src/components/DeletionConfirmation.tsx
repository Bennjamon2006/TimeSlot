import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import usersService from "@/services/users.service";
import useProfile from "@/hooks/useProfile";
import useMutation from "@/hooks/useMutation";

const normalize = (str: string) =>
  str.split(" ").filter(Boolean).join(" ").toLowerCase();

export default function DeletionConfirmation({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { name } = useProfile();
  const [confirmationText, setConfirmationText] = useState("");
  const isConfirmed = normalize(confirmationText) === normalize(name);

  const navigate = useNavigate();
  const deleteUserMutation = useMutation(usersService.deleteCurrentUser);
  const disabled = deleteUserMutation.state === "loading";
  const  error = deleteUserMutation.error ? "Error al eliminar la cuenta. Por favor, inténtalo de nuevo." : null;

  const handleDelete = async () => {
    await deleteUserMutation.execute();

    navigate("/goodbye");
  };

  return (
    <Dialog open={opened} onClose={close}>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Confirmar eliminación
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography>
          ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se
          puede deshacer.
        </Typography>
        <Typography mt={2}>
          Por favor, escribe tu nombre completo <b>{name}</b> para confirmar.
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Escribe tu nombre completo"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          helperText={
            confirmationText && !isConfirmed
              ? "El texto no coincide con tu nombre completo."
              : "Al presionar el botón de eliminar, tu cuenta será eliminada permanentemente."
          }
          color={isConfirmed ? "success" : "error"}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button fullWidth variant="outlined" onClick={close}>
          No, mantener mi cuenta
        </Button>
        {isConfirmed && (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={disabled}
          > {disabled ? "Eliminando..." : "Sí, eliminar mi cuenta"}
          </Button>
        )}
      </DialogActions>

      {
        error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )
      }
    </Dialog>
  );
}

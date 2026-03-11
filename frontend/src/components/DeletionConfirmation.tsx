import useProfile from "@/hooks/useProfile";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

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

  const handleDelete = () => {
    console.log("Cuenta eliminada");
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
          >
            Sí, eliminar mi cuenta
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

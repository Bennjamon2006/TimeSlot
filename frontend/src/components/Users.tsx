import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useQuery from "@/hooks/useQuery";
import adminService from "@/services/admin.service";
import LoadingPlaceholder from "./LoadingPlaceholder";

export default function Users() {
  const getUsersQuery = useQuery("admin-users", adminService.getUsers, 10000);

  if (getUsersQuery.state === "loading") {
    return <LoadingPlaceholder variant="list" />;
  }

  if (getUsersQuery.state === "error") {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="body1" color="error.main">
          Error al cargar los usuarios.
        </Typography>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => getUsersQuery.refetch()}
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  const users = getUsersQuery.data || [];

  return (
    <Grid size={{ xs: 12, md: 8 }} mx="auto">
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Usuarios Registrados
        </Typography>

        {users.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No hay usuarios registrados.
          </Typography>
        )}

        {users.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Reservas</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.bookingsCount}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Grid>
  );
}

import { Box, Button, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900 }} gutterBottom>
          404 - Página no encontrada
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Lo sentimos, la ruta que intentas visitar no existe. Usa el menú o vuelve al inicio.
        </Typography>

        <Button component={NavLink} to="/" variant="contained">
          Volver al inicio
        </Button>
      </Box>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
        alt="Paisaje"
        sx={{ width: "100%", borderRadius: 2, maxHeight: 420, objectFit: "cover" }}
      />
    </Paper>
  );
}
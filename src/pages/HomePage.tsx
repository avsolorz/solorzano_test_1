import { Box, Paper, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3, bgcolor: "grey.100" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Bienvenido a mi examen de Programaciónnnn
        </Typography>

        <Typography color="text.secondary">
          Aplicación de ejemplo usando React y Material UI.
        </Typography>
      </Paper>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
        alt="Paisaje"
        sx={{
          width: "100%",
          borderRadius: 2,
          maxHeight: 420,
          objectFit: "cover",
        }}
      />
    </>
  );
}

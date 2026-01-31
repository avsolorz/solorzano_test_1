import { useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography, Alert } from "@mui/material";

export default function BonoPage() {
  const [sueldo, setSueldo] = useState<number | "">("");
  const [dias, setDias] = useState<number>(5);
  const [bono, setBono] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    const s = Number(sueldo);
    if (!s || s <= 0) {
      setBono(null);
      setError("Ingrese un sueldo diario válido");
      return;
    }
    setBono(s * dias);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Bono Vacacional
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Sueldo diario"
        type="number"
        value={sueldo}
        onChange={(e) => setSueldo(e.target.value === "" ? "" : Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Días"
        select
        value={dias}
        onChange={(e) => setDias(Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value={5}>5 días</MenuItem>
        <MenuItem value={10}>10 días</MenuItem>
        <MenuItem value={15}>15 días</MenuItem>
      </TextField>

      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mb: 2 }}>
        Calcular
      </Button>

      <Typography>
        Bono: <strong>{bono !== null ? bono.toLocaleString() : " — "}</strong>
      </Typography>

      <Box sx={{ mt: 2, color: "text.secondary" }}>
        <small>Multiplica el sueldo diario por los días seleccionados.</small>
      </Box>
    </Paper>
  );
}

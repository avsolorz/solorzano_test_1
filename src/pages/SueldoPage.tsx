import { useMemo, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function MultiplyPage() {
  const [basic, setBasic] = useState<number | string>(1000);
  const [primas, setPrimas] = useState<number | string>(0);
  const [deductions, setDeductions] = useState<number | string>(0);
  const [calculated, setCalculated] = useState<number | null>(null);

  const net = useMemo(() => {
    const b = Number(basic) || 0;
    const p = Number(primas) || 0;
    const d = Number(deductions) || 0;
    return b + p - d;
  }, [basic, primas, deductions]);

  const handleCalculate = () => {
    setCalculated(net);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={900} gutterBottom>
        Calculadora de Sueldito
      </Typography>

      <TextField
        label="Sueldo básico"
        type="number"
        value={basic}
        onChange={(e) => setBasic(e.target.value === "" ? "" : Number(e.target.value))}
        sx={{ mb: 2 }}
        fullWidth
      />

      <TextField
        label="Primas"
        type="number"
        value={primas}
        onChange={(e) => setPrimas(e.target.value === "" ? 0 : Number(e.target.value))}
        sx={{ mb: 2 }}
        fullWidth
      />

      <TextField
        label="Deducciones"
        type="number"
        value={deductions}
        onChange={(e) => setDeductions(e.target.value === "" ? 0 : Number(e.target.value))}
        sx={{ mb: 2 }}
        fullWidth
      />

      <Button variant="contained" color="success" onClick={handleCalculate} sx={{ mb: 2 }}>
        Calcular
      </Button>

      <Typography>
        Resultado: <strong>{calculated !== null ? `${calculated.toLocaleString()}` : " — "}</strong>
      </Typography>

      <Box sx={{ mt: 2, color: "text.secondary" }}>
        <small>Fórmula: Sueldo básico + Primas - Deducciones</small>
      </Box>
    </Paper>
  );
}
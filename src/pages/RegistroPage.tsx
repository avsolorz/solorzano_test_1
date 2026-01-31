import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type User = { id: string; name: string; age: number; role: string };

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuarios");
    if (raw) setUsers(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(users));
  }, [users]);

  const handleRegister = () => {
    if (!name.trim()) return setMessage("El nombre es obligatorio");
    if (age === "" || Number(age) <= 0) return setMessage("Edad inválida");
    if (!role) return setMessage("Selecciona un rol");

    const newUser: User = { id: Date.now().toString(), name: name.trim(), age: Number(age), role };
    setUsers((s) => [...s, newUser]);
    setName("");
    setAge("");
    setRole("");

    setMessage("Usuario registrado correctamente");
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Registro de Usuario
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Edad"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Rol"
        select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="success" onClick={handleRegister} sx={{ mb: 2 }}>
        Registrar
      </Button>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Usuarios registrados
        </Typography>
        <List>
          {users.length === 0 && (
            <Typography color="text.secondary">No hay usuarios registrados.</Typography>
          )}
          {users.map((u) => (
            <ListItem key={u.id} divider>
              <ListItemText primary={u.name} secondary={`Edad: ${u.age} — ${u.role}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

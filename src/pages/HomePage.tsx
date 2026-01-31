import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

type Character = {
  id: number;
  name: string;
  image: string;
};

export default function HomePage() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [minAge, setMinAge] = useState<string>("");
  const [filterAge, setFilterAge] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("Error fetching characters");
        const data = await res.json();
       
        const list: Array<Character> = data.results.map((c: any) => ({
          id: c.id,
          name: c.name,
          image: c.image,
        }));
        setCharacters(list);
      } catch (e: any) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleFilter = (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = parseInt(minAge, 10);
    setFilterAge(Number.isNaN(v) ? null : v);
  };

  
  const withAges = characters.map((c) => ({ ...c, age: 18 + c.id }));
  const displayed = filterAge != null ? withAges.filter((c) => c.age >= filterAge) : withAges;

  return (
    <>
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3, bgcolor: "grey.100" }}>
        <Typography variant="h2" fontWeight={800} gutterBottom>
          Bienvenido a Mi Examennn de Programacionnn
        </Typography>

        <Typography color="text.secondary">
          Aplicación de ejemplo usando Bootstrap que simula un frontend para el examennnn xd.
        </Typography>
      </Paper>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
        alt="Paisaje"
        sx={{ width: "100%", borderRadius: 2, maxHeight: 420, objectFit: "cover", mb: 3 }}
      />

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Listado de Usuarios (API)
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          https://rickandmortyapi.com/api/character
        </Typography>

        <Box component="form" onSubmit={handleFilter} sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Filtrar por edad mínima"
            variant="outlined"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            size="small"
          />
          <Button type="submit" variant="contained" color="success">
            Filtrar
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setMinAge("");
              setFilterAge(null);
            }}
          >
            Limpiar
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Foto</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Edad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Avatar src={c.image} alt={c.name} />
                  </TableCell>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{18 + c.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
}
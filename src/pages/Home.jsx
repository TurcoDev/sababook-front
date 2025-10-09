import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu"; // ← agregamos el menú lateral

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false); // controla si el menú está abierto

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Box>
          <Typography variant="h3" color="primary" fontWeight="bold">
            Bienvenida, Lucía
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Miércoles, Septiembre 17, 2025
          </Typography>
        </Box>
      </Box>

      {/* Drawer lateral */}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Inicio" />

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Buscar"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Chips de filtros */}
      <Stack direction="row" spacing={1} mb={2} sx={{ overflowX: "auto" }}>
        <Chip label="Género" />
        <Chip label="Nivel Educativo" />
        <Chip label="Listas" />
        <Chip label="Destacados" />
      </Stack>

      {/* Recomendado semanal */}
      <Typography variant="h4" fontWeight="bold" color="secondary" mb={1}>
        Recomendado semanal
      </Typography>
      <BookCard
        image="https://via.placeholder.com/150x200"
        title="La Campana de Cristal"
        rating={3.9}
        progress={76}
      />

      {/* Destacados */}
      <Typography variant="h4" fontWeight="bold" color="secondary" mt={3} mb={1}>
        Destacados
      </Typography>
      <BookCard
        image="https://via.placeholder.com/150x200"
        title="La Resistencia"
        rating={4.7}
        progress={90}
      />
    </Box>
  );
}

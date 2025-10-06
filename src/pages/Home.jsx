import { Box, Typography, TextField, InputAdornment, IconButton, Chip, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import BookCard from "../components/BookCard";

export default function Home() {
  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton><MenuIcon /></IconButton>
        <Box>
          <Typography variant="h6" color="primary" fontWeight="bold">Bienvenida, Lucía</Typography>
          <Typography variant="body2" color="body">
            Miércoles, Septiembre 17, 2025
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search"
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
      <Typography variant="h6" fontWeight="bold" color="secondary" mb={1}>Recomendado semanal</Typography>
      <BookCard
        image="https://via.placeholder.com/150x200"
        title="La Campana de Cristal"
        rating={3.9}
        progress={76}
      />

      {/* Destacados */}
      <Typography variant="h6" fontWeight="bold" color="secondary" mt={3} mb={1}>Destacados</Typography>
      <BookCard
        image="https://via.placeholder.com/150x200"
        title="La Resistencia"
        rating={4.7}
        progress={90}
      />
    </Box>
  );
}

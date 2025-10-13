import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips"; 
import LogoImage from '../assets/logo.png';
import LibroImage from '../assets/libro.jpg'
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Función que maneja la búsqueda
  const handleSearch = (query) => {
    console.log("Buscando:", query);
    // aca se haria la llamada a la API
  };

  return (
    <Box
      py={2}
      px={1}
      sx={{
        width: '100%',
        maxWidth: 1000,
        margin: "0 auto"
      }}
    >
      {/* Header (responsive y con logo a la derecha) */}
      <Box display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}>
        {/* BLOQUE IZQUIERDO: Menú y Saludo */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => setMenuOpen(true)} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" color="primary" fontWeight="bold">
              Bienvenida, Lucía
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Miércoles, Septiembre 17, 2025
            </Typography>
          </Box>
        </Box>

        {/* BLOQUE DERECHO: Logo */}
        <Box
          component="img"
          src={LogoImage}
          alt="Logo de la aplicación"
          sx={{
            height: {
              xs: 40, // 40px en pantallas pequeñas
              sm: 50  // 50px en pantallas medianas/grandes
            },
            width: 'auto',
            ml: 2,
          }}
        />
      </Box>

      {/* Drawer lateral */}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Inicio" />


      {/* SearchBar personalizada */}
      <Box mb={2}>
        <SearchBar onSearch={handleSearch} />
      </Box>


      {/*  Chips de filtros*/}
      <FilterChips />


      {/* Recomendado semanal */}
      <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
        Recomendado semanal
      </Typography>

      <Box display="flex" justifyContent="left" mt={2} mb={3}>
        <BookCard
          featured
          image={LibroImage}
          title="La Campana de Cristal"
          rating={4.2}
          progress={80}
        />
      </Box>

      {/* Destacados */}
      <Typography variant="h5" fontWeight="bold" color="secondary" mt={3} mb={1}>
        Destacados
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <BookCard
          image={LibroImage}
          title="La Resistencia"
          rating={4.7}
          progress={90}
        />
        <BookCard
          image={LibroImage}
          title="El Principito"
          rating={4.8}
          progress={50}
        />
        <BookCard
          image={LibroImage}

          title="Rayuela"
          rating={4.6}
          progress={80}
        />

      </Box>
    </Box>
  );
}
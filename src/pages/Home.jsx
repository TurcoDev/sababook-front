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

const INITIAL_BOOKS = [
  { id: 1, title: "La Resistencia", rating: 4.7, progress: 90, isFavorite: true, image: LibroImage },
  { id: 2, title: "El Principito", rating: 4.8, progress: 50, isFavorite: false, image: LibroImage },
  { id: 3, title: "Rayuela", rating: 4.6, progress: 80, isFavorite: true, image: LibroImage },
];

// Data del libro recomendado semanal (puede ser manejado por separado si es un caso especial)
const FEATURED_BOOK = {
  id: 0,
  title: "La Campana de Cristal",
  rating: 4.2,
  progress: 80,
  isFavorite: false,
  image: LibroImage
};


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  // useState para manejar la lista de libros destacados
  const [books, setBooks] = useState(INITIAL_BOOKS);
  // useState para manejar el libro destacado (featured)
  const [featuredBook, setFeaturedBook] = useState(FEATURED_BOOK);


  // Función que maneja la búsqueda
  const handleSearch = (query) => {
    console.log("Buscando:", query);
    // aca se haria la llamada a la API
  };

  // Función para cambiar el estado de favorito de un libro por su ID
  const handleFavoriteToggle = (bookId, isFeatured = false) => {
    if (isFeatured) {
      // Manejar el libro destacado
      setFeaturedBook(prevBook => ({
        ...prevBook,
        isFavorite: !prevBook.isFavorite
      }));
    } else {
      // Manejar los libros de la lista Destacados
      setBooks(prevBooks =>
        prevBooks.map(book => {
          if (book.id === bookId) {
            return { ...book, isFavorite: !book.isFavorite };
          }
          return book;
        })
      );
    }
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

      {/* Header */}
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
              xs: 40,
              sm: 50
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


      {/* Chips de filtros*/}
      <FilterChips />


      {/* Recomendado semanal */}

      <Typography variant="h4" fontWeight="bold" color="secondary" mb={1}>
        Recomendado semanal
      </Typography>

      <Box display="flex" justifyContent="left" mt={2} mb={3}>
        <BookCard
          featured
          image={featuredBook.image}
          title={featuredBook.title}
          rating={featuredBook.rating}
          progress={featuredBook.progress}
          isFavorite={featuredBook.isFavorite} // Pasa el estado del recomendado
          onFavoriteToggle={() => handleFavoriteToggle(featuredBook.id, true)} // 👈 Pasa la función con flag 'true'
        />
      </Box>

      {/* Destacados */}

      <Typography variant="h4" fontWeight="bold" color="secondary" mt={3} mb={1}>
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
        {/*Mapear la lista de libros destacados */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            image={book.image}
            title={book.title}
            rating={book.rating}
            progress={book.progress}
            isFavorite={book.isFavorite} // Pasa el estado
            onFavoriteToggle={() => handleFavoriteToggle(book.id, false)} // 👈 Pasa la función con flag 'false'
          />
        ))}

      </Box>
    </Box>
  );
}
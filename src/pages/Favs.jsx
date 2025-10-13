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
import LogoImage from '../assets/logo.png';
import LibroImage from '../assets/libro.jpg'


const INITIAL_BOOKS = [
  { id: 1, title: "La Resistencia", rating: 4.7, progress: 90, isFavorite: true, image: LibroImage },
  { id: 2, title: "El Principito", rating: 4.8, progress: 50, isFavorite: true, image: LibroImage },
  { id: 3, title: "Rayuela", rating: 4.6, progress: 80, isFavorite: false, image: LibroImage },
  { id: 4, title: "Cien años de soledad", rating: 4.9, progress: 20, isFavorite: true, image: LibroImage },
  { id: 5, title: "Crimen y Castigo", rating: 4.5, progress: 65, isFavorite: false, image: LibroImage },
  { id: 6, title: "El Alquimista", rating: 4.2, progress: 100, isFavorite: true, image: LibroImage },
];


export default function Favs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [books, setBooks] = useState(INITIAL_BOOKS);

  const handleSearch = (query) => {
    console.log("Buscando:", query);
    // aca se haria la llamada a la API
  };
  

  const handleFavoriteToggle = (bookId) => {
    // Actualizamos el estado de los libros
    setBooks(prevBooks => 
      prevBooks.map(book => {
        // Si el ID del libro coincide, invertimos su estado 'isFavorite'
        if (book.id === bookId) {
          // Nota: aca iria la llamada a la API para guardar el cambio.
          return { ...book, isFavorite: !book.isFavorite };
        }
        return book;
      })
    );
  };

  const favoriteBooks = books.filter(book => book.isFavorite);


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
      {/* ... (Header y SideMenu */}
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
              sm: 50, 
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
      {/* Favs */}
      <Typography variant="h5" fontWeight="bold" color="secondary" mt={3} mb={1}>
       Favoritos
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Mapear la lista de libros favoritos y pasar las nuevas props */}
        {favoriteBooks.map((book) => (
            <BookCard
                key={book.id}
                image={book.image}
                title={book.title}
                rating={book.rating}
                progress={book.progress}
                isFavorite={book.isFavorite} // Pasamos el estado actual
                onFavoriteToggle={() => handleFavoriteToggle(book.id)} //  Pasamos la función con el ID
            />
        ))}
        
        {/* Mensaje si no hay favoritos */}
        {favoriteBooks.length === 0 && (
             <Typography variant="subtitle1" color="text.secondary" mt={3}>
                Aún no tienes libros marcados como favoritos.
            </Typography>
        )}

      </Box>
    </Box>
  );
}
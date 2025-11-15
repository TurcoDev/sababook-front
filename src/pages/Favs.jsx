import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import {
  Box,
  Typography,
} from "@mui/material";

import AppHeader from "../components/AppHeader"; 
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";
import LibroImage from '../assets/libro.jpg'


export default function Favs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // Usar el hook para manejar favoritos
  const { handleFavoriteToggle } = useFavorites(favoriteBooks, setFavoriteBooks);

  // Usar el nuevo hook para acciones de favoritos
  const { addFavorite, removeFavorite } = useFavoriteActions();

  // Handler para el corazón
  const handleFavoriteClick = async (libro_id, isFavorite) => {
    let success = false;
    if (isFavorite) {
      success = await removeFavorite(libro_id);
    } else {
      success = await addFavorite(libro_id);
    }
    if (success) {
      setFavoriteBooks(prevBooks =>
        prevBooks.map(book =>
          book.libro_id === libro_id ? { ...book, isFavorite: !isFavorite } : book
        )
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
      
     
      <AppHeader 
        onMenuClick={() => setMenuOpen(true)}
        title="Mis Favoritos" 
        subtitle={`Tienes ${favoriteBooks.length} libros favoritos`} 
      />
     
      {/* Drawer lateral */}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Favoritos" /> 


      {/* SearchBar personalizada */}
      <Box mb={2}>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </Box>
      
      {/* Favs */}
      <Typography variant="h5" fontWeight="bold" color="secondary"  mb={2}>
       Tu Colección Favorita
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
            key={book.libro_id}
            image={book.portada_url || LibroImage}
            title={book.titulo}
            autor={book.autor}
            gender={book.genero}
            rating={book.calificacion_promedio}
            isFavorite={!!book.isFavorite}
            onFavoriteToggle={() => handleFavoriteClick(book.libro_id, !!book.isFavorite)}
            libro_id={book.libro_id}
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
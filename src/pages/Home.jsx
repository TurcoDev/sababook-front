import { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";


import AppHeader from "../components/AppHeader"; 
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import LibroImage from '../assets/libro.jpg'

const INITIAL_BOOKS = [
  { id: 1, title: "La Resistencia", rating: 4.7, progress: 90, isFavorite: true, image: LibroImage },
  { id: 2, title: "El Principito", rating: 4.8, progress: 50, isFavorite: false, image: LibroImage },
  { id: 3, title: "Rayuela", rating: 4.6, progress: 80, isFavorite: true, image: LibroImage },
];


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
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [featuredBook, setFeaturedBook] = useState(FEATURED_BOOK);


  const handleSearch = (query) => {
    console.log("Buscando:", query);
    // aca se haria la llamada a la API
  };

  const handleFavoriteToggle = (bookId, isFeatured = false) => {
    if (isFeatured) {
      setFeaturedBook(prevBook => ({
        ...prevBook,
        isFavorite: !prevBook.isFavorite
      }));
    } else {
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

  
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        title="Bienvenida, Lucía"
        subtitle="Miércoles, Septiembre 17, 2025"
      />

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
          isFavorite={featuredBook.isFavorite}
          onFavoriteToggle={() => handleFavoriteToggle(featuredBook.id, true)}
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
            isFavorite={book.isFavorite}
            onFavoriteToggle={() => handleFavoriteToggle(book.id, false)}
          />
        ))}

      </Box>
    </Box>
  );
}
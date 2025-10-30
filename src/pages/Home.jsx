import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { API_BASE_URL } from "../environments/api";
import WelcomeModal from "../components/WelcomeModal";
import { useAuth } from "../hooks/useAuth";

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
  const [books, setBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(FEATURED_BOOK);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/libros`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        console.log("Libros cargados:", data);
      })
      .catch(err => {
        console.error("Error cargando libros:", err);
      });
  }, []);

  useEffect(() => {
    if (location.state?.fromLogin && user) {
      setWelcomeModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, user]);

  const handleCloseWelcomeModal = () => setWelcomeModalOpen(false);

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

  const handleVerMas = (bookId) => {
    navigate(`/bookdetails/${bookId}`);
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
        title={`Hola, ${user?.nombre || 'Usuario'}`}
        subtitle={new Date().toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      />
      
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Inicio" />

      <WelcomeModal
        open={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        user={user}
      />

      <Box mb={2}>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </Box>

      <FilterChips />

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
          onVerMas={() => handleVerMas(featuredBook.id)}
        />
      </Box>

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
        {books.map((book) => (
          <BookCard
            key={book.libro_id}
            image={book.portada_url}
            autor={book.autor}
            gender={book.genero}
            title={book.titulo}
          //  description={book.descripcion}
            rating={book.calificacion_promedio}
            progress={book.progress}
            isFavorite={book.isFavorite}
            onFavoriteToggle={() => handleFavoriteToggle(book.id, false)}
            bookId={book.id}
            libro_id={book.libro_id}
            onVerMas={() => handleVerMas(book.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
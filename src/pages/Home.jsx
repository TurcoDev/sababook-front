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

// --- Constantes de Configuración ---
// ID del libro que quieres destacar
const FEATURED_BOOK_ID = 9; 

// Constante de libro por defecto, usando las propiedades de la API
const DEFAULT_FEATURED_BOOK = {
  // Ponemos ambos IDs en null/0 para indicar que el dato real aún no ha cargado
  id: null, 
  libro_id: null, 
  titulo: "Cargando...",
  calificacion_promedio: 0,
  isFavorite: false,
  portada_url: LibroImage
};
// -----------------------------------


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  // Inicializamos con DEFAULT_FEATURED_BOOK
  const [featuredBook, setFeaturedBook] = useState(DEFAULT_FEATURED_BOOK); 
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
        
        // 1. Buscamos por 'libro_id' o 'id' para ser más robustos
        const featured = data.find(book => 
            book.libro_id === FEATURED_BOOK_ID || book.id === FEATURED_BOOK_ID
        ); 
        
        if (featured) {
          // 2. Si se encuentra, aseguramos que 'id' y 'libro_id' tengan un valor, 
          // usando el que exista para evitar 'undefined' en el JSX.
          const actualId = featured.id || featured.libro_id;

          setFeaturedBook({
            ...featured,
            id: actualId,
            libro_id: featured.libro_id || featured.id, // Para asegurar que ambos campos existan
            isFavorite: featured.isFavorite || false
          });
        }
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
          if ((book.id === bookId) || (book.libro_id === bookId)) {
            return { ...book, isFavorite: !book.isFavorite };
          }
          return book;
        })
      );
    }
  };

  const handleVerMas = (bookId) => {
    if (bookId) {
        navigate(`/bookdetails/${bookId}`);
    } else {
        // Este console.error solo se verá si la verificación en el JSX falla
        console.error("ERROR de Navegación: ID de libro es nulo o indefinido."); 
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
  image={featuredBook.portada_url || LibroImage}
  title={featuredBook.titulo}
  rating={featuredBook.calificacion_promedio || featuredBook.rating}
  isFavorite={featuredBook.isFavorite}
  onFavoriteToggle={() =>
    (featuredBook.id || featuredBook.libro_id) &&
    handleFavoriteToggle(featuredBook.id || featuredBook.libro_id, true)
  }
  bookId={featuredBook.id || featuredBook.libro_id}
  libro_id={featuredBook.libro_id}
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
            rating={book.calificacion_promedio}
            progress={book.progress}
            isFavorite={book.isFavorite}
            // Mismo fallback de ID para la lista
            onFavoriteToggle={() => handleFavoriteToggle(book.id || book.libro_id, false)} 
            bookId={book.id}
            libro_id={book.libro_id}
            onVerMas={() => handleVerMas(book.id || book.libro_id)}
          />
        ))}
      </Box>
    </Box>
  );
}
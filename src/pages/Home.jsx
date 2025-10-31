import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

// Importaciones de Componentes de Presentación
import AppHeader from "../components/AppHeader";
import SideMenu from "../components/SideMenu";
import FilterChips from "../components/FilterChips";
import WelcomeModal from "../components/WelcomeModal";
import FeaturedBookSection from "../components/FeaturedBookSection"; 
import BookListSection from "../components/BookListSection";

// Importaciones de Lógica (Custom Hooks)
import { useAuth } from "../hooks/useAuth";
import { useBookData } from "../hooks/useBookData"; // NUEVO: Lógica de carga de libros
import { useFavorites } from "../hooks/useFavorites"; // Lógica de manejo de favoritos


export default function Home() {
  // --- Estados de UI ---
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // --- LÓGICA DE DATOS: Llamada a Custom Hooks ---
  // 1. Hook para cargar los datos y manejar sus estados
  const { books, setBooks, featuredBook, setFeaturedBook } = useBookData();

  // 2. Hook para manejar la interacción de favoritos
  const { handleFavoriteToggle } = useFavorites(
    books, 
    setBooks, 
    featuredBook, 
    setFeaturedBook
  );
  // -----------------------------------------------
  
  // --- Lógica de Modal de Bienvenida  ---
  useEffect(() => {
    if (location.state?.fromLogin && user) {
      setWelcomeModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, user]);

  const handleCloseWelcomeModal = () => setWelcomeModalOpen(false);

  // --- Lógica de Navegación  ---
  const handleVerMas = (bookId) => {
    if (bookId) {
        navigate(`/bookdetails/${bookId}`);
    } else {
        console.error("ERROR de Navegación: ID de libro es nulo o indefinido.");
    }
  };
  
  // --- RENDERIZADO ---
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
      <WelcomeModal open={isWelcomeModalOpen} onClose={handleCloseWelcomeModal} user={user} />

      <Box mb={2}>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </Box>
      
      <FilterChips />

      <FeaturedBookSection 
        featuredBook={featuredBook}
        handleFavoriteToggle={handleFavoriteToggle}
        handleVerMas={handleVerMas}
      />

      <BookListSection
        books={books}
        handleFavoriteToggle={handleFavoriteToggle}
        handleVerMas={handleVerMas}
      />
    </Box>
  );
}
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Modal,
  Button,
} from "@mui/material";


import AppHeader from "../components/AppHeader";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";
import FilterChips from "../components/FilterChips";
import WelcomeModal from "../components/WelcomeModal";
import { getCatalogoLibros, buscarLibros } from "../services/apiService";
import { normalizarTexto } from "../utils/normalize";
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
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentQuery, setCurrentQuery] = useState('');
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

  const manejarVolverAlInicio = async () => {
    try {
      const libros = await getCatalogoLibros();
      setBooks(libros);
      setCurrentFilters({});
      setCurrentQuery('');
      console.log("Vuelto al inicio, libros cargados:", libros);
    } catch (error) {
      console.error("Error al volver al inicio:", error);
    }
  };


  const handleSearch = async (query) => {
    console.log("Buscando:", query);
    try {
      const queryNormalizada = normalizarTexto(query);
      const filtrosCombinados = { ...currentFilters, query: queryNormalizada };
      const resultados = await buscarLibros(filtrosCombinados);
      setBooks(resultados);
      setCurrentQuery(query);
      console.log("Resultados de búsqueda:", resultados);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setBooks([]); // Limpiar resultados en caso de error
    }
  };

  const handleFilterChange = async (resultados, filtros) => {
    console.log("Filtros aplicados:", filtros);
    setCurrentFilters(filtros);
    const filtrosCombinados = { ...filtros, query: currentQuery ? normalizarTexto(currentQuery) : undefined };
    try {
      const resultadosActualizados = await buscarLibros(filtrosCombinados);
      setBooks(resultadosActualizados);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
      setBooks([]);
    }
  };
  
  // --- RENDERIZADO ---
  return (
    <Box
      py={2}
      px={1}
      sx={{
        width: '100%',
        // maxWidth: 1000,
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


      {/* Chips de filtros - Siempre visibles */}
      <FilterChips onFilterChange={handleFilterChange} />

      {/* Recomendado semanal - Solo mostrar si no hay filtros aplicados */}
      {Object.keys(currentFilters).length === 0 && !currentQuery && (
        <>
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
        </>
      )}

      {/* Resultados de búsqueda/filtros - Mostrar si hay búsqueda o filtros aplicados */}
      {(currentQuery || Object.keys(currentFilters).length > 0) && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={1}>
            <Typography variant="h4" fontWeight="bold" color="secondary">
              {currentQuery ? 'Resultados de búsqueda' : 'Libros filtrados'}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={manejarVolverAlInicio}
              sx={{ ml: 2 }}
            >
              Volver al inicio
            </Button>
          </Box>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Mostrar mensaje si no hay libros */}
        {books.length === 0 ? (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            El libro que usted está buscando no se encuentra disponible
          </Typography>
        ) : (
          /*Mapear la lista de libros destacados */
          books.map((book) => (
            <BookCard
              key={book.libro_id}
              image={book.portada_url}
              autor={book.autor}
              gender={book.genero}
              title={book.titulo}
              description={book.descripcion}
              rating={book.rating}
              progress={book.progress}
              isFavorite={book.isFavorite}
              onFavoriteToggle={() => handleFavoriteToggle(book.id, false)}
            />
          ))
        )}

      </Box>
    </Box>
  );
}
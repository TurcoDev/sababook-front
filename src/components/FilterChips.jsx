import React, { useState } from 'react';
import { Stack, Chip, Menu, MenuItem, Button } from "@mui/material";
import { buscarLibros } from '../services/apiService';

const FILTERS_DATA = [
  {
    id: 'genre',
    name: 'Género',
    options: ['Novela', 'Ficción', 'Poesía', 'Ensayo', 'Biografía', 'Terror', 'Romance', 'Policial', 'Ciencia Ficción', 'Fantasía', 'Académico']
  },
  {
    id: 'level',
    name: 'Nivel Educativo',
    options: ['Nivel Básico', 'Nivel Superior']
  },
  // {
  //   id: 'lists',
  //   name: 'Listas',
  //   options: ['Favoritos', 'Pendientes']
  // },
  // {
  //   id: 'highlights',
  //   name: 'Destacados',
  //   options: ['Populares', 'Nuevos', 'Mejor Calificados']
  // },
];

export default function FilterChips({ onFilterChange, onClearFilters }) {
  // Estado para el elemento de anclaje (donde se abre el menú)
  const [anchorEl, setAnchorEl] = useState(null);
  // Estado para saber qué filtro está activo (e.g., 'Género')
  const [activeFilterId, setActiveFilterId] = useState(null);
  // Estado para los filtros seleccionados
  const [selectedFilters, setSelectedFilters] = useState({});
  const openMenu = Boolean(anchorEl);

  const handleChipClick = (event, filterId) => {
    // 1. Establece el chip clicado como el ancla
    setAnchorEl(event.currentTarget);
    // 2. Registra el ID del filtro activo
    setActiveFilterId(filterId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveFilterId(null);
  };

  const handleMenuItemClick = async (filterId, option) => {
    console.log(`Filtro [${filterId}] seleccionado: ${option}`);

    // Mapear los IDs de filtro a los nombres de campo de la API
    const filterMapping = {
      'genre': 'genero',
      'level': 'nivel_educativo',
      // 'lists' y 'highlights' no se mapean directamente a la API de libros
    };

    const apiField = filterMapping[filterId];
    if (apiField) {
      // Actualizar filtros seleccionados
      const newFilters = { ...selectedFilters, [apiField]: option };
      setSelectedFilters(newFilters);

      try {
        // Llamar a la API con los filtros
        const resultados = await buscarLibros(newFilters);
        console.log('Resultados de búsqueda:', resultados);

        // Notificar al componente padre sobre el cambio de filtros
        if (onFilterChange) {
          onFilterChange(resultados, newFilters);
        }
      } catch (error) {
        console.error('Error al buscar libros:', error);
      }
    }

    handleMenuClose();
  };

  const activeFilterData = FILTERS_DATA.find(f => f.id === activeFilterId);

  return (
    <>
      <Stack direction="row" spacing={1} mb={2} sx={{ overflowX: "auto" }}>
        {/* Mapea y renderiza todos los chips */}
        {FILTERS_DATA.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.name}
            onClick={(e) => handleChipClick(e, filter.id)}
            aria-controls={activeFilterId === filter.id ? 'filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={activeFilterId === filter.id ? 'true' : undefined}
            color={activeFilterId === filter.id ? "primary" : "default"}
            variant="outlined"
          />
        ))}
        {/* Botón para borrar filtros */}
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ ml: 2, minWidth: 120 }}
          onClick={() => {
            setSelectedFilters({});
            if (onClearFilters) onClearFilters();
          }}
        >
          Borrar filtros
        </Button>
      </Stack>

      {/* El componente Menu se renderiza para el filtro activo */}
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {activeFilterData?.options.map(option => (
          <MenuItem
            key={option}
            onClick={() => handleMenuItemClick(activeFilterId, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
import React, { useState } from 'react';
import { Stack, Chip, Menu, MenuItem } from "@mui/material";

const FILTERS_DATA = [
    { 
        id: 'genre',
        name: 'Género', 
        options: ['Terror', 'Romance', 'Policial', 'Ciencia Ficción', 'Fantasía', 'Académico'] 
    },
    { 
        id: 'level',
        name: 'Nivel Educativo', 
        options: ['Básico', 'Intermedio', 'Avanzado', 'Universitario'] 
    },
    { 
        id: 'lists',
        name: 'Listas', 
        options: ['Favoritos', 'Pendientes', 'Leídos', 'Comprados'] 
    },
    { 
        id: 'highlights',
        name: 'Destacados', 
        options: ['Populares', 'Nuevos', 'Mejor Calificados'] 
    },
];

export default function FilterChips() {
  // Estado para el elemento de anclaje (donde se abre el menú)
  const [anchorEl, setAnchorEl] = useState(null); 
  // Estado para saber qué filtro está activo (e.g., 'Género')
  const [activeFilterId, setActiveFilterId] = useState(null); 
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
  
  const handleMenuItemClick = (filterId, option) => {
      console.log(`Filtro [${filterId}] seleccionado: ${option}`);
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
                // Al hacer clic, pasamos el evento y el ID del filtro
                onClick={(e) => handleChipClick(e, filter.id)} 
                
                aria-controls={activeFilterId === filter.id ? 'filter-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={activeFilterId === filter.id ? 'true' : undefined}
                color={activeFilterId === filter.id ? "primary" : "default"}
                variant="outlined" 
            />
        ))}
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
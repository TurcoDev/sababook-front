import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

import NavButton from './NavButton'; 
import SearchBar from './SearchBar'; 

const titleMap = {
    users: 'Usuarios',
    books: 'Libros',
    forums: 'Foros',
};

// 1. Estilo para el botón de "Agregar"
const StyledAddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  color: '#FFFFFF',
  fontWeight: 'bold',
  borderRadius: '8px', 
  padding: '10px 20px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
}));

// Función auxiliar para el texto del botón
const getAddButtonText = (activeView) => {
    switch (activeView) {
        case 'users': return 'Agregar Usuario';
        case 'books': return 'Agregar Libro';
        case 'forums': return 'Agregar Foro';
        default: return 'Agregar';
    }
}

const HeaderDashboard = ({ 
    activeView = 'users', 
    onNavigate = () => {}, 
    onAddClick = () => {},     
}) => {
   const currentTitle = titleMap[activeView] || 'Dashboard';
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', mb: 4}}>
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <NavButton 
            onClick={() => onNavigate('users')} 
            isActive={activeView === 'users'} 
        >
            Usuarios
        </NavButton>
        <NavButton 
            onClick={() => onNavigate('books')} 
            isActive={activeView === 'books'} 
        >
            Libros
        </NavButton>
        <NavButton 
            onClick={() => onNavigate('forums')} 
            isActive={activeView === 'forums'} 
        >
            Foros
        </NavButton>
      </Box>

      {/* 2. BARRA DE ACCIONES (SearchBar y Botón Agregar) */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 2, 
      }}>
        <SearchBar /> 

        <StyledAddButton onClick={onAddClick}>
          {getAddButtonText(activeView)}
        </StyledAddButton>
      </Box>
      
      {/* Título de la tabla actual */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#653A1B', mb: 2 }}>
          {currentTitle}
      </Typography>
    </Box>
  );
};

export default HeaderDashboard;
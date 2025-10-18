import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

import NavButton from './NavButton'; 
import SearchBar from './SearchBar'; 

const titleMap = {
    usuarios: 'Usuarios',
    libros: 'Libros',
    foros: 'Foros',
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
        case 'usuarios': return 'Agregar Usuario';
        case 'libros': return 'Agregar Libro';
        case 'foros': return 'Agregar Foro';
        default: return 'Agregar';
    }
}

const Dashboard = ({ 
    currentPath = '/dashboard/libros', // Recibido de DashboardPage.jsx
    onAddClick = () => {},     
}) => {
   const navigate = useNavigate(); 
   
   // LÓGICA CLAVE: Determinar la vista activa basándose en la RUTA
   // Usamos el tercer segmento de la URL (ej: /dashboard/libros -> 'libros')
   let activeView = 'libros'; 
   const parts = currentPath.split('/'); 
   
   if (parts.length > 2) {
       // Asigna 'libros', 'usuarios' o 'foros'
       activeView = parts[2] || 'usuarios'; 
   }
   // Si la ruta es solo /dashboard, activeView será 'usuarios' (por el index de App.jsx)
   if (currentPath === '/dashboard') {
       activeView = 'usuarios'; 
   }

   // Función de navegación mejorada que usa useNavigate
   const handleNavigate = (view) => {
       navigate(`/dashboard/${view}`);
   };
   
   const currentTitle = titleMap[activeView] || 'Dashboard';
   
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', mb: 2}}>
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <NavButton 
            onClick={() => handleNavigate('usuarios')} 
            // Activación: Si la ruta actual contiene 'usuarios' o es el index
            isActive={activeView === 'usuarios'} 
        >
            Usuarios
        </NavButton>
        <NavButton 
            onClick={() => handleNavigate('libros')} 
            // Activación: Si la ruta actual contiene 'libros' (incluyendo /libros/editar/...)
            isActive={currentPath.includes('/libros')}
        >
            Libros
        </NavButton>
        <NavButton 
            onClick={() => handleNavigate('foros')} 
            isActive={activeView === 'foros'} 
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
      
      {/* Título de la tabla actual*/}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#653A1B' }}>
          {currentTitle}
      </Typography>
    </Box> 
    
  );
};

export default Dashboard;

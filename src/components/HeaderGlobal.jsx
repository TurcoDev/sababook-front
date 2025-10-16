// src/components/HeaderGlobal.jsx

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, styled, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../assets/logo.png'; // 👈 ¡AÑADIR ESTA LÍNEA!

// 1. Estilos para el AppBar (la barra superior)
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#F5F0F8', // Color de fondo lila muy claro
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'static',
  height: '80px', 
  display: 'flex',
  justifyContent: 'center',
}));

// 2. Estilos para la imagen del logo
const LogoImage = styled('img')({
  height: '65px', 
  width: 'auto',
  objectFit: 'contain', 
});

// 3. Estilo para el botón de menú
const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300], 
  color: theme.palette.grey[800],
  borderRadius: '8px',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
}));

// 4. Contenido del Drawer (Menú Vertical)
const DrawerContent = () => (
    <Box sx={{ width: 250, padding: 2 }} role="presentation">
        {/* Aquí puedes poner los enlaces de navegación del menú lateral */}
        <p>Opción 1: Usuarios</p>
        <p>Opción 2: Libros</p>
        <p>Opción 3: Foros</p>
        {/* ... más enlaces ... */}
    </Box>
);


const HeaderGlobal = () => {
  // Estado para controlar la apertura del Drawer
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuOpen(open);
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', paddingLeft: 2, paddingRight: 2 }}>
        
        {/* Lado Izquierdo: Logo */}
        <Box>
          <LogoImage src={logoImage} alt="La gran OCASION Logo" />
        </Box>
        
        {/* Lado Derecho: Menú de Hamburguesa */}
        <Box>
          <StyledMenuButton 
            edge="end" 
            color="inherit" 
            aria-label="menu" 
            onClick={toggleDrawer(true)} // Abre el Drawer
          >
            <MenuIcon />
          </StyledMenuButton>
        </Box>
        
      </Toolbar>
      
      {/* Drawer (Menú Vertical) que se despliega desde la derecha */}
      <Drawer
        anchor="right" // Despliega de derecha a izquierda
        open={menuOpen}
        onClose={toggleDrawer(false)} // Cierra al hacer clic fuera
      >
        <DrawerContent />
      </Drawer>
      
    </StyledAppBar>
  );
};

export default HeaderGlobal; // 👈 Exportamos con el nombre corregido
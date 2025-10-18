import React from 'react';
import { Button, styled } from '@mui/material';

// 1. Definimos la lista de props que NO queremos que se pasen al DOM
const styleOptions = {
    shouldForwardProp: (prop) => prop !== 'isActive', // 👈 Filtra 'isActive'
};

// 2. Modifica StyledNavButton para usar styleOptions
const StyledNavButton = styled(Button, styleOptions)(({ theme, isActive }) => ({
  
  // Lógica ACTIVO/INACTIVO
  backgroundColor: isActive 
    ? theme.palette.active || '#653a1b' // Color más oscuro si está activo
    : theme.palette.button?.main || '#f25600', // Color normal si no está activo
  
  '&:hover': {
    backgroundColor: '#653a1b',
  },
  
  color: '#FFFFFF',
  padding: '12px 30px',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '20px',
  textTransform: 'none',
  minWidth: '150px',
  margin: theme.spacing(1),
}));

/**
 * @param {string} props.children
 * @param {function} props.onClick
 * @param {boolean} props.isActive - Indica si el botón debe estar visualmente activo.
 */
const NavButton = ({ children, onClick, isActive = false }) => {
  return (
    <StyledNavButton
      variant="contained"
      onClick={onClick}
      isActive={isActive} // Pasamos la prop para el styling
    >
      {children}
    </StyledNavButton>
  );
};

export default NavButton;
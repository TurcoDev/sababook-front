
import React from 'react';
import { Box, Button, styled, useTheme } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
  color: '#FFFFFF', 
  padding: '12px 0',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '30px', 
}));
/**
 * @param {object} props
 * @param {string} props.imageUrl -
 * @param {function} props.onRegisterClick -
 * @param {function} props.onLoginClick -
 */
const Login = ({ imageUrl, onRegisterClick, onLoginClick }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: '350px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      
      {/* Imagen del Logo */}
      {/* Contenedor de Botones */}
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, // Espacio entre los botones
        }}
      >
        {/* Botón para el Registro ("Registrate acá") */}
        <StyledButton
          variant="contained"
          onClick={onRegisterClick}
          fullWidth
          
        >
          Registrate
        </StyledButton>

        {/* Botón para Iniciar Sesión ("Iniciar sesión") */}
        <StyledButton
          variant="contained"
          onClick={onLoginClick}
          fullWidth
        >
          Iniciar sesión
        </StyledButton>
      </Box>

    </Box>
  );
};

export default Login;
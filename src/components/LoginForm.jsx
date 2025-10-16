// src/components/LoginForm.jsx

import React from 'react';
import { Box, Button, TextField, Typography, styled, useTheme } from '@mui/material';

// Estilos del contenedor del formulario (simplemente para dar un padding)
const FormContainer = styled(Box)({
  width: '100%',
  maxWidth: '350px',
  padding: '20px',
});

// Estilos para el botón de Ingresar (usando el mismo estilo del tema)
const StyledIngresarButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
  color: '#FFFFFF',
  padding: '12px 0',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '20px', // Mantenemos el border-radius de 20px
  marginTop: theme.spacing(3), // Espacio superior
}));
/**
 * Componente funcional para el formulario de ingreso de usuario y contraseña.
 * @param {function} props.onLoginSubmit - Handler para cuando se presiona Ingresar.
 */
const LoginForm = ({ onLoginSubmit }) => {
  const theme = useTheme();
  
  // Usamos el color 'body.main' de tu tema para el texto del label
  const labelColor = theme.palette.body?.main || '#4A4C52';
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías capturar los valores de los inputs si los necesitas
    onLoginSubmit();
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      
      {/* Campo de Usuario */}
      <Box mb={2}>
        <Typography 
          variant="body1" 
          component="label" 
          htmlFor="username" 
          sx={{ color: labelColor, fontWeight: 'bold' }}
        >
          Usuario
        </Typography>
        <TextField
          id="username"
          variant="outlined"
          fullWidth
          margin="dense"
        />
      </Box>

      {/* Campo de Contraseña */}
      <Box mb={2}>
        <Typography 
          variant="body1" 
          component="label" 
          htmlFor="password" 
          sx={{ color: labelColor, fontWeight: 'bold' }}
        >
          Contraseña
        </Typography>
        <TextField
          id="password"
          variant="outlined"
          type="password"
          fullWidth
          margin="dense"
        />
      </Box>

      {/* Botón de Ingresar */}
      <StyledIngresarButton
        variant="contained"
        type="submit"
        fullWidth
      >
        Ingresar
      </StyledIngresarButton>

    </FormContainer>
  );
};

export default LoginForm;
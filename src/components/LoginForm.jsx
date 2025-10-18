// src/components/LoginForm.jsx

import React, { useState } from 'react';
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
 * @param {string} props.error - Mensaje de error para mostrar.
 */
const LoginForm = ({ onLoginSubmit, error }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Usamos el color 'body.main' de tu tema para el texto del label
  const labelColor = theme.palette.body?.main || '#4A4C52';
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSubmit({ email, password });
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      
      {/* Campo de Email */}
      <Box mb={2}>
        <Typography 
          variant="body1" 
          component="label" 
          htmlFor="email" 
          sx={{ color: labelColor, fontWeight: 'bold' }}
        >
          Email
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Box>

      {/* Mensaje de Error */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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
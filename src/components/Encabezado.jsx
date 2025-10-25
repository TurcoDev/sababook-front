// components/Encabezado.jsx
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Encabezado = ({ nombreUsuario }) => {
  return (
    <Box 
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: 1, // Sombra sutil para destacar el encabezado
      }}
    >
      
      {/* Fecha */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        display="block"
        mb={0.5}
      >
        Miércoles, Octubre 24, 2025
      </Typography>
      
      {/* Bienvenida y Nombre */}
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        color="body.main" // Usa el color body del tema
      >
        Bienvenida,
        <Box
            component="span"
            sx={{ color: 'primary.main', ml: 0.5 }} // Mantiene el color primario para el nombre
        >
            {nombreUsuario}
        </Box>
      </Typography>

      {/* Separador inferior */}
      <Divider sx={{ mt: 2 }} /> 
    </Box>
  );
};

export default Encabezado;
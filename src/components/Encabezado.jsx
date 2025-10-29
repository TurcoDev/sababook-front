// components/Encabezado.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Encabezado = ({ nombreUsuario }) => {
  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    const actualizarFecha = () => {
      const ahora = new Date();
      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setFechaActual(ahora.toLocaleDateString('es-ES', opciones));
    };

    actualizarFecha();
    const intervalo = setInterval(actualizarFecha, 60000); // Actualizar cada minuto

    return () => clearInterval(intervalo);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        backgroundColor: 'background.paper',
      }}
    >
      
      {/* Bienvenida y Nombre */}
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        color="primary.main" // Usa el color primary del tema
      >
        Bienvenida,
        <Box
            component="span"
            sx={{ color: 'primary.main', ml: 0.5 }} // Mantiene el color primario para el nombre
        >
            {nombreUsuario}
        </Box>
      </Typography>

      {/* Fecha */}
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mt={0.5}
      >
        {fechaActual}
      </Typography>

    </Box>
  );
};

export default Encabezado;
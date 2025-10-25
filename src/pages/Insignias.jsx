// Insignias.jsx
import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Importa los componentes de la carpeta 'components'
import Encabezado from '../components/Encabezado';
import InsigniaUnica from '../components/InsigniaUnica';

const Insignias = () => {
  const theme = useTheme();

  // ----------------------------------------------------
  // DATOS DINÁMICOS (Se simula la obtención de datos del usuario)
  // ----------------------------------------------------

  // Nombre para el encabezado (para pruebas, puede ser 'Desarrollador', 'Andei', 'Lucia')
  const usuarioActual = 'Desarrollador';

  // Las cuatro insignias que el usuario tiene
  const insigniasUsuario = [
    'Crítico Literario',
    'Comentarista Apasionado',
    'Fan de Libros',
    'Pionero de la Novedad'
  ];
  
  // ----------------------------------------------------

  return (
    // Box principal para simular el contenedor de la pantalla de la app
    <Box
      sx={{
        maxWidth: 400, // Ancho típico de un móvil
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // Fondo general sutil
      }}
    >

      {/* 1. COMPONENTE DE ENCABEZADO */}
      <Encabezado nombreUsuario={usuarioActual} />

      <Box sx={{ paddingY: 2 }}>

        {/* Paper contenedor con estilo similar a CommentSection */}
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: '12px', mt: 2, mx: 2 }}>

          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme.palette.body?.main || '#4A4C52' }}
          >
            Mis insignias ({insigniasUsuario.length})
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* 2. COMPONENTES DE LAS CUATRO INSIGNIAS */}
          {insigniasUsuario.map((insignia, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}> {/* Espacio entre insignias */}
              <InsigniaUnica nombreInsignia={insignia} />
            </Box>
          ))}

        </Paper>

      </Box>
    </Box>
  );
};

export default Insignias;
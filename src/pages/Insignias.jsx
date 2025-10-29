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
        height: '100vh',
        backgroundColor: '#f5f5f5', // Fondo general sutil
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >

      {/* 1. COMPONENTE DE ENCABEZADO */}
      <Encabezado nombreUsuario={usuarioActual} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>

        {/* Paper contenedor con estilo similar a CommentSection */}
        <Paper sx={{ mx: 0, px: 0, display: 'flex', flexDirection: 'column', borderRadius: 0, boxShadow: 'none' }}>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme.palette.body?.main || '#4A4C52' }}
          >
            Insignias
          </Typography>

          {/* 2. COMPONENTES DE LAS CUATRO INSIGNIAS */}
          {insigniasUsuario.map((insignia, index) => (
            <Box key={index} sx={{ marginBottom: 4 }}>
              <InsigniaUnica nombreInsignia={insignia} />
            </Box>
          ))}

        </Paper>

      </Box>
    </Box>
  );
};

export default Insignias;
// Insignias.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Importa los componentes de la carpeta 'components'
import AppHeader from '../components/AppHeader';
import InsigniaUnica from '../components/InsigniaUnica';

const Insignias = () => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // ----------------------------------------------------
  // DATOS DINÁMICOS (Se simula la obtención de datos del usuario)
  // ----------------------------------------------------

  const username = 'Desarrollador'; // Simulación de usuario logueado

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
     <AppHeader
             onMenuClick={() => setMenuOpen(true)}
             title={`Hola, ${username || 'Usuario'}`}
             subtitle="Miércoles, Septiembre 17, 2025"
           />

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
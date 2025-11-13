// Insignias.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Importa los componentes de la carpeta 'components'
import AppHeader from '../components/AppHeader';
import InsigniaUnica from '../components/InsigniaUnica';

// Importa el hook de autenticación
import { useAuth } from '../hooks/useAuth';
// Importa el hook de medallas
import useMedallas from '../hooks/useMedallas';

const Insignias = () => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  // Usar el hook para obtener medallas del usuario
  const { medallas, loading, error } = useMedallas(user?.id);

  const username = user ? user.nombre : 'Usuario'; // Obtener nombre real del usuario logueado

  // Fecha dinámica (formato en español, con mayúscula inicial)
  const formattedDate = (() => {
    const d = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // Usamos locale 'es-ES' y capitalizamos la primera letra
    return d.toLocaleDateString('es-ES', opts).replace(/^./, c => c.toUpperCase());
  })();

  // ----------------------------------------------------

  return (
    // Box principal para simular el contenedor de la pantalla de la app
    <Box
      sx={{
        maxWidth: {
          xs: 400, // Móvil
          sm: 600, // Tablet pequeña
          md: 800, // Tablet grande / Desktop pequeño
          lg: 1000, // Desktop
        },
        margin: '0 auto',
        height: '100vh',
        // Fondo general sutil
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >

      {/* 1. COMPONENTE DE ENCABEZADO */}
     <AppHeader
             onMenuClick={() => setMenuOpen(true)}
             title={`Hola, ${username || 'Usuario'}`}
             subtitle={formattedDate}
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

          {/* Mostrar loading, error o las medallas */}
          {loading ? (
            <Typography>Cargando insignias...</Typography>
          ) : error ? (
            <Typography color="error">Error al cargar insignias: {error}</Typography>
          ) : (
            medallas.map((medalla, index) => (
              <Box key={medalla.id || index} sx={{ marginBottom: 2, width: { xs: 350, lg: 500 }, marginX: 'auto', paddingRight: { lg: 5 } }}>
                <InsigniaUnica nombreInsignia={medalla.nombre} />
              </Box>
            ))
          )}

        </Paper>

      </Box>
    </Box>
  );
};

export default Insignias;
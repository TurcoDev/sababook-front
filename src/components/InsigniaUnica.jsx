// components/InsigniaUnica.jsx
import React from 'react';
import { Box, Typography, Divider, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Ícono de ejemplo

// Importar los GIFs
import lapizGif from '../assets/lapiz.gif';
import chatGif from '../assets/chat.gif';
import githubGif from '../assets/github.gif';

const InsigniaUnica = ({ insignia }) => {
  // icono según tipo_accion
  const getIcon = (tipo) => {
    switch (tipo) {
      case 'participar':
        return <img src={lapizGif} alt="Participar" style={{ width: 40, height: 40 }} />; // GIF de lápiz
      case 'comentar':
        return <img src={chatGif} alt="Comentar" style={{ width: 40, height: 40 }} />; // GIF de chat

      case 'leer':
        return <img src={githubGif} alt="Leer" style={{ width: 40, height: 40 }} />; // GIF de github
      // case 'descubrir':
      //   return '🔥'; // Descubrir novedades
      default:
        return <StarIcon />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7ff',
        padding: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        width: { xs: 120, sm: 150 },
        height: { xs: 120, sm: 150 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
      }}
    >
      {/* Ícono de la Insignia */}
      <Avatar sx={{ bgcolor: 'transparent', color: 'text.primary', width: 40, height: 40, fontSize: '1.5rem', mb: 1 }}>
        {getIcon(insignia.tipo_accion)}
      </Avatar>
      {/* Nombre de la Insignia */}
      <Typography variant="body2" fontWeight="medium" textAlign="center" sx={{ mb: 0.5 }}>
        {insignia.nombre}
      </Typography>
      {/* Descripción de la Insignia */}
      <Typography variant="caption" color="text.secondary" textAlign="center">
        {insignia.descripcion}
      </Typography>
    </Box>
  );
};

export default InsigniaUnica;
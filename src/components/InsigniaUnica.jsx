// components/InsigniaUnica.jsx
import React from 'react';
import { Box, Typography, Divider, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Ícono de ejemplo

const InsigniaUnica = ({ insignia }) => {
  // icono según tipo_accion
  const getIcon = (tipo) => {
    switch (tipo) {
      case 'participar':
        return '💬'; // Participar en foros
      case 'comentar':
        return '⭐'; // Comentar libros
      case 'leer':
        return '📚'; // Leer libros
      case 'descubrir':
        return '🔥'; // Descubrir novedades
      default:
        return <StarIcon />;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f7f7f7ff', padding: 1, mx: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
      <ListItem sx={{ padding: 0 }}>
        {/* Círculo de la Insignia (Avatar) */}
        <ListItemAvatar sx={{ minWidth: 40 }}>
          <Avatar sx={{ bgcolor: 'transparent', color: 'text.primary', width: 32, height: 32, fontSize: '1.25rem' }}>
            {getIcon(insignia.tipo_accion)}
          </Avatar>
        </ListItemAvatar>
        {/* Nombre y descripción de la Insignia */}
        <ListItemText
          primary={
            <Typography variant="body2" fontWeight="medium" textAlign="center">
              {insignia.nombre}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary" textAlign="center">
              {insignia.descripcion}
            </Typography>
          }
          sx={{ marginY: 0 }}
        />
      </ListItem>
    </Box>
  );
};

export default InsigniaUnica;
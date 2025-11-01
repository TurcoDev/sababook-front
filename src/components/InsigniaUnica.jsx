// components/InsigniaUnica.jsx
import React from 'react';
import { Box, Typography, Divider, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Ícono de ejemplo

const InsigniaUnica = ({ nombreInsignia }) => {

   // Función para obtener propiedades específicas de cada insignia
   const getInsigniaProps = (nombre) => {
     switch (nombre) {
       case 'Crítico Literario':
         return {
           bgColor: 'transparent',
           icon: '📚' // Un libro como emoji
         };
       case 'Comentarista Apasionado':
         return {
           bgColor: 'transparent',
           icon: '💬' // Globo de diálogo con puntos suspensivos
         };
       case 'Fan de Libros':
         return {
           bgColor: 'transparent',
           icon: '⭐' // Estrella amarilla
         };
       case 'Pionero de la Novedad':
         return {
           bgColor: 'transparent',
           icon: '🔥' // Fuego como pico o novedad
         };
       default:
         return {
           bgColor: 'primary.main',
           icon: <StarIcon />
         };
     }
   };

  const { bgColor, icon } = getInsigniaProps(nombreInsignia);

  return (
    <Box sx={{ backgroundColor: '#f7f7f7ff', padding: 1, mx: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
      <ListItem sx={{ padding: 0 }}>
        
        {/* Círculo de la Insignia (Avatar) */}
        <ListItemAvatar sx={{ minWidth: 40 }}>
          <Avatar sx={{ bgcolor: bgColor, color: 'text.primary', width: 32, height: 32, fontSize: '1.25rem' }}>
            {icon}
          </Avatar>
        </ListItemAvatar>
        
        {/* Nombre de la Insignia */}
        <ListItemText
          primary={
            <Typography variant="body2" fontWeight="medium" textAlign="center">
              {nombreInsignia}
            </Typography>
          }
          sx={{ marginY: 0 }}
        />
      </ListItem>
    </Box>
  );
};

export default InsigniaUnica;
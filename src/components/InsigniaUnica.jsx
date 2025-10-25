// components/InsigniaUnica.jsx
import React from 'react';
import { Box, Typography, Divider, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Ícono de ejemplo

const InsigniaUnica = ({ nombreInsignia }) => {
  
  // Todas las insignias usan el mismo color primario del tema
  const getInsigniaProps = (nombre) => {
    return {
        bgColor: 'primary.main', // Todas usan el color primario (marrón)
        icon: <StarIcon />
    };
  };

  const { bgColor, icon } = getInsigniaProps(nombreInsignia);

  return (
    <Box sx={{ backgroundColor: 'background.paper' }}>
      <ListItem sx={{ paddingX: 2 }}>
        
        {/* Círculo de la Insignia (Avatar) */}
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: bgColor, color: 'text.primary' }}>
            {icon}
          </Avatar>
        </ListItemAvatar>
        
        {/* Nombre de la Insignia */}
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight="medium">
              {nombreInsignia}
            </Typography>
          }
          sx={{ marginY: 0 }}
        />
      </ListItem>
      
      {/* Separador que no incluye el espacio del Avatar (variant="inset") */}
      <Divider variant="inset" component="li" sx={{ ml: '72px', mr: 2 }} />
      {/* ml: '72px' = el ancho del Avatar + margen, alineando el separador con el texto */}
    </Box>
  );
};

export default InsigniaUnica;
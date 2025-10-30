import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoImage from '../assets/logo.png'; // ¡Asegúrate de que la ruta del logo es correcta!

// Recibimos las props necesarias: la función para abrir el menú y los textos dinámicos
export default function AppHeader({ onMenuClick, title, subtitle }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3} // Dejamos un margen inferior estándar para separarlo del contenido
    >
      {/* BLOQUE IZQUIERDO: Menú y Texto */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={onMenuClick} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Box>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {title} {/* Usamos la prop title */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle} {/* Usamos la prop subtitle */}
            </Typography>
        </Box>
      </Box>

      {/* BLOQUE DERECHO: Logo */}
      <Box
        component="img"
        src={LogoImage}
        alt="Logo de la aplicación"
        sx={{
          height: { xs: 80, sm: 90 },
          width: 'auto',
          ml: 2,
        }}
      />
    </Box>
  );
}
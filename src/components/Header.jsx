import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onMenuClick }) {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <IconButton onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>
      <Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Bienvenida, Lucía
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Miércoles, Septiembre 17, 2025
        </Typography>
      </Box>
    </Box>
  );
}

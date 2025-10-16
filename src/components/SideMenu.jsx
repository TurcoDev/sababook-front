import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from 'react-router-dom';

export default function SideMenu({ open, onClose, active = "Inicio" }) {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/home" },
    { text: "Perfil", icon: <PersonIcon />, path: "/perfil" },
    { text: "Favoritos", icon: <FavoriteIcon />, path: "/favoritos" },
    { text: "Foros", icon: <ForumIcon />, path: "/foros" },
    { text: "Insignias", icon: <EmojiEventsIcon />, path: "/insignias" },
  ];
  
  // Nota: El item 'Salir' se maneja fuera del mapeo

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      transitionDuration={400}
   
      slotProps={{
        paper: {
          sx: {
            width: 240,
            backgroundColor: "rgba(255, 250, 245, 0.95)",
            backdropFilter: "blur(8px)",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
            color: "#4b2c15",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 1,
          },
        },
      }}
    >
      <Box>
        <List>
          {menuItems.map((item, i) => {
            const isActive = item.text === active;
            return (
              <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  //Propiedades para navegación con React Router
                  component={Link} 
                  to={item.path} 
                  onClick={onClose} 
                  sx={{
                    borderRadius: 3,
                    bgcolor: isActive ? "#ff8a00" : "transparent",
                    color: isActive ? "#fff" : "#4b2c15",
                    "&:hover": {
                      bgcolor: isActive ? "#ff9e2a" : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#fff" : "#4b2c15",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box textAlign="center" pb={2}>
        <ListItemButton onClick={() => {
            alert("Cerrar sesión y navegación");
            onClose(); 
        }}>
          <ListItemIcon sx={{ color: "#4b2c15" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
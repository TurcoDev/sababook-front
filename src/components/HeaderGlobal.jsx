import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import logoImage from "../assets/favicon.png";

// === Estilos ===

// Header gris claro
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#F5F0F8", 
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  position: "static",
}));

// Logo
const LogoImage = styled("img")({
  height: "60px",
  width: "auto",
  objectFit: "contain",
});

// Botón hamburguesa
const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.grey[800],
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

// Drawer (menú lateral) con fondo naranja
function SideMenu({ open, onClose, active = "Inicio" }) {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/inicio" },
    { text: "Cuenta", icon: <AccountCircleIcon />, path: "/cuenta" },
    { text: "Panel", icon: <DashboardIcon />, path: "/panel" },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={400}
      slotProps={{
        paper: {
          sx: {
            width: 240,
            backgroundColor: "#f25600", 
            color: "#fff",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 1,
          },
        },
      }}
    >
      {/* Lista de opciones */}
      <Box>
        <List>
          {menuItems.map((item, i) => {
            const isActive = item.text === active;
            return (
              <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={onClose}
                  sx={{
                    borderRadius: 3,
                    bgcolor: isActive ? "#ff9e2a" : "transparent",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#ff9e2a",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#fff",
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

      {/* Botón de salida */}
      <Box textAlign="center" pb={2}>
        <ListItemButton
          onClick={() => {
            alert("Cerrar sesión");
            onClose();
          }}
          sx={{
            color: "#fff",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

// === Header principal ===
export default function HeaderGlobal() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <StyledAppBar>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Logo */}
          <Box>
            <LogoImage src={logoImage} alt="La Gran Ocasión" />
          </Box>

          {/* Botón de menú */}
          <Box>
            <StyledMenuButton onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </StyledMenuButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Drawer */}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

import React, { useState } from 'react';
import { Box, Button, styled, Avatar, Typography } from '@mui/material';
// 👈 IMPORTAR: useNavigate para la navegación
import { useNavigate } from 'react-router-dom'; 

import AppHeader from '../components/AppHeader'; 
import SideMenu from '../components/SideMenu';
import UserProfileForm from '../components/UserProfileForm'; 

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
  color: '#FFFFFF', 
  padding: '12px 0',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '30px', 
}));


// ⚠️ Se eliminó la prop 'onMyCommentsClick'
const Profile = () => { 
  // 💡 INICIALIZAR: Hook de navegación
  const navigate = useNavigate(); 
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('menu'); 
  

  const [userData, setUserData] = useState({
    userName: "Lucía Gómez",
    userEmail: "lucia.gomez@mail.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  });

 
  const { userName, userEmail, avatarUrl } = userData;


  const handleChangeAvatar = (newUrl) => {
      setUserData(prevData => ({
          ...prevData,
          avatarUrl: newUrl
      }));
  };

  // Funciones para cambiar de vista
  const handleModifyProfileClick = () => setCurrentView('form');
  const handleCancel = () => setCurrentView('menu');
  const handleSave = () => {
    // Aquí iría la lógica para enviar userData a la API
    console.log("Datos guardados. Volviendo al menú.");
    handleCancel();
  };
  
  // 💡 NUEVA FUNCIÓN: Redirige a la página de Mis Comentarios
  const handleMyCommentsClick = () => {
    navigate('/mis-comentarios'); 
  };
  
  // -----------------------------------------------------
  // FUNCIÓN DE RENDERIZADO CONDICIONAL
  // -----------------------------------------------------

  const renderContent = () => {
    if (currentView === 'form') {
      // Muestra el formulario de edición
      return (
        <UserProfileForm 
          userName={userName} 
          onCancel={handleCancel}
          onSave={handleSave}
          onAvatarChange={handleChangeAvatar} 
          currentAvatarUrl={avatarUrl} 
        />  
      );
    }

    // Muestra el menú y avatar (Vista por defecto)
    return (
      <>
        {/* AVATAR Y DATOS DEL USUARIO */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mb: 4, 
            mt: 2, 
          }}
        >
          <Avatar 
            alt={userName} 
            src={avatarUrl}
            sx={{ width: 240, height: 240, mb: 1.5 }} 
          />
          <Typography variant="h5" fontWeight="bold">
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userEmail}
          </Typography>
        </Box>

        {/* CONTENEDOR DE BOTONES */}
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '350px', 
            margin: '0 auto',
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
          }}
        >
          {/* Botón 1: Modificar Perfil */}
          <StyledButton
            variant="contained"
            onClick={handleModifyProfileClick}
            fullWidth
          >
            Modificar Perfil
          </StyledButton>

          {/* Botón 2: Mis Comentarios (MODIFICADO) */}
          <StyledButton
            variant="contained"
            // ✅ Usa la nueva función de navegación
            onClick={handleMyCommentsClick} 
            fullWidth
          >
            Mis Comentarios
          </StyledButton>
        </Box>
      </>
    );
  };
  
  // -----------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // -----------------------------------------------------

  return (
    <Box
      py={2}
      px={1}
      sx={{
        width: '100%',
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        title={currentView === 'menu' ? "Mi Perfil" : "Modificar Perfil"} 
        subtitle={currentView === 'menu' ? `Bienvenida, ${userName}` : "Edita tus datos personales"}
      />
      
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Perfil" />

      {/* Renderiza el contenido según el estado currentView */}
      {renderContent()}

    </Box>
  );
};

export default Profile;
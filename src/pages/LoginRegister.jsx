// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Login from '../components/Login'; 
import logoImage from '../assets/logo.png';
import LoginForm from '../components/LoginForm'; 


const StyledPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', 
  backgroundColor: '#FFFFFF', 
  padding: theme.spacing(3),
}));

const LoginPage = () => {

  const [view, setView] = useState('presentation');
  const logoUrl = logoImage;

  const handleRegistroClick = () => { 
    console.log('Navegando a Registro (a implementar)');
  };
  const handleLoginClick = () => { 
    setView('login');
    console.log('Cambiando a vista de formulario de Login');
  };

  const handleLoginSubmit = () => {
    console.log('Usuario y contraseña enviados. Intentando iniciar sesión...');
    
  }; 
  return (
    <StyledPageContainer>
      
      <img 
        src={logoUrl} 
        alt="La gran OCASION Logo" 
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '40px', display: 'block', width: '350px' }} 
      />
      {view === 'presentation' ? (
        
        <Login
          imageUrl={logoUrl} 
          onRegisterClick={handleRegistroClick}
          onLoginClick={handleLoginClick} 
        />
      ) : (
        
        <LoginForm
          onLoginSubmit={handleLoginSubmit}
        />
      )}
    </StyledPageContainer>
  );
};

export default LoginPage;
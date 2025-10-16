// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Login from '../components/Login';
import logoImage from '../assets/logo.png';
import LoginForm from '../components/LoginForm';
import Register from '../components/auth/Register';


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
    setView('register');
    console.log('Cambiando a vista de Registro');
  };
  const handleLoginClick = () => {
    setView('login');
    console.log('Cambiando a vista de formulario de Login');
  };

  const handleLoginSubmit = () => {
    console.log('Usuario y contraseña enviados. Intentando iniciar sesión...');
  };

  const handleRegisterSubmit = (formData) => {
    console.log('Datos de registro enviados:', formData);
    // Aquí puedes implementar la lógica para registrar al usuario
  };

  const handleBackToLogin = () => {
    setView('presentation');
    console.log('Volviendo a la vista de presentación');
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
      ) : view === 'login' ? (
        <LoginForm
          onLoginSubmit={handleLoginSubmit}
        />
      ) : view === 'register' ? (
        <Register
          onRegisterSubmit={handleRegisterSubmit}
          onBackToLogin={handleBackToLogin}
        />
      ) : null}
    </StyledPageContainer>
  );
};

export default LoginPage;
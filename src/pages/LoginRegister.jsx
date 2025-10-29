// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Login from '../components/Login';
import logoImage from '../assets/logo.png';
import { API_BASE_URL } from '../environments/api';
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

  const navigate = useNavigate();
  const [error, setError] = useState(null);
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

const handleLoginSubmit = async ({ email, password }) => {
  setError(null); // Limpia errores previos

  try {
    // Se agrega
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    // Guardar los datos básicos
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('rol', data.rol);

    // Paso 2: Obtener el nombre real usando userId
    const profileResponse = await fetch(`${API_BASE_URL}/api/v1/user/${data.userId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`
      }
    });
    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(profileData.error || 'No se pudo obtener el perfil del usuario');
    }

    // Guardar el nombre en localStorage (ajusta el campo si cambia)
    localStorage.setItem('username', profileData.nombre);

    // Navegar a Home
    navigate('/home', { state: { fromLogin: true } });

  } catch (err) {
    const errorMessage =
      err.message.includes('Failed to fetch')
        ? 'No se pudo conectar con el servidor. ¿Está en ejecución?'
        : err.message;
    setError(errorMessage);
  }
};

  const handleRegisterSubmit = (formData) => {
    console.log('Datos de registro enviados:', formData);
    
  };

  const handleBackToLogin = () => {
    setView('presentation');
    console.log('Volviendo a la vista de presentación');
  };
  return (
    <StyledPageContainer>

      <img
        src={logoUrl}
        alt="La gran OCASIÓN Logo"
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
          error={error}
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
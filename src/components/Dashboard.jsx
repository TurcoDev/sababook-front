// src/components/Dashboard.jsx (ACTUALIZADO PARA INCLUIR LA NAVEGACIÓN)

import React, { useState } from 'react';
import { Box } from '@mui/material';

// 🛑 RE-IMPORTAMOS HeaderDashboard 🛑
import HeaderDashboard from './HeaderDashboard'; 
import UserTable from './UserTable'; 
import BookTable from './BookTable'; 
import ForumTable from './ForumTable'; 

const DashboardContainer = Box; 

const Dashboard = () => {
  // Estado para controlar qué vista está activa
  const [activeView, setActiveView] = useState('users'); 

  // Handler que se pasa al HeaderDashboard para cambiar la vista
  const handleNavigate = (viewName) => {
      setActiveView(viewName);
  };
  
  const handleAddClick = () => {
      console.log(`Abriendo modal para agregar en la vista: ${activeView}`);
  };

  // Función auxiliar para renderizar la tabla correcta
  const renderActiveView = () => {
    switch (activeView) {
      case 'users':
        return <UserTable />;
      case 'books':
        return <BookTable />;
      case 'forums':
        return <ForumTable />;
      default:
        return <UserTable />;
    }
  };


  return (
    <DashboardContainer 
        sx={{ 
            width: '100%', 
            minHeight: '100vh', 
            padding: 4, 
            backgroundColor: '#FFFFFF', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
        }}
    >
      
      {/* 1. Componente que agrupa la navegación y acciones */}
      <HeaderDashboard 
        activeView={activeView}
        onNavigate={handleNavigate} // Con esto, los botones cambian la tabla
        onAddClick={handleAddClick}
      />

      {/* 2. Renderizado Condicional de la Tabla */}
      {renderActiveView()}
      
    </DashboardContainer>
  );
};

export default Dashboard;
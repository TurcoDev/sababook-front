import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom'; 

import HeaderGlobal from '../components/HeaderGlobal';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          
      {/* 1. Header Fijo (Global) */}
      <HeaderGlobal />
      
      {/* 2. CONTENEDOR PRINCIPAL */}
      <Box component="main" sx={{ 
        
          minHeight: 'calc(100vh - 64px)', 
          paddingX: 4, 
          paddingTop: 3,
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%', 
          alignItems: 'center'
      }}>
        
        {/* 3. Menú de Navegación del Dashboard (Ocupa todo el ancho) */}
        
        <Dashboard currentPath={currentPath} /> 
        
        {/* 4. Contenedor del contenido (Tablas) */}
        <Box sx={{ 
          width: '100%',  
          maxWidth: '1200px', 
          flexGrow: 1, 
          mt: 2 
        }}>
          <Outlet /> 
        </Box>

      </Box>
      
    </Box>
  );
};

export default DashboardPage;
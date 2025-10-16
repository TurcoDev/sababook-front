// src/pages/DashboardPage.jsx

import React from 'react';
import { Box } from '@mui/material';

import HeaderGlobal from '../components/HeaderGlobal';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          
      <HeaderGlobal />
      
      <Dashboard />
      
    </Box>
  );
};

export default DashboardPage;
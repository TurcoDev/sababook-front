import React from 'react';
import {
  Typography, Button, Box, InputBase, Paper, TableContainer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
// Componentes importados
import DashboardLayout from '../components/DashboardLayout';
import UserTable from '../components/UserTable';
import Menu from '../components/Menu';
// --- Estilos personalizados (Styled Components) ---
const SearchBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  display: 'flex',
  alignItems: 'center',
  width: 300,
  boxShadow: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: theme.spacing(2),
}));

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* BARRA DE BÚSQUEDA Y BOTÓN AGREGAR */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <SearchBox>
          <SearchIcon color="action" sx={{ mr: 1 }} />
          <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            fullWidth
          />
        </SearchBox>
        <Button 
            variant="contained" 
            sx={{ 
                backgroundColor: '#FF6600', 
                '&:hover': { backgroundColor: '#E05C00' },
                textTransform: 'none' // Para que diga "Agregar" en lugar de "AGREGAR"
            }}
        >
          Agregar
        </Button>
      </Box>

      {/* TÍTULO Y TABLA DE USUARIOS */}
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        Usuarios
      </Typography>

      <TableContainer>
        <UserTable />
      </TableContainer>
    </DashboardLayout>
  );
};

export default Dashboard;
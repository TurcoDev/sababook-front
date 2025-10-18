import { useState, useEffect } from 'react';
import { Box, Modal, Snackbar, Alert } from '@mui/material';

import HeaderDashboard from './HeaderDashboard'; 
import UserTable from './UserTable'; 
import BookTable from './BookTable'; 
import ForumTable from './ForumTable'; 
import UserForm from './UserForm';
import { API_BASE_URL } from '../environments/api';

const DashboardContainer = Box; 

const Dashboard = () => {
  const [activeView, setActiveView] = useState('users'); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Mapeo de roles para la creación de usuarios
  const rolMapping = {
    alumno: 1,
    docente: 2,
    administrador: 3,
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/v1/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error("Acceso denegado. No tienes permisos para ver esta página.");
        throw new Error("Error al cargar los usuarios");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'users') {
      fetchUsers();
    }
  }, [activeView]);

  const handleNavigate = (viewName) => {
      setActiveView(viewName);
  };
  
  const handleAddClick = () => {
    if (activeView === 'users') {
      setOpenCreateModal(true);
    }
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleSaveNewUser = async (formData) => {
    const dataToSend = { ...formData };
    dataToSend.rol_id = rolMapping[dataToSend.rol];
    dataToSend.contrasena = dataToSend.password;
    delete dataToSend.rol;
    delete dataToSend.password;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Error al crear el usuario');

      // Para ver el nuevo usuario, volvemos a pedir la lista completa.
      await fetchUsers(); 
      handleCloseCreateModal();
      setSnackbar({ open: true, message: "Usuario creado correctamente", severity: "success" });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setSnackbar({ open: true, message: "Error al crear el usuario", severity: "error" });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  // Función auxiliar para renderizar la tabla correcta
  const renderActiveView = () => {
    switch (activeView) {
      case 'users':
        return (
          <UserTable 
            users={users} 
            loading={loading} 
            error={error} 
            onUserUpdate={fetchUsers} // Pasamos una función para refrescar la lista
          />
        );
      case 'books':
        return <BookTable />;
      case 'forums':
        return <ForumTable />;
      default:
        return <UserTable users={users} loading={loading} error={error} onUserUpdate={fetchUsers} />;
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

      {/* Modal para CREAR usuario */}
      <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          {/* No pasamos userToEdit para que el formulario sepa que es para crear */}
          <UserForm onSave={handleSaveNewUser} onCancel={handleCloseCreateModal} />
        </Box>
      </Modal>

      {/* Snackbar para notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </DashboardContainer>
  );
};

export default Dashboard;
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
  
  // --- ESTADOS DE USUARIOS y LIBROS (Ahora son específicos) ---
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Mapeo de roles para la creación de usuarios
  const rolMapping = {
    alumno: 1,
    docente: 2,
    administrador: 3,
  };

  // --- FUNCIÓN FETCH PARA USUARIOS 
  const fetchUsers = async () => {
    try {
        setUserLoading(true);
        setUserError(null);
        const token = localStorage.getItem('token');
        
        const res = await fetch(`${API_BASE_URL}/api/v1/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) { 
            if (res.status === 403) throw new Error("Acceso denegado. No tienes permisos para ver esta página.");
            throw new Error("Error al cargar los usuarios"); 
        }
        const data = await res.json();
        setUsers(data);
    } catch (err) { 
        setUserError(err.message); 
    } finally { 
        setUserLoading(false); 
    }
  };
  
  // --- FUNCIÓN FETCH PARA LIBROS 
  const fetchBooks = async () => { 
    try {
        setBooksLoading(true);
        setBooksError(null);
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No autenticado.");

        const res = await fetch(`${API_BASE_URL}/api/v1/libros`, { 
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) { 
            if (res.status === 403) throw new Error("Acceso denegado.");
            throw new Error("Error al cargar los libros"); 
        }
        const data = await res.json();
        setBooks(data);
    } catch (err) { 
        setBooksError(err.message); 
    } finally { 
        setBooksLoading(false); 
    }
  };

  // --- useEffect para Cargar Datos ---
  useEffect(() => {
    if (activeView === 'users') {
      fetchUsers();
    } else if (activeView === 'books') {
      fetchBooks();
    }
  }, [activeView]);

  // --- HANDLERS 
  const handleNavigate = (viewName) => { 
    setActiveView(viewName); 
  };

  const handleAddClick = () => { 
    if (activeView === 'users') {
      setOpenCreateModal(true);
    }
    // NOTA: Se necesitaría lógica adicional aquí para la creación de libros
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
            loading={userLoading} 
            error={userError} 
            onUserUpdate={fetchUsers} 
          />
        );
      case 'books':
        return (
          <BookTable 
            books={books} 
            isLoading={booksLoading} 
            error={booksError} 
            onBookUpdate={fetchBooks} 
          />
        );
      case 'forums':
        return <ForumTable />;
      default:
        return (
          <UserTable 
            users={users} 
            loading={userLoading} 
            error={userError} 
            onUserUpdate={fetchUsers} 
          />
        );
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
        onNavigate={handleNavigate} 
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
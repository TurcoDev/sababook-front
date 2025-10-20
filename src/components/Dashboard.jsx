// src/components/Dashboard.jsx

import { useState, useEffect } from 'react';
import { Box, Modal, Snackbar, Alert } from '@mui/material';
// 🚨 Nota: Aquí ya no necesitamos useLocation ni Outlet

import HeaderDashboard from './HeaderDashboard'; 
import UserTable from './UserTable'; 
import BookTable from './BookTable'; 
import ForumTable from './ForumTable'; 
import UserForm from './UserForm';
import { API_BASE_URL } from '../environments/api';

const DashboardContainer = Box; 

const Dashboard = () => {
  const [activeView, setActiveView] = useState('users'); 
  
  // --- ESTADOS DE USUARIOS y LIBROS (Se mantienen aquí) ---
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Mapeo de roles para la creación de usuarios
  const rolMapping = { /* ... */ };

  // --- FUNCIÓN FETCH PARA USUARIOS ---
  const fetchUsers = async () => { /* ... lógica de fetch ... */
    try {
        setUserLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No autenticado."); // Mejorar manejo de error 401
        
        const res = await fetch(`${API_BASE_URL}/api/v1/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) { /* ... */ throw new Error("Error al cargar los usuarios"); }
        const data = await res.json();
        setUsers(data);
    } catch (err) { setUserError(err.message); } finally { setUserLoading(false); }
  };
  
  // --- FUNCIÓN FETCH PARA LIBROS ---
  const fetchBooks = async () => { /* ... lógica de fetch ... */
    try {
        setBooksLoading(true);
        setBooksError(null);
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No autenticado."); // Mejorar manejo de error 401

        const res = await fetch(`${API_BASE_URL}/api/v1/libros`, { 
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) { /* ... */ throw new Error("Error al cargar los libros"); }
        const data = await res.json();
        setBooks(data);
    } catch (err) { setBooksError(err.message); } finally { setBooksLoading(false); }
  };

  // --- useEffect para Cargar Datos (Solo depende de activeView) ---
  useEffect(() => {
    if (activeView === 'users') {
      fetchUsers();
    } else if (activeView === 'books') {
      fetchBooks();
    }
  }, [activeView]);

  const handleNavigate = (viewName) => { setActiveView(viewName); };
  const handleAddClick = () => { /* ... */ };
  const handleCloseCreateModal = () => { /* ... */ };
  const handleSaveNewUser = async (formData) => { /* ... */ };
  const handleSnackbarClose = (event, reason) => { /* ... */ };

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

      {/* Modal y Snackbar se mantienen */}
      <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
        <Box /* ... */ >
          <UserForm onSave={handleSaveNewUser} onCancel={handleCloseCreateModal} />
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </DashboardContainer>
  );
};

export default Dashboard;
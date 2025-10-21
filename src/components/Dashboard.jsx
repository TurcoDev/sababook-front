import { useState, useEffect } from 'react';
import { Box, Modal, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';


import HeaderDashboard from './HeaderDashboard'; 
import UserTable from './UserTable'; 
import BookTable from './BookTable'; 
import ForumTable from './ForumTable'; 
import UserForm from './UserForm';
import BookForm from './BookForm'; 
import { API_BASE_URL } from '../environments/api';

const DashboardContainer = Box; 

const Dashboard = () => {
  const [activeView, setActiveView] = useState('users'); 
  
  // --- ESTADOS DE USUARIOS y LIBROS ---
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);

  // --- ESTADOS DE MODALES Y EDICIÓN ---
  const [openCreateModal, setOpenCreateModal] = useState(false); // Modal para USUARIOS
  const [openCreateBookModal, setOpenCreateBookModal] = useState(false); // Modal para LIBROS
  // 💡 ESTADO CLAVE: Rastrear el libro que se está editando (null si es creación)
  const [bookToEdit, setBookToEdit] = useState(null); 
  
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isApiLoading, setIsApiLoading] = useState(false); // Para manejar carga en operaciones CRUD

  // Mapeo de roles para la creación de usuarios
  const rolMapping = {
    alumno: 1,
    docente: 2,
    administrador: 3,
  };

  // --- FUNCIÓN FETCH PARA USUARIOS (READ) ---
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
  
  // --- FUNCIÓN FETCH PARA LIBROS (READ) ---
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
        // Aseguramos que la estructura sea un array de libros
        setBooks(Array.isArray(data) ? data : data.libros || []); 
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
    setUserError(null);
    setBooksError(null);
  }, [activeView]);

  // --- UI HANDLERS ---

  const handleNavigate = (viewName) => { 
    setActiveView(viewName); 
  };

  const handleAddClick = () => { 
    if (activeView === 'users') {
      setOpenCreateModal(true);
    } else if (activeView === 'books') {
      setBookToEdit(null); // Asegura que el modo sea 'crear'
      setOpenCreateBookModal(true);
    }
  };

  const handleCloseCreateModal = () => { 
    setOpenCreateModal(false); 
  };
  
  // Cierra modal de libros y restablece el libro a editar
  const handleCloseCreateBookModal = () => {
    setOpenCreateBookModal(false);
    setBookToEdit(null);
  };
  
  // 💡 HANDLER DE EDICIÓN: Abre el modal en modo edición
  const handleEditBookClick = (book) => {
    setBookToEdit(book);
    setOpenCreateBookModal(true);
  };

  // --- API HANDLERS (USUARIOS) ---
  
  const handleSaveNewUser = async (formData) => { 
    // Lógica para crear un nuevo usuario (POST)
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
  
  // --- API HANDLERS (LIBROS) ---

  // 💡 HANDLER UNIFICADO: Maneja Creación (POST) y Edición (PUT)
  const handleSaveBook = async (bookData) => {
    setIsApiLoading(true);
    const token = localStorage.getItem('token');
    
    // Determinar si es Edición (PUT) o Creación (POST)
    const isEditing = !!bookData.libro_id;
    const endpoint = isEditing 
        ? `${API_BASE_URL}/api/v1/libros/${bookData.libro_id}` 
        : `${API_BASE_URL}/api/v1/libros`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Fallo la operación (HTTP ${response.status})`);
        }

        await fetchBooks(); 
        handleCloseCreateBookModal();
        const successMsg = isEditing ? 'Libro actualizado correctamente.' : 'Libro creado correctamente.';
        setSnackbar({ open: true, message: `✅ ${successMsg}`, severity: "success" });
        return Promise.resolve();
    } catch (error) {
        console.error(`Error al ${isEditing ? 'editar' : 'crear'} libro:`, error);
        setSnackbar({ open: true, message: `❌ Error: ${error.message}`, severity: "error" });
        // Rechazar la promesa para que el formulario sepa que falló el guardado
        return Promise.reject(error); 
    } finally {
        setIsApiLoading(false);
    }
  };
  
  // 💡 HANDLER DE ELIMINACIÓN: Lógica para la Eliminación (DELETE)
  const handleDeleteBook = async (bookId) => {
    // 🚨 NOTA: En un entorno de producción, se debe usar un modal de Material UI en lugar de window.confirm()
    if (!window.confirm("¿Estás seguro de que quieres eliminar este libro? Esta acción no se puede deshacer.")) return;
    
    setIsApiLoading(true);
    const token = localStorage.getItem('token');
    const endpoint = `${API_BASE_URL}/api/v1/libros/${bookId}`;
    
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Fallo la eliminación (HTTP ${response.status})`);
        }

        await fetchBooks(); // Refrescar la lista de libros
        setSnackbar({ open: true, message: `✅ Libro eliminado correctamente.`, severity: "success" });
    } catch (error) {
        console.error("Error al eliminar libro:", error);
        setSnackbar({ open: true, message: `❌ Error al eliminar: ${error.message}`, severity: "error" });
    } finally {
        setIsApiLoading(false);
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
            isLoading={booksLoading || isApiLoading} 
            error={booksError} 
            // 💡 Se pasan los nuevos handlers al BookTable para delegar acciones
            onEditBook={handleEditBookClick}
            onDeleteBook={handleDeleteBook}
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
        // Mostrar un loader global si hay operaciones de API pendientes (edición/eliminación)
        isLoading={isApiLoading}
      />

      {/* 2. Renderizado Condicional de la Tabla */}
      <Box sx={{ width: '100%', maxWidth: '1200px', flexGrow: 1, mt: 2 }}>
        {renderActiveView()}
      </Box>

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
      
      {/* Modal para CREAR/EDITAR libro */}
      <Modal open={openCreateBookModal} onClose={handleCloseCreateBookModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            width: '90%', 
            maxWidth: '900px', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            borderRadius: '8px',
            backgroundColor: '#fff', 
            boxShadow: 24,
            p: 4, 
          }}
        >
          <BookForm 
            // 💡 bookToEdit determina si el formulario está en modo 'editar' o 'crear'
            bookToEdit={bookToEdit}
            title={bookToEdit ? "Editar Libro" : "Crear Nuevo Libro"}
            onSave={handleSaveBook} // Handler unificado (POST/PUT)
            onCancel={handleCloseCreateBookModal} 
          />
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

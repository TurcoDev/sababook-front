import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  TextareaAutosize,
  styled,
  useTheme,
  Paper,
  Grid,
  Snackbar, // 🚨 Importamos Snackbar
  Alert,    // 🚨 Importamos Alert
  CircularProgress // 🚨 Importamos CircularProgress
} from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom'; 
// 🚨 Importa API_BASE_URL (asumimos que la ruta es correcta, pero el error indica que no)
import { API_BASE_URL } from "../environments/api"; 

// --- Constante de Debugging (BACKEND EN 3000, AJUSTA el prefijo /api/v1 si es necesario) ---
const BACKEND_URL_DEBUG = 'http://localhost:3000/api/v1'; 

// --- Constantes de Opciones ---
const GENEROS = ['Novela', 'Ficción', 'Ciencia Ficción', 'Poesía', 'Ensayo', 'Biografía'];
const NIVELES_EDUCATIVOS = ['Básico', 'Superior'];

// --- Datos Iniciales del Libro ---
const INITIAL_BOOK_DATA = {
  id: '', 
  titulo: '',
  autor: '',
  genero: '',
  nivel_educativo: '',
  descripcion: '',
  imagenUrl: '',
};

// --- 2. Componentes Estilizados (Material UI) ---
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: '40px auto',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  color: '#FFFFFF',
  padding: '10px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  border: '1px solid #ccc',
  padding: '10px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[200], 
    borderColor: theme.palette.grey[500], 
  },
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: '100px',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '4px',
  fontFamily: theme.typography.fontFamily,
  fontSize: '1rem',
  resize: 'vertical',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
}));

// --- 3. Componente Funcional ---

const EditBookForm = () => {
  
  const theme = useTheme();
  const navigate = useNavigate();
  // El parámetro en la URL es 'id' según la ruta '/libros/editar/:id', 
  const { id: bookId } = useParams(); 
  
  const [formData, setFormData] = useState(INITIAL_BOOK_DATA);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  // Manejador para cerrar el Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };
  
  // 🚨 Usamos la URL de debug para asegurar que se conecta al backend
  const apiBaseUrl = BACKEND_URL_DEBUG; 


  //  EFECTO: Cargar datos del libro específico (GET)
  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      try {
        // La URL ahora incluye el puerto 3000 y el prefijo de la API
        const url = `${apiBaseUrl}/libros/${bookId}`;
        console.log('Fetching book data from URL:', url); // DEBUG: Muestra la URL construida
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        // MEJORA CLAVE DE DEBUGGING: Mostramos el status code si falla
        if (!response.ok) {
          throw new Error(`Error ${response.status}: El libro con ID '${bookId}' no se pudo cargar. URL intentada: ${url}`);
        }
        
        const data = await response.json();
        // Mapear los datos recibidos a formData. Asumimos que si viene 'portada_url' lo mapeamos a 'imagenUrl' para el frontend.
        const mappedData = {
          ...data,
          id: data.id || data.libro_id,
          // Mapeamos el campo de la DB (portada_url) al campo del formulario (imagenUrl)
          imagenUrl: data.imagenUrl || data.portada_url || '' 
        };

        setFormData(prev => ({ ...prev, ...mappedData })); 

      } catch (err) {
        console.error("Error cargando libro:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook(); 

  }, [bookId]); 

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //  Manejador de Guardado (PUT)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSnackbar({ open: false, message: '', severity: 'success' });

    const token = localStorage.getItem('token'); 
    if (!token) {
        setError("No hay token de autenticación disponible. Por favor, inicia sesión de nuevo.");
        setLoading(false);
        return;
    }
    
    // La URL usa el puerto 3000 y el prefijo de la API
    const url = `${apiBaseUrl}/libros/${bookId}`;

    // --- 🔑 SOLUCIÓN: Mapeamos 'imagenUrl' a 'portada_url' y limpiamos IDs ---
    const payload = { ...formData };
    
    // 1. Eliminar IDs internos del componente
    delete payload.id; 
    delete payload.libro_id; 

    // 2. Mapear 'imagenUrl' (frontend) a 'portada_url' (backend/DB)
    // Esto resuelve el error "column "imagenurl" of relation "libro" does not exist"
    if (payload.imagenUrl !== undefined) {
        payload.portada_url = payload.imagenUrl;
    }
    delete payload.imagenUrl; // ¡CRUCIAL! Eliminamos el campo que causa el error

    try {
        console.log('Attempting PUT request to URL:', url);
        console.log('Clean payload being sent for update:', payload); 
        
        const response = await fetch(url, {
            method: 'PUT', // Método HTTP para actualización
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload), // <-- Usamos el payload limpio
        });

        if (!response.ok) {
            const errorText = await response.text();
             throw new Error(`Error ${response.status}: Fallo la actualización. Mensaje: ${errorText || 'Error desconocido'}`);
        }
        
        // 🚨 Notificación de éxito
        setSnackbar({ 
            open: true, 
            message: `✅ Libro "${formData.titulo}" actualizado exitosamente.`, 
            severity: 'success' 
        });
        
        // Redirige después de un breve momento
        setTimeout(() => {
            // --- 🔄 CAMBIO CLAVE: Redirigimos a la ruta de libros en lugar de /dashboard ---
            navigate('/dashboard'); 
        }, 1500);


    } catch (err) {
        console.error("Error al actualizar el libro:", err);
        setError(`Error al guardar: ${err.message}`);
        setSnackbar({ 
            open: true, 
            message: `❌ Error al guardar: ${err.message}`, 
            severity: 'error' 
        });

    } finally {
        setLoading(false);
    }
  };

  // Manejador de Cancelar
  const handleCancel = () => {
    navigate('/dashboard'); 
  };

  // Renderizado de carga y error
  if (loading && formData.id === '') {
    return (
        <Box sx={{ p: 5, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Cargando datos del libro...</Typography>
        </Box>
    );
  }

  if (error && !loading) {
    return (
        <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography color="error" variant="h6" gutterBottom>
                Error al cargar el libro
            </Typography>
            <Typography color="error">
                Detalle: {error}
            </Typography>
        </Box>
    );
  }

  // Si no estamos cargando y no hay un libro ID, o no se encontró el libro:
  if (!bookId || (!loading && formData.id === '')) {
    return <Box sx={{ p: 5, textAlign: 'center' }}><Typography color="error">🚨 ID de libro no proporcionado o el libro no existe en la base de datos.</Typography></Box>;
  }


  return (
    <FormContainer component="form" onSubmit={handleSave}>
      
      <Box mb={4}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ color: theme.palette.body?.main || '#4A4C52' }}
        >
          Editar libro (ID: {bookId})
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Columna Izquierda: Campos del formulario */}
        <Grid item xs={12} md={6}>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Título</Typography>
            <TextField
              name="titulo"
              fullWidth
              value={formData.titulo}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Ej: El Ingenioso Hidalgo Don Quijote de la Mancha"
            />
          </Box>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Autor</Typography>
            <TextField
              name="autor"
              fullWidth
              value={formData.autor}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Ej: García Márquez, Gabriel"
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Género</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Selecciona Género</InputLabel>
              <Select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                label="Selecciona Género"
              >
                {GENEROS.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nivel Educativo</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Selecciona Nivel</InputLabel>
              <Select
                name="nivel_educativo" 
                value={formData.nivel_educativo}
                onChange={handleChange}
                label="Selecciona Nivel"
              >
                {NIVELES_EDUCATIVOS.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Descripción</Typography>
            <StyledTextarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              aria-label="Descripción del libro"
            />
          </Box>

        </Grid>

        {/* Columna Derecha: Imagen */}
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Imagen</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="URL de la imagen"
              value={formData.imagenUrl} 
              onChange={handleChange}
              name="imagenUrl"
            />
          </Box>
          
          {/* Previsualización de la Imagen */}
          <Box 
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              display: 'inline-block',
              maxWidth: '100%',
              mt: 2,
            }}
          >
            <Box 
                component="img"
                src={formData.imagenUrl || 'https://placehold.co/300x400/cccccc/333333?text=Sin+Imagen'} 
                alt="Portada del libro"
                // 🚨 Importante: Añadir fallback de error para la imagen
                onError={(e) => { e.target.src = 'https://placehold.co/300x400/cccccc/333333?text=Error+Carga'; }}
                sx={{ 
                    width: 300, 
                    height: 400, 
                    objectFit: 'cover',
                    display: 'block',
                    backgroundColor: formData.imagenUrl ? 'transparent' : '#eee', 
                }}
            />
          </Box>
        </Grid>
      </Grid>
      
      {/* Botones de Acción */}
      <Box mt={5} display="flex" justifyContent="flex-end">
        <SecondaryButton 
          onClick={handleCancel}
          disabled={loading}
        >
          Cancelar
        </SecondaryButton>
        <PrimaryButton 
          type="submit" 
          variant="contained" 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
        </PrimaryButton>
      </Box>
      
      {/* 🚨 Snackbar para notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </FormContainer>
  );
};

export default EditBookForm;

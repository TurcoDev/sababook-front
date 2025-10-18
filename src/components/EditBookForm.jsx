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
} from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom'; 
import { API_BASE_URL } from "../environments/api"; 

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
    // 💡 CAMBIO: Usamos un gris más visible (ej: 200) para el fondo.
    backgroundColor: theme.palette.grey[200], 
    // 💡 OPCIONAL: Oscurecemos el borde para un mejor contraste.
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
  const { bookId } = useParams(); 
  
  const [formData, setFormData] = useState(INITIAL_BOOK_DATA);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  //  EFECTO: Cargar datos del libro específico (GET)
  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `${API_BASE_URL}/api/v1/libros/${bookId}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error al obtener libro (HTTP ${response.status})`);
        }
        
        const data = await response.json();
        setFormData(data); 
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

    // Llama a la ruta PUT /api/v1/libros/:bookId para actualizar
    const url = `${API_BASE_URL}/api/v1/libros/${bookId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT', // Método HTTP para actualización
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${tuToken}` // Si requieres token
            },
            body: JSON.stringify(formData), // Envía los datos actualizados
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Fallo la actualización (HTTP ${response.status})`);
        }

        alert(`Libro "${formData.titulo}" actualizado exitosamente.`);
        navigate('/dashboard/libros'); // Redirige a la tabla

    } catch (err) {
        console.error("Error al actualizar el libro:", err);
        setError(`Error al guardar: ${err.message}`);
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
    return <Box sx={{ p: 5, textAlign: 'center' }}><Typography>Cargando datos del libro...</Typography></Box>;
  }

  if (error && !loading) {
    return <Box sx={{ p: 5, textAlign: 'center' }}><Typography color="error">Error: {error}</Typography></Box>;
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
                src={formData.imagenUrl || null} 
                alt="Portada del libro"
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
          {loading ? 'Guardando...' : 'Guardar'}
        </PrimaryButton>
      </Box>

    </FormContainer>
  );
};

export default EditBookForm;

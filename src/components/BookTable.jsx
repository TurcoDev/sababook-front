import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Pagination,
  IconButton,
  styled, // 🚨 ESTO ES NECESARIO
  useTheme,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert 
} from '@mui/material';

import { useNavigate } from 'react-router-dom'; 

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 🚨 IMPORTACIÓN REQUERIDA (Necesitas la URL base para el fetch DELETE)
const API_BASE_URL = 'http://localhost:3001/api/v1'; 

// 1. Definición de las constantes
const ROWS_PER_PAGE = 5;

const columns = [
  { id: 'titulo', label: 'Título' },
  { id: 'autor', label: 'Autor' },
  { id: 'genero', label: 'Género' },
  { id: 'nivel_educativo', label: 'Nivel Educativo' },
  { id: 'editar', label: 'Acciones' }, 
];

// 2. Componentes Estilizados (🚨 INCLUÍDOS PARA CORREGIR EL ERROR)
const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '16px', 
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  maxWidth: '1200px',
  width: '100%',
}));

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  color: theme.palette.body?.main || '#4A4C52',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  borderBottom: `2px solid ${theme.palette.grey[200]}`,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  color: '#FFFFFF',
  borderRadius: '8px', 
  padding: '6px',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
}));

// 3. Componente Principal
const BookTable = ({ books = [], isLoading, error, onBookUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate(); 
  
  // Estados de UI (Paginación y Eliminación)
  const [page, setPage] = useState(1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [libroToDeleteId, setLibroToDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Lógica de Paginación
  const pageCount = Math.ceil(books.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };
  
const handleEdit = (libro_id) => {
      console.log(`Editando libro ${libro_id}`);
      navigate(`/libros/editar/${libro_id}`); 
  }
  
  const handleDelete = (libro_id) => {
    setLibroToDeleteId(libro_id);
    setOpenConfirm(true);
  }

  const handleConfirmDelete = async () => {
    if (!libroToDeleteId) return;

    setOpenConfirm(false); 
    setIsDeleting(true); 

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No autenticado. Por favor, inicia sesión.");

        const url = `${API_BASE_URL}/libros/${libroToDeleteId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Fallo la eliminación (HTTP ${response.status})`);
        }
        
        if(onBookUpdate) {
            onBookUpdate(); 
        }
        
        setSnackbar({ 
            open: true, 
            message: `✅ Libro ID ${libroToDeleteId} eliminado exitosamente.`, 
            severity: 'success' 
        });

    } catch (error) {
        setSnackbar({ 
            open: true, 
            message: `❌ Error al eliminar el libro: ${error.message || 'Error desconocido'}`, 
            severity: 'error' 
        });
    } finally {
        setIsDeleting(false); 
        setLibroToDeleteId(null); 
    }
  }

  const handleCloseConfirm = () => {
      setOpenConfirm(false);
      setLibroToDeleteId(null);
  };
  

  //  Renderizado 
  return (
  
    <StyledTableContainer>
      
      <TableContainer>
        <Table stickyHeader aria-label="tabla de libros">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                // 🚨 StyledTableCellHeader ESTÁ DEFINIDO
                <StyledTableCellHeader 
                  key={column.id} 
                  align={column.id === 'editar' ? 'center' : 'left'}
                >
                  {column.label}
                </StyledTableCellHeader>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {/* ... Lógica de carga, error y mapeo de filas ... */}
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                  <CircularProgress size={30} sx={{ color: theme.palette.button?.main || '#f25600' }} />
                  <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
                    {isDeleting ? 'Eliminando libro...' : 'Cargando libros...'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}><Typography variant="subtitle1" color="error">🚨 {error}</Typography></TableCell></TableRow>
            ) : books.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}><Typography variant="subtitle1" color="textSecondary">No se encontraron libros.</Typography></TableCell></TableRow>
            ) : (
              currentBooks.map((row) => (
               
                <TableRow hover role="checkbox" tabIndex={-1} key={row.libro_id || row.id}> 
                  {columns.map((column) => {
                    if (column.id === 'editar') {
                      return (
                        <TableCell key={column.id} align="center"> 
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            {/* 🚨 ActionButton ESTÁ DEFINIDO */}
                            <ActionButton onClick={() => handleEdit(row.libro_id || row.id)} title="Editar">
                              <EditIcon sx={{ fontSize: '1.1rem' }} />
                            </ActionButton>
                            
                            <ActionButton onClick={() => handleDelete(row.libro_id || row.id)} title="Eliminar">
                              <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                            </ActionButton>
                          </Box>
                        </TableCell>
                      );
                    }
                    
                    const value = row[column.id];
                    return (<TableCell key={column.id}> {value} </TableCell>);
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer y Paginación (sin cambios) */}
      {books.length > ROWS_PER_PAGE && !error && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          padding: theme.spacing(2),
          borderTop: `1px solid ${theme.palette.grey[100]}`
        }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            color="primary"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: theme.palette.button?.main || '#f25600',
                color: '#FFFFFF',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: '#cc4800',
                },
              },
              '& .MuiPaginationItem-root': {
                  borderRadius: '20px',
                  margin: '0 4px',
              }
            }}
          />
        </Box>
      )}
      
      {/* Modal de Confirmación y Snackbar */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle color="error">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas eliminar permanentemente el libro con ID **{libroToDeleteId}**? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary" disabled={isDeleting}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus disabled={isDeleting} sx={{ minWidth: '100px' }}>
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </StyledTableContainer>
  );
};

export default BookTable;
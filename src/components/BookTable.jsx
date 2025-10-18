import React, { useState, useEffect } from 'react';
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
  styled,
  useTheme,
  CircularProgress,
} from '@mui/material';

import { useNavigate } from 'react-router-dom'; 

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE_URL } from "../environments/api";

// 1. Definición de las constantes
const ROWS_PER_PAGE = 5;

const columns = [
  { id: 'titulo', label: 'Título' },
  { id: 'autor', label: 'Autor' },
  { id: 'genero', label: 'Género' },
  { id: 'nivel_educativo', label: 'Nivel Educativo' },
  { id: 'editar', label: 'Editar' }, 
];

// 2. Componentes Estilizados (sin cambios)
const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '16px', 
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  margin: theme.spacing(3),
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
const BookTable = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 
  
  //  Estados de datos y UI
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);       

  // Carga de datos
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/v1/libros`)
      .then(res => {
          if (!res.ok) {
              throw new Error(`Error HTTP: ${res.status}`);
          }
          return res.json();
      })
      .then(data => {
        setBooks(Array.isArray(data) ? data : data.libros || []); 
        console.log("Libros cargados:", data);
      })
      .catch(err => {
        console.error("Error cargando libros:", err);
        setError(`Fallo la conexión o la API: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []); 
  
  //  Lógica de Paginación
  const pageCount = Math.ceil(books.length / ROWS_PER_PAGE);

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 

  const handleEdit = (libro_id) => {
      console.log(`Editando libro ${libro_id}`);
      navigate(`/dashboard/libros/editar/${libro_id}`); 
  }
  
  const handleDelete = (libro_id) => console.log(`Eliminando libro ${libro_id}`);

  //  Renderizado
  return (
    <StyledTableContainer>
   
     {/* <Box sx={{ padding: theme.spacing(3), borderBottom: `1px solid ${theme.palette.grey[100]}` }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ color: '#653A1B' }}
        >
          Libros
        </Typography>
      </Box>*/}

      <TableContainer>
        <Table stickyHeader aria-label="tabla de libros">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                  <CircularProgress size={30} sx={{ color: theme.palette.button?.main || '#f25600' }} />
                  <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
                    Cargando libros...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                  <Typography variant="subtitle1" color="error">
                    🚨 {error}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                  <Typography variant="subtitle1" color="textSecondary">
                    No se encontraron libros.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentBooks.map((row) => (
               
                <TableRow hover role="checkbox" tabIndex={-1} key={row.libro_id || row.id}> 
                  {columns.map((column) => {
                    if (column.id === 'editar') {
                      return (
                        <TableCell key={column.id} align="center"> 
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                       
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
                    return (
                      <TableCell key={column.id}> 
                        {value}
                      </TableCell>
                    );
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

    </StyledTableContainer>
  );
};

export default BookTable;
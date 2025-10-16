
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
  styled,
  useTheme,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Datos de Ejemplo para Libros
const ROWS_PER_PAGE = 5;

const books = [
  { id: 1, titulo: 'Cien Años', autor: 'García Márquez', genero: 'Novela', nivelEducativo: 'Superior' },
  { id: 2, titulo: 'El Aleph', autor: 'Borges', genero: 'Cuento', nivelEducativo: 'Media' },
  { id: 3, titulo: 'Don Quijote', autor: 'Cervantes', genero: 'Clásico', nivelEducativo: 'Superior' },
  { id: 4, titulo: 'Rayuela', autor: 'Cortázar', genero: 'Novela', nivelEducativo: 'Superior' },
  { id: 5, titulo: 'Física I', autor: 'Serway', genero: 'Ciencia', nivelEducativo: 'Media' },
  { id: 6, titulo: 'Historia Argentina', autor: 'Pigna', genero: 'Historia', nivelEducativo: 'Básico' },
];

// Definición de las columnas de la tabla de libros
const columns = [
  { id: 'titulo', label: 'Título' },
  { id: 'autor', label: 'Autor' },
  { id: 'genero', label: 'Género' },
  { id: 'nivelEducativo', label: 'Nivel Educativo' },
  { id: 'editar', label: 'Editar' }, // Columna para los botones
];

// 2. Componentes Estilizados (Reutilizados del UserTable)
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

const BookTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(books.length / ROWS_PER_PAGE);

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleEdit = (id) => console.log(`Editando libro ${id}`);
  const handleDelete = (id) => console.log(`Eliminando libro ${id}`);

  return (
    <StyledTableContainer>
      
      {/* Título "Libros" */}
      <Box sx={{ padding: theme.spacing(3), borderBottom: `1px solid ${theme.palette.grey[100]}` }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ color: theme.palette.body?.main || '#4A4C52' }}
        >
          Libros
        </Typography>
      </Box>

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
            {currentBooks.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  if (column.id === 'editar') {
                    return (
                      <TableCell key={column.id} align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <ActionButton onClick={() => handleEdit(row.id)} title="Editar">
                            <EditIcon sx={{ fontSize: '1.1rem' }} />
                          </ActionButton>
                          <ActionButton onClick={() => handleDelete(row.id)} title="Eliminar">
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer y Paginación (omitted for brevity, same as UserTable) */}
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

    </StyledTableContainer>
  );
};

export default BookTable;
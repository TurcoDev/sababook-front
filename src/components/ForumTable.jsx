// src/components/ForumTable.jsx

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

import EditIcon from '@mui/icons-material/Edit'; // Ícono de edición
import DeleteIcon from '@mui/icons-material/Delete'; // Ícono de eliminación

// 1. Datos de Ejemplo para Foros
const ROWS_PER_PAGE = 5;

const forums = [
  { id: 1, titulo: '...', fecha: '10-09-2025', creador: 'Ana García' },
  { id: 2, titulo: '...', fecha: '05-09-2025', creador: 'Pedro López' },
  { id: 3, titulo: '...', fecha: '01-09-2025', creador: 'María Díaz' },
  { id: 4, titulo: '...', fecha: '28-08-2025', creador: 'Javier Ruíz' },
  { id: 5, titulo: '...', fecha: '20-08-2025', creador: 'Laura Pérez' },
];

// Definición de las columnas de la tabla de foros
const columns = [
  { id: 'titulo', label: 'Título' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'creador', label: 'Creador' },
  { id: 'editar', label: 'Editar' }, // Columna para los botones
];

// 2. Componentes Estilizados (Reutilizados de UserTable/BookTable)
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

const ForumTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(forums.length / ROWS_PER_PAGE);

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentForums = forums.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleEdit = (id) => console.log(`Editando foro ${id}`);
  const handleDelete = (id) => console.log(`Eliminando foro ${id}`);

  return (
    <StyledTableContainer>
      
      {/* Título "Foros" */}
      <Box sx={{ padding: theme.spacing(3), borderBottom: `1px solid ${theme.palette.grey[100]}` }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ color: theme.palette.body?.main || '#4A4C52' }}
        >
          Foros
        </Typography>
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="tabla de foros">
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
            {currentForums.map((row) => (
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

      {/* Footer y Paginación (Mismos estilos que las tablas anteriores) */}
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

export default ForumTable;
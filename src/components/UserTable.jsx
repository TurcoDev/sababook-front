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

// Importar los íconos de Material-UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Datos de Ejemplo (Simulación de la API)
const ROWS_PER_PAGE = 5;

const users = [
  { id: 1, nombre: '...', apellido: '...', rol: 'Docente', email: '...', fechaRegistro: '00-00-0000' },
  { id: 2, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
  { id: 3, nombre: '...', apellido: '...', rol: 'Administrador', email: '...', fechaRegistro: '00-00-0000' },
  { id: 4, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
  { id: 5, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
  { id: 6, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
  { id: 7, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
  { id: 8, nombre: '...', apellido: '...', rol: 'Alumno', email: '...', fechaRegistro: '00-00-0000' },
];

// Definición de las columnas de la tabla
const columns = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'apellido', label: 'Apellido' },
  { id: 'rol', label: 'Rol' },
  { id: 'email', label: 'Email' },
  { id: 'fechaRegistro', label: 'Fecha Registro' },
  { id: 'editar', label: 'Editar' }, // Columna para los botones
];

// 2. Componente estilizado para el contenedor de la tabla (la tarjeta redondeada)
const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '16px', // Borde redondeado de la tarjeta exterior
  overflow: 'hidden', // Asegura que el contenido interno respete el borde
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Sombra suave
  margin: theme.spacing(3),
  maxWidth: '1200px',
  width: '100%',
}));

// 3. Estilos del encabezado de la tabla (usando el color body.main de tu tema para el texto)
const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  color: theme.palette.body?.main || '#4A4C52', // Color de texto del encabezado
  fontWeight: 'bold',
  fontSize: '0.9rem',
  borderBottom: `2px solid ${theme.palette.grey[200]}`, // Línea debajo de los headers
}));

// 4. Estilos para los botones de Editar/Eliminar (el ícono naranja)
const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  color: '#FFFFFF',
  borderRadius: '8px', // Borde redondeado de cada ícono-botón
  padding: '6px',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
}));

const UserTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(users.length / ROWS_PER_PAGE);

  // Lógica de paginación
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handlers para los botones de acción
  const handleEdit = (id) => console.log(`Editando usuario ${id}`);
  const handleDelete = (id) => console.log(`Eliminando usuario ${id}`);

  return (
    <StyledTableContainer>
      
      {/* Título "Usuarios" */}
      <Box sx={{ padding: theme.spacing(3), borderBottom: `1px solid ${theme.palette.grey[100]}` }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ color: theme.palette.body?.main || '#4A4C52' }}
        >
          Usuarios
        </Typography>
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="tabla de usuarios">
          
          {/* Encabezado */}
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
          
          {/* Cuerpo de la tabla */}
          <TableBody>
            {currentUsers.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                
                {/* Celdas de datos */}
                {columns.map((column) => {
                  if (column.id === 'editar') {
                    return (
                      <TableCell key={column.id} align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <ActionButton 
                            onClick={() => handleEdit(row.id)}
                            title="Editar"
                          >
                            <EditIcon sx={{ fontSize: '1.1rem' }} />
                          </ActionButton>
                          <ActionButton 
                            onClick={() => handleDelete(row.id)}
                            title="Eliminar"
                          >
                            <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                          </ActionButton>
                        </Box>
                      </TableCell>
                    );
                  }
                  
                  // Renderiza las celdas normales
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

      {/* Footer y Paginación */}
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
          color="primary" // Usa el color primary del tema para los números activos
          sx={{
            // Estilo para coincidir con el diseño naranja/blanco
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: theme.palette.button?.main || '#f25600',
              color: '#FFFFFF',
              borderRadius: '20px', // Borde redondeado de los números activos
              '&:hover': {
                backgroundColor: '#cc4800',
              },
            },
            '& .MuiPaginationItem-root': {
                borderRadius: '20px', // Borde redondeado de todos los números
                margin: '0 4px', // Espacio entre números
            }
          }}
        />
      </Box>

    </StyledTableContainer>
  );
};

export default UserTable;
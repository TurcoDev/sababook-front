import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Button, Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

// --- Datos de simulación ---
const users = [
  { rol: 'Docente' },
  { rol: 'Alumno' },
  { rol: 'Administrador' },
  { rol: 'Alumno' },
  { rol: 'Alumno' },
  { rol: 'Alumno' },
  { rol: 'Alumno' },
  { rol: 'Alumno' },
];
const tableHeaders = ['Nombre', 'Apellido', 'Rol', 'Email', 'Fecha Registro', 'Editar'];

// --- Estilos personalizados (Styled Components) ---
const ActionButton = styled(IconButton)(({ colorType }) => ({
  color: 'white',
  margin: '0 4px',
  padding: '6px',
  backgroundColor: colorType === 'edit' ? '#FF6600' : '#E53935', // Naranja para Editar, Rojo para Eliminar
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: colorType === 'edit' ? '#E05C00' : '#B71C1C',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  // Borde más grueso en el encabezado
  '& th': {
    fontWeight: 'bold',
    borderBottom: `2px solid #ccc`, 
  }
}));

const UserTable = () => {
  return (
    <>
      <Table sx={{ minWidth: 650 }}>
        <StyledTableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>--</TableCell>
              <TableCell>--</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>--</TableCell>
              <TableCell>00-00-0000</TableCell>
              {/* Columna de acciones */}
              <TableCell sx={{ minWidth: 150 }}>
                <ActionButton colorType="edit" aria-label="editar">
                  <EditIcon />
                </ActionButton>
                <ActionButton colorType="delete" aria-label="eliminar">
                  <DeleteIcon />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* PAGINACIÓN */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
        <Pagination
          count={4} 
          defaultPage={1}
          siblingCount={0}
          boundaryCount={0}
          renderItem={(item) => (
            <Button
              {...item}
              sx={{
                minWidth: '35px',
                height: '35px',
                margin: '0 2px',
                // Estilos para replicar el círculo naranja
                backgroundColor: item.selected ? '#FF6600' : 'transparent',
                color: item.selected ? 'white' : 'grey',
                border: item.selected ? 'none' : '1px solid #ccc',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: item.selected ? '#E05C00' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {item.page || item.type}
            </Button>
          )}
        />
      </Box>
    </>
  );
};

export default UserTable;
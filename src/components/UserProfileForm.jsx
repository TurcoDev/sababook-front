import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material'; // ⬅️ ¡Añadidos Avatar e IconButton!
import React from 'react';

// 1. Definimos los avatares aquí, sin el 'export'
const DEFAULT_AVATARS = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
];


// El formulario recibe la función para cambiar el avatar y la URL actual
export default function UserProfileForm({ userName, onCancel, onSave, onAvatarChange, currentAvatarUrl }) {
    
    // Función para manejar el clic en un avatar predeterminado
    const handleAvatarSelect = (url) => {
        onAvatarChange(url); // Llama a la función que actualiza el estado en Profile.jsx
    };
    
    return (
        <Box sx={{ maxWidth: '400px', margin: '0 auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Editar Perfil de {userName}
            </Typography>

            {/* SECCIÓN DE SELECCIÓN DE AVATAR */}
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Selecciona un Avatar:
            </Typography>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1, 
                    justifyContent: 'center', 
                    mb: 3 
                }}
            >
                {DEFAULT_AVATARS.map((url) => (
                    <IconButton 
                        key={url} 
                        onClick={() => handleAvatarSelect(url)}
                        sx={{
                            // Destacamos el avatar seleccionado
                            border: url === currentAvatarUrl ? '3px solid #f25600' : '3px solid transparent',
                            padding: 0,
                        }}
                    >
                        <Avatar 
                            src={url} 
                            sx={{ width: 56, height: 56 }} 
                        />
                    </IconButton>
                ))}
            </Box>

         
            <TextField 
                label="Nombre Completo" 
                defaultValue={userName} 
                fullWidth 
                margin="normal" 
            />
            {/* ... otros campos ... */}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button variant="outlined" onClick={onCancel} fullWidth>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={onSave} color="primary" fullWidth>
                    Guardar Cambios
                </Button>
            </Box>
        </Box>
    );
}
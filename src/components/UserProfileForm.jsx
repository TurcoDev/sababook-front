import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';

// Definimos los avatares predeterminados
const DEFAULT_AVATARS = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
];

export default function UserProfileForm({ 
  userName, 
  userEmail, 
  currentAvatarUrl, 
  onCancel, 
  onSave, 
  onAvatarChange 
}) {
    const [formData, setFormData] = useState({
        nombre: userName || '',
        email: userEmail || '',
        avatar_url: currentAvatarUrl || DEFAULT_AVATARS[0]
    });
    
    // Función para manejar el clic en un avatar predeterminado
    const handleAvatarSelect = (url) => {
        setFormData(prev => ({ ...prev, avatar_url: url }));
        if (onAvatarChange) {
            onAvatarChange(url);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
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
                            border: url === formData.avatar_url ? '3px solid #f25600' : '3px solid transparent',
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

            {/* CAMPOS DEL FORMULARIO */}
            <TextField 
                label="Nombre Completo" 
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                fullWidth 
                margin="normal" 
            />

            <TextField 
                label="Correo Electrónico" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                fullWidth 
                margin="normal"
                type="email"
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button variant="outlined" onClick={onCancel} fullWidth>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="primary" fullWidth>
                    Guardar Cambios
                </Button>
            </Box>
        </Box>
    );
}
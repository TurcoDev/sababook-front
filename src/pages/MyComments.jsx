import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar 
} from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppHeader from '../components/AppHeader';
import SideMenu from '../components/SideMenu';
import SearchBar from '../components/SearchBar';

// Data simulada de comentarios
const COMMENT_DATA = [
    { id: 1, title: "La Resistencia", author: "Ernesto Sabato", image: "/path/to/book1.jpg" },
    { id: 2, title: "La campana de cristal", author: "Silvia Plath", image: "/path/to/book2.jpg" },
    { id: 3, title: "Apologías y rechazos", author: "Ernesto Sabato", image: "/path/to/book3.jpg" },
];

// Componente para una fila de comentario
const CommentItem = ({ title, author, image }) => (
    <Box 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            py: 1.5, 
            px: 2, 
            borderBottom: '1px solid #eee' 
        }}
    >
        {/* Información del Libro y Autor */}
        <Box display="flex" alignItems="center" flexGrow={1}>
            <Avatar 
                src={image} 
                variant="rounded" 
                sx={{ width: 45, height: 60, mr: 2, border: '1px solid #ddd' }} 
            />
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </Box>
        </Box>

        {/* Botones de Acción */}
        <Box display="flex" gap={1}>
            <IconButton sx={{ bgcolor: '#f25600', color: '#fff', '&:hover': { bgcolor: 'orange.700' } }}>
                <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ bgcolor: '#f25600', color: '#fff', '&:hover': { bgcolor: 'orange.700' } }}>
                <EditIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ bgcolor: '#f25600', color: '#fff', '&:hover': { bgcolor: 'orange.700' } }}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    </Box>
);

export default function MyComments() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleSearch = (query) => console.log("Buscando comentarios:", query);

    return (
        <Box
            py={2}
            px={1}
            sx={{
                width: '100%',
                maxWidth: 1000,
                margin: "0 auto",
            }}
        >
            {/* Header de la Aplicación */}
            <AppHeader
                onMenuClick={() => setMenuOpen(true)}
                title="Mis Comentarios" 
                subtitle="Bienvenida, Lucía"
            />
            
            {/* Menú Lateral */}
            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Comentarios" />

            {/* SearchBar */}
            <Box mb={2}>
                <SearchBar onSearch={handleSearch} />
            </Box>
            
            {/* Título de la Sección */}
            <Typography variant="h5" fontWeight="bold" color="text.primary" mt={3} mb={2}>
                Mis Comentarios
            </Typography>

            {/* Lista de Comentarios */}
            <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0,0,0,0.08)' }}>
                {COMMENT_DATA.map(item => (
                    <CommentItem 
                        key={item.id} 
                        title={item.title} 
                        author={item.author} 
                        image={item.image} 
                    />
                ))}
            </Box>

        </Box>
    );
}
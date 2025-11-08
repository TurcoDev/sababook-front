import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Avatar
} from "@mui/material";

import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AppHeader from '../components/AppHeader';
import SideMenu from '../components/SideMenu';
import SearchBar from '../components/SearchBar';

// 🔹 Datos simulados de publicaciones del foro
const INITIAL_FORUM_POSTS = [
    { id: 1, title: "¿Cuál es tu autor favorito de ciencia ficción?", author: "Ana Torres", category: "Literatura", image: "/assets/forum1.jpg" },
    { id: 2, title: "Consejos para escribir tu primera novela", author: "Carlos Gómez", category: "Escritura", image: "/assets/forum2.jpg" },
    { id: 3, title: "Club de lectura: '1984' de George Orwell", author: "María Pérez", category: "Club de Lectura", image: "/assets/forum3.jpg" },
];

// 🔹 Componente para una publicación del foro
const ForumItem = ({ id, title, author, category, image, onView, onEdit, onDelete }) => (
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
        {/* Información del tema */}
        <Box display="flex" alignItems="center" flexGrow={1}>
            <Avatar
                src={image}
                variant="rounded"
                sx={{ width: 45, height: 45, mr: 2, border: '1px solid #ddd' }}
            />
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author} — {category}
                </Typography>
            </Box>
        </Box>

        {/* Botones de acción */}
        <Box display="flex" gap={1}>
            <IconButton
                onClick={() => onView(id)}
                sx={{ bgcolor: '#007BFF', color: '#fff', '&:hover': { bgcolor: '#0056b3' } }}
            >
                <VisibilityIcon fontSize="small" />
            </IconButton>

            <IconButton
                onClick={() => onEdit(id)}
                sx={{ bgcolor: '#28a745', color: '#fff', '&:hover': { bgcolor: '#1e7e34' } }}
            >
                <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
                onClick={() => onDelete(id, title)}
                sx={{ bgcolor: '#dc3545', color: '#fff', '&:hover': { bgcolor: '#a71d2a' } }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    </Box>
);

export default function MyForums() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [posts, setPosts] = useState(INITIAL_FORUM_POSTS);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [postTitle, setPostTitle] = useState('');

    const handleSearch = (query) => console.log("Buscando publicaciones:", query);

    // --- MANEJO DE ACCIONES ---

    const handleViewPost = (id) => {
        navigate(`/foro/${id}`);
        console.log(`Navegando a ver publicación ${id}`);
    };

    const handleEditPost = (id) => {
        navigate(`/foro/editar/${id}`);
        console.log(`Navegando a editar publicación ${id}`);
    };

    const handleDeleteClick = (id, title) => {
        setPostToDelete(id);
        setPostTitle(title);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDialogOpen(false);
        if (postToDelete !== null) {
            console.log(`Eliminando publicación con ID: ${postToDelete}`);
            setPosts(prev => prev.filter(post => post.id !== postToDelete));
            setPostToDelete(null);
            setPostTitle('');
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setPostToDelete(null);
        setPostTitle('');
    };

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
            <AppHeader
                onMenuClick={() => setMenuOpen(true)}
                title="MyForum"
                subtitle="Tu espacio para debatir, compartir y aprender."
            />

            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Foro" />

            <Box mb={2}>
                <SearchBar onSearch={handleSearch} />
            </Box>

            <Typography variant="h5" fontWeight="bold" color="text.primary" mt={3} mb={2}>
                Mis Publicaciones
            </Typography>

            {/* Lista de publicaciones */}
            <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0,0,0,0.08)' }}>
                {posts.map(item => (
                    <ForumItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        author={item.author}
                        category={item.category}
                        image={item.image}
                        onView={handleViewPost}
                        onEdit={handleEditPost}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </Box>

            {/* Diálogo de confirmación de eliminación */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Deseas eliminar la publicación "{postTitle}"?
                        Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: '#4b2c15' }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        autoFocus
                        variant="contained"
                        sx={{ bgcolor: '#dc3545', '&:hover': { bgcolor: '#a71d2a' } }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

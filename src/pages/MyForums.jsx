import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../environments/api';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Avatar
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ForumIcon from "@mui/icons-material/Forum";

import AppHeader from "../components/AppHeader";
import SideMenu from "../components/SideMenu";
import SearchBar from "../components/SearchBar";

export default function MyForum() {
    const navigate = useNavigate();
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [foroToDelete, setForoToDelete] = useState(null);
    const [foroTitle, setForoTitle] = useState("");

    // 🔹 Fetch foros desde backend
    useEffect(() => {
        const fetchForos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/foro`);
                if (!response.ok) throw new Error("Error al cargar los foros");
                const data = await response.json();
                setForos(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchForos();
    }, []);

    // 🔹 Funciones de acciones
    const handleViewForo = (id) => {
        navigate(`/foro/${id}`);
    };

    const handleEditForo = (id) => {
        navigate(`/foro/editar/${id}`);
    };

    const handleDeleteClick = (id, title) => {
        setForoToDelete(id);
        setForoTitle(title);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDialogOpen(false);
        if (foroToDelete !== null) {
            setForos(prev => prev.filter(foro => foro.foro_id !== foroToDelete));
            setForoToDelete(null);
            setForoTitle("");
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setForoToDelete(null);
        setForoTitle("");
    };

    const handleSearch = (query) => {
        console.log("Buscando foros:", query);
    };

    // 🔹 Componente para cada foro
    const ForoItem = ({ foro }) => (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1.5,
                px: 2,
                borderBottom: "1px solid #eee",
            }}
        >
            <Box display="flex" alignItems="center" flexGrow={1}>
                <Avatar
                    variant="rounded"
                    sx={{
                        width: 45,
                        height: 45,
                        mr: 2,
                        border: "1px solid #ddd",
                        bgcolor: "#f0f0f0",
                    }}
                >
                    <ForumIcon />
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {foro.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {foro.descripcion}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex" gap={1}>
                <IconButton
                    onClick={() => handleViewForo(foro.foro_id)}
                    sx={{ bgcolor: "#007BFF", color: "#fff", "&:hover": { bgcolor: "#0056b3" } }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={() => handleEditForo(foro.foro_id)}
                    sx={{ bgcolor: "#28a745", color: "#fff", "&:hover": { bgcolor: "#1e7e34" } }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );

    return (
        <Box py={2} px={1} sx={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
            <AppHeader
                onMenuClick={() => setMenuOpen(true)}
                title="Foros"
                subtitle="Tu espacio para debatir, compartir y aprender."
            />

            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Foro" />

            <Box mb={2}>
                <SearchBar onSearch={handleSearch} />
            </Box>

            <Typography variant="h5" fontWeight="bold" color="text.primary" mt={3} mb={2}>
                Foros
            </Typography>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && !error && foros.length === 0 && (
                <Typography>No hay foros disponibles</Typography>
            )}

            <Box sx={{ bgcolor: "#ffffff", borderRadius: 2, boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}>
                {foros.map(foro => (
                    <ForoItem key={foro.foro_id} foro={foro} />
                ))}
            </Box>

            {/* Diálogo de confirmación */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Deseas eliminar el foro "{foroTitle}"? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: "#4b2c15" }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        autoFocus
                        variant="contained"
                        sx={{ bgcolor: "#dc3545", "&:hover": { bgcolor: "#a71d2a" } }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

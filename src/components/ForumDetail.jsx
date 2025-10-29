import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Divider, CircularProgress } from "@mui/material";

const ForumDetail = ({ foroId, onClose }) => {
    const [foro, setForo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/foro/${foroId}/comentarios`);
                const data = await res.json();
                setForo(data);
            } catch (err) {
                console.error("Error al obtener foro:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchForo();
    }, [foroId]);

    if (loading) return <CircularProgress />;
    if (!foro) return <Typography>No se encontró el foro.</Typography>;

    return (
        <Box sx={{ p: 3, width: "600px", background: "#fff", borderRadius: "8px" }}>
            <Typography variant="h5" fontWeight="bold">{foro.titulo}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                Creado por {foro.creador_nombre}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{foro.descripcion}</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>💬 Comentarios</Typography>
            {foro.comentarios.length === 0 ? (
                <Typography>No hay comentarios todavía.</Typography>
            ) : (
                foro.comentarios.map((c) => (
                    <Box key={c.comentario_id} sx={{ display: "flex", mb: 2 }}>
                        <Avatar src={c.usuario_avatar} sx={{ mr: 2 }} />
                        <Box>
                            <Typography fontWeight="bold">{c.usuario_nombre}</Typography>
                            <Typography>{c.contenido}</Typography>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ForumDetail;

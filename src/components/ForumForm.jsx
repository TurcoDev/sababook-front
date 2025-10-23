// src/components/ForumForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';

const ForumForm = ({ onSave, onCancel }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo || !descripcion) return;

        const nuevoForo = {
            titulo,
            descripcion,
        };

        onSave(nuevoForo);
    };

    return (
        <Paper sx={{ p: 4, width: 400 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    required
                    sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ForumForm;
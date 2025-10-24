import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, Divider, Chip, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';

import NavButton from '../components/NavButton';
import AppHeader from '../components/AppHeader';
import { API_BASE_URL } from '../environments/api';

const ORANGE_COLOR = '#FF6633';

const BookDetailsPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); //se agrega
  const navigate = useNavigate();

    useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
        setUser({ nombre: storedName }); // lo guardamos como objeto
    }
    }, []);


    useEffect(() => {

 setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/libros/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el libro.');
        return res.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const authorStyle = {
    fontWeight: 900,
    fontSize: '1.5rem',
    lineHeight: 1,
    textTransform: 'uppercase',
    mb: 0.5,
    color: theme.palette.text.primary,
  };

  const ratingTextStyle = {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: 1,
  };

  const handleCommentClick = () => console.log(`Comentar para libro ID: ${id}`);
  const handleViewCommentsClick = () => navigate(`/book/${id}/comments`);
  const handleMenuToggle = () => console.log("Abrir SideMenu");

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No se encontró el libro.</div>;

  // Validar URL imagen para evitar src=""
  const coverImageSrc = book.coverImage?.trim() || book.portada_url?.trim() || null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.common.white,
        p: 2,
        maxWidth: 1000,
        margin: '0 auto',
        boxShadow: theme.shadows[10],
      }}
    >
      
       <AppHeader
        onMenuClick={handleMenuToggle}
        title={`Bienvenida, ${user?.nombre || "Usuario"}`}
        subtitle={book.date || "Fecha desconocida"}
        />

      <Box sx={{ pt: 0 }}>
        <Box display="flex" alignItems="flex-start" gap={2} mb={3}>
          <Box sx={{ position: 'relative' }}>
            {coverImageSrc ? (
              <Box
                component="img"
                src={coverImageSrc}
                alt={`Cubierta de ${book.title || book.titulo}`}
                sx={{
                  width: '100px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: `2px solid #D32F2F`,
                  boxShadow: theme.shadows[4],
                }}
              />
            ) : null}
          </Box>

          <Box flexGrow={1} textAlign="left" pt={1}>
            <Typography sx={authorStyle}>
              {book.author || book.autor}
            </Typography>
            <Typography variant="h6" color="text.primary" sx={{ mb: 0.5 }}>
              {book.title || book.titulo}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={book.status || `${book.progress || "0"}%`}
                size="small"
                sx={{
                  fontWeight: 'bold',
                  bgcolor: theme.palette.grey[200],
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="left" mb={2}>
          <Box display="flex" alignItems="flex-end" gap={1}>
            <Typography sx={ratingTextStyle}>
              {(book.rating || 0).toFixed(1)}
            </Typography>
            <Rating
              value={book.rating || 0}
              precision={0.1}
              readOnly
              icon={<StarIcon sx={{ color: ORANGE_COLOR }} />}
              emptyIcon={<StarIcon sx={{ color: theme.palette.grey[300] }} />}
              size="small"
              sx={{ mb: 0.5 }}
            />
          </Box>

          <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" sx={{ mt: 0.5 }}>
            Calificación Promedio
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            ¿Qué piensan?
          </Typography>
        </Box>

        <NavButton
          onClick={handleCommentClick}
          variant="contained"
          sx={{
            width: '100%',
            m: '0 0 3px 0 !important',
            p: '12px 20px',
            bgcolor: ORANGE_COLOR + ' !important',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px !important',
            boxShadow: `0 4px 10px rgba(255, 102, 51, 0.4)`,
            '&:hover': { bgcolor: '#cc4800' + ' !important' },
          }}
        >
          Comentar
        </NavButton>

        <Divider sx={{ my: 3 }} />
        <Box textAlign="left" mt={2}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Descripción</Typography>
          <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 3 }}>
            {book.description || book.descripcion}
          </Typography>

          <Box sx={{
            p: 1.5, my: 3, borderRadius: '12px', bgcolor: theme.palette.common.white,
            border: `1px solid ${theme.palette.grey[300]}`, boxShadow: 'none',
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" fontWeight="bold">Pablo</Typography>
                <Typography variant="caption" color="text.secondary">Docente</Typography>
              </Box>
              <Rating value={5} readOnly size="small" />
            </Box>
            <Typography variant="body2" mt={1} sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
              "Un libro sensible, para pensar..."
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  color: ORANGE_COLOR,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                }}
              >
                Comentario destacado
              </Typography>
            </Box>
          </Box>

          <NavButton
            onClick={handleViewCommentsClick}
            variant="outlined"
            sx={{
              width: '100%',
              mt: 3, p: '12px 20px',
              m: '0 0 0 0 !important',
              borderColor: ORANGE_COLOR + ' !important',
              color: ORANGE_COLOR + ' !important',
              fontWeight: 'bold',
              bgcolor: theme.palette.common.white + ' !important',
              borderRadius: '8px !important',
              boxShadow: `0 2px 5px rgba(255, 102, 51, 0.1)`,
              '&:hover': {
                bgcolor: theme.palette.grey[50] + ' !important',
                borderColor: ORANGE_COLOR + ' !important',
              },
            }}
          >
            Ver todos los comentarios
          </NavButton>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetailsPage;
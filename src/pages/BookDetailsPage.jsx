import React, { useState } from "react";
import { Box, Divider, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import AppHeader from "../components/AppHeader";
import NavButton from "../components/NavButton";
import { useAuth } from "../hooks/useAuth";
import { useBookDetails } from "../hooks/useBookDetails";
import { useBookOpinion } from "../hooks/useBookOpinion";
import BookDetailsHeader from "../components/BookDetailsHeader";
import BookRatingSection from "../components/BookRatingSection";
import BookCommentBox from "../components/BookCommentBox";
import BookOpinionList from "../components/BookOpinionList";
import BookDescription from "../components/BookDescription";

const ORANGE_COLOR = "#FF6633";

const BookDetailsPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);


  // Cargar detalles del libro
  // TODO: Esto podria obtenerse del componente padre y evitariamos otra llamada
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/libros/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el libro.');
        return res.json();
      })
      .then(data => {
        setBook(data);
        console.log(data);

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Cargar opiniones del libro
  useEffect(() => {
    if (!id) return;
    let ignore = false; // 🔸 evita ejecuciones duplicadas en modo desarrollo

    const fetchOpinions = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/opinion/libro/${id}`);
        const data = await res.json();
        if (!ignore) {
          setOpinions(data);
          console.log('Opiniones cargadas:', data);
        }
      } catch (err) {
        console.error('Error cargando opiniones:', err);
        if (!ignore) {
          console.log('Opiniones cargadas (mock):', opinions);
        }
      }
    };

    fetchOpinions();

    return () => {
      ignore = true; // 🔸 limpia el efecto cuando se desmonta o React re-renderiza
    };
  }, [id]);


  const { book, loading, error } = useBookDetails(id);
  const { opinions, setOpinions } = useBookOpinion(id);

  const authorStyle = {
    fontWeight: 900,
    fontSize: "1.5rem",
    lineHeight: 1,
    textTransform: "uppercase",
    mb: 0.5,
    color: theme.palette.text.primary,
  };

  const handleCommentClick = () => setShowCommentBox(!showCommentBox);
  const handleViewCommentsClick = () => navigate(`/book/${id}/comments`);
  const handleMenuToggle = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No se encontró el libro.</div>;

  const coverImageSrc = book.coverImage?.trim() || book.portada_url?.trim() || null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        minHeight: "100vh",
        margin: "0 auto",
        py: 2,
        px: 1,
        backgroundColor: theme.palette.common.white,
      }}
    >
      <AppHeader
        onMenuClick={handleMenuToggle}
        title="Detalles del libro"
        subtitle="Descubrí su esencia y su autor"
      />
    </Box>
  </Box>
</Box>


        

        <Box textAlign="left" mb={2}>
          

          
        </Box>

        

        {showCommentBox && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: '12px',
              bgcolor: theme.palette.grey[100],
              border: `1px solid ${theme.palette.grey[300]}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" mb={1}>
              Escribe tu opinión
            </Typography>
            <Rating
              value={newRating}
              onChange={(e, newValue) => setNewRating(newValue)}
              sx={{ mb: 1 }}
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '8px',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.grey[300]}`,
                resize: 'none',
              }}
            />
            <NavButton
              onClick={async () => {
                if (!newComment.trim() || newRating === 0) {
                  alert('Por favor, escribe un comentario y selecciona una calificación.');
                  return;
                }


                const payload = {
                  libro_id: Number(id),
                  usuario_id: user.usuario_id, // debe existir user.id con el id numérico
                  calificacion: newRating,
                  comentario: newComment,
                };


                try {
                  const token = localStorage.getItem('token');
                  if (!token) throw new Error("No autenticado.");
                  const res = await fetch(`${API_BASE_URL}/api/v1/opinion`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                  });

                  if (!res.ok) throw new Error('Error al guardar el comentario.');

                  const savedOpinion = await res.json();

                  // ✅ Inyectar datos del usuario actual para mostrar el nombre inmediatamente
                  const opinionConUsuario = {
                    ...savedOpinion,
                    usuario: {
                      nombre: user?.nombre || "Usuario",
                      rol: user?.rol || "Usuario",
                    },
                  };

                  setOpinions((prev) => [opinionConUsuario, ...prev]);
                  setNewComment('');
                  setNewRating(0);
                  setShowCommentBox(false);
                } catch (err) {
                  console.error(err);
                  alert('No se pudo guardar el comentario.');
                }
              }}
              sx={{
                mt: 2,
                width: '100%',
                bgcolor: ORANGE_COLOR + ' !important',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px !important',
                '&:hover': { bgcolor: '#cc4800' + ' !important' },
              }}
            >
              Publicar comentario
            </NavButton>
          </Box>
        )}

      <SideMenu open={menuOpen} onClose={handleMenuClose} active="Inicio" />

      <Box sx={{ pt: 0 }}>
        <BookDetailsHeader book={book} coverImageSrc={coverImageSrc} authorStyle={authorStyle} />
        <Divider sx={{ my: 3 }} />
        <BookRatingSection book={book} theme={theme} />

        <NavButton
          onClick={handleCommentClick}
          variant="contained"
          sx={{
            width: "100%",
            p: "12px 20px",
            bgcolor: ORANGE_COLOR + " !important",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px !important",
            boxShadow: `0 4px 10px rgba(255, 102, 51, 0.4)`,
            "&:hover": { bgcolor: "#cc4800 !important" },
          }}
        >
          Comentar
        </NavButton>

        {showCommentBox && (
          <BookCommentBox
            theme={theme}
            id={id}
            user={user}
            newRating={newRating}
            newComment={newComment}
            setNewRating={setNewRating}
            setNewComment={setNewComment}
            setShowCommentBox={setShowCommentBox}
            setOpinions={setOpinions}
          />
        )}
        <Divider sx={{ my: 3 }} />
            <BookDescription book={book} />

            <BookOpinionList
              opinions={opinions}
              theme={theme}
              handleViewCommentsClick={handleViewCommentsClick}
            />
      </Box>
    </Box>
  );
};

export default BookDetailsPage;

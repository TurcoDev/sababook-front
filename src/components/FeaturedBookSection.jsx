import { Box, Typography } from "@mui/material";
import BookCard from "./BookCard";
import LibroImage from '../assets/libro.jpg'

export default function FeaturedBookSection({ featuredBook, handleFavoriteToggle, handleVerMas }) {
  
  const bookId = featuredBook.id || featuredBook.libro_id;

  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="secondary" mb={1}>
        Recomendado semanal
      </Typography>

      <Box display="flex" justifyContent="left" mt={2} mb={3}>
        <BookCard
          featured
          image={featuredBook.portada_url || LibroImage}
          title={featuredBook.titulo}
          rating={featuredBook.calificacion_promedio || featuredBook.rating}
          isFavorite={featuredBook.isFavorite}
          onFavoriteToggle={() =>
            bookId && handleFavoriteToggle(bookId, true)
          }
          bookId={bookId}
          libro_id={featuredBook.libro_id}
          onVerMas={() => handleVerMas(bookId)}
        />
      </Box>
    </>
  );
}
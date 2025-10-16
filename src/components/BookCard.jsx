import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Chip,
  Button,
  Box,
  IconButton,
} from "@mui/material";


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Define un valor para el padding horizontal que será común para el contenido
const HORIZONTAL_PADDING = 2; // (Equivale a 16px en el tema de Material-UI)

export default function BookCard({
  image,
  title,
  autor,
  gender,
  description,
  rating,
  progress,
  featured = false,
  isFavorite = false,
  onFavoriteToggle,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        bgcolor: "#fff",
        px: 3,
        py: 1.5,
        maxWidth: featured ? 500 : 320,
        minWidth: featured ? 400 : 300,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
        },
        mb: 2,
      }}
    >

      <Box
        sx={{
          position: 'relative',
          width: featured ? 145 : 110,
          height: featured ? 200 : 155,
          mr: 2,
        }}
      >

        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        <IconButton
          aria-label="Toggle favorite"
          onClick={onFavoriteToggle}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            p: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          }}
        >

          {isFavorite ? (
            <FavoriteIcon
              fontSize="small"
              sx={{ color: 'red' }}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              sx={{ color: 'red' }}
            />
          )}
        </IconButton>
      </Box>

      <CardContent
        sx={{
          flex: 1,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >

        <Box sx={{
          px: HORIZONTAL_PADDING,
          pt: 1,
          pb: 1,
        }}>
          <Typography
            variant={featured ? "h5" : "subtitle1"}
            fontWeight="bold"
            sx={{ mb: 0.5 }}
          >
            {title}
          </Typography>
          {/* Agrega autor, género y descripción */}
          {autor && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              <b>Autor:</b> {autor}
            </Typography>
          )}
          {gender && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              <b>Género:</b> {gender}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {description}
            </Typography>
          )}
          <Rating
            value={rating ?? 0}
            precision={0.5}
            readOnly
            size={featured ? "medium" : "small"}
          />
          <Typography
            variant="h6"
            color="subtitle"
            fontWeight="bold"
            sx={{ mt: 0.2, mb: 1 }}
          >
            {rating?.toFixed(1)}
          </Typography>
          <Box mt={1}>
            <Chip
              label={`${progress ?? 0}%`}
              color="primary"
              size="small"
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 'auto',
            px: HORIZONTAL_PADDING,
            pt: 1,
            pb: 0,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f25600",
              textTransform: "none",
              fontSize: featured ? "0.9rem" : "0.8rem",
              borderRadius: 2,
            }}
          >
            Ver más
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
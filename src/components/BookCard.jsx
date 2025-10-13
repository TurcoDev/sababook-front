import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Chip,
  Button,
  Box,
} from "@mui/material";

// Define un valor para el padding horizontal que será común para el contenido
const HORIZONTAL_PADDING = 2; // (Equivale a 16px en el tema de Material-UI)

export default function BookCard({
  image,
  title,
  rating,
  progress,
  featured = false, // si es true → se usa para el recomendado semanal
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
      {/* Imagen del libro */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: featured ? 145 : 110,
          height: featured ? 200 : 155,
          borderRadius: 2,
          objectFit: "cover",
          mr: 2,
        }}
      />

      {/* Contenido a la derecha */}
      <CardContent
        sx={{
          flex: 1,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Bloque para el Contenido Superior (Título, Rating, Chip) */}
        <Box sx={{
          px: HORIZONTAL_PADDING,
          pt: 1,
          pb: 1, 
        }}>
          <Typography
            variant={featured ? "h6" : "subtitle1"}
            fontWeight="bold"
            sx={{ mb: 0.5 }}
          >
            {title}
          </Typography>

          <Rating
            value={rating}
            precision={0.5}
            readOnly
            size={featured ? "medium" : "small"}
          />
          <Typography
            variant="body2"
            color="body"
            sx={{ mt: 0.2, mb: 1 }}
          >
            {rating.toFixed(1)}
          </Typography>
          <Box mt={1}>
            <Chip
              label={`${progress}% leído`}
              color="primary"
              size="small"
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>
        </Box>


        {/* Bloque para el Botón (Usa mt: 'auto' para irse al fondo) */}
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
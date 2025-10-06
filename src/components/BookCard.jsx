import { Card, CardMedia, CardContent, Typography, Button, Rating, Box, Chip } from "@mui/material";

export default function BookCard({ image, title, rating, progress }) {
  return (
    <Card sx={{ display: "flex", alignItems: "center", mb: 2, p: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 80, borderRadius: 2 }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" color="body" fontWeight="bold">{title}</Typography>
        <Rating value={rating} precision={0.5} readOnly size="small" />
        <Box mt={1}>
          <Chip label={`${progress}%`} color="button" size="small" />
        </Box>
        <Button variant="contained" sx={{ mt: 1, bgcolor: "#f25600" }}>
          Ver más
        </Button>
      </CardContent>
    </Card>
  );
}

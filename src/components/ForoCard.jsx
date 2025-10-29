import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import {
  CardMedia,
  Rating,
  Chip,
  Box,
  IconButton,
} from "@mui/material";

const ForoCard = ({ foro }) => {
  return (
    <Card
        sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        bgcolor: "#ffffff",
        px: 3,
        py: 1.5,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
        },
        mb: 2,
      }} >
      <CardContent>
        <Typography
          variant="h6"
          >
          {foro.titulo}
          </Typography>
        <Typography variant="body2" color="textSecondary">
          {foro.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/foro/${foro.id}`}>Ver detalles</Button>
      </CardActions>
    </Card>
  );
};

export default ForoCard;

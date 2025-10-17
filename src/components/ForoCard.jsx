import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ForoCard = ({ foro }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{foro.titulo}</Typography>
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

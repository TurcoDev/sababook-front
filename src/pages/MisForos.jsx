import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import ForoCard from '../components/ForoCard';

const MisForos = () => {
  const [foros, setForos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asegúrate de usar la URL correcta de tu backend
    fetch('http://localhost:3000/api/foros/mios') // cambia esta URL según tu backend
      .then(res => res.json())
      .then(data => {
        setForos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener los foros:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mis Foros</Typography>
      <Grid container spacing={2}>
        {foros.map((foro) => (
          <Grid item xs={12} sm={6} md={4} key={foro.id}>
            <ForoCard foro={foro} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MisForos;

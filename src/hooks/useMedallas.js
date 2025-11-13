import { useState, useEffect } from 'react';
import { getMedallasUsuario } from '../services/apiService';

const useMedallas = (userId) => {
  const [medallas, setMedallas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchMedallas = async () => {
      try {
        setLoading(true);
        const data = await getMedallasUsuario(userId);
        setMedallas(data);
      } catch (err) {
        console.error('Error fetching medallas:', err);
        setError(err.message);
        // Fallback: mostrar medallas hardcodeadas si la API falla
        setMedallas([
          { id: 1, nombre: 'Crítico Literario' },
          { id: 2, nombre: 'Comentarista Apasionado' },
          { id: 3, nombre: 'Fan de Libros' },
          { id: 4, nombre: 'Pionero de la Novedad' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedallas();
  }, [userId]);

  return { medallas, loading, error };
};

export default useMedallas;
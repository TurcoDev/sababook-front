import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environments/api";

export const useForumComments = (foroId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!foroId) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/comentario/${foroId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar comentarios del foro.");
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [foroId]);

  return { comments, loading, error };
};

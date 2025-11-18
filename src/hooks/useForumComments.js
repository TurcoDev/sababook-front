import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environments/api";

export const useForumComments = (foroId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("➡️ useForumComments MONTADO con foroId:", foroId);

  const fetchComments = async () => {
    console.log("🔄 Fetching comments for forum:", foroId);

    if (!foroId) {
      console.log("⛔ No hay foroId, abortando fetch.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/comentario/${foroId}`);
      console.log("📥 Respuesta comentarios:", res);

      if (!res.ok) {
        console.log("❌ Error HTTP comentarios:", res.status);
        throw new Error("Error al cargar comentarios del foro.");
      }

      const data = await res.json();
      console.log("🟢 Comentarios obtenidos:", data);

      setComments(data);
    } catch (err) {
      console.error("🚨 ERROR FETCH COMENTARIOS:", err);
      setError(err.message);
      setComments([]);
    } finally {
      setLoading(false);
      console.log("✔️ Finalizó carga comentarios");
    }
  };

  useEffect(() => {
    console.log("🔁 useEffect disparado por cambio en foroId");
    fetchComments();
  }, [foroId]);

  return { comments, loading, error, refetch: fetchComments };
};
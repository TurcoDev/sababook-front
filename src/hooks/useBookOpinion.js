import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environments/api";

export const useBookOpinion = (id) => {
  const [opinions, setOpinions] = useState([]);
  
  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/api/v1/opinion/libro/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOpinions(data);
      })
      .catch((err) => {
        console.error("Error cargando opiniones:", err);
      });
  }, [id]);

  return { opinions, setOpinions };
};

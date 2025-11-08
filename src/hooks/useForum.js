import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environments/api";

export const useForums = () => {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/v1/foro/`)
            .then((res) => res.json())
            .then((data) => {
                setForums(data);
            })
            .catch((err) => {
                console.error("Error cargando foros:", err);
            });
    }, []);

    return { forums, setForums };
};

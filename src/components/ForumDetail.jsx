import { useEffect, useState } from "react";
import { API_BASE_URL } from "../environments/api";

const ForumDetail = ({ foroId, onClose }) => {
    const [foro, setForo] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchForo = async () => {
        if (!foroId) return;

        try {
            setLoading(true);
            setError(null);

            // Traer foro
            const resForo = await fetch(`${API_BASE_URL}/api/v1/foro/${foroId}`);
            if (!resForo.ok) {
                if (resForo.status === 404) {
                    onClose(); // cerrar detalle si no existe
                    return;
                }
                throw new Error("Error al cargar el foro");
            }
            const dataForo = await resForo.json();
            setForo(dataForo);

            // Traer comentarios
            const resComentarios = await fetch(`${API_BASE_URL}/api/v1/foro/${foroId}/comentarios`);
            if (!resComentarios.ok) {
                if (resComentarios.status === 404) {
                    setComentarios([]); // no hay comentarios
                } else {
                    throw new Error("Error al cargar comentarios");
                }
            } else {
                const dataComentarios = await resComentarios.json();
                setComentarios(dataComentarios || []);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForo();
    }, [foroId]);

    if (!foroId) return null;

    if (loading) return <p>Cargando foro...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>{foro?.titulo || "Foro sin título"}</h2>
            <p>{foro?.descripcion || "Sin descripción"}</p>
            <p><strong>Creador:</strong> {foro?.creador?.nombre || "Desconocido"}</p>

            <h3>Comentarios ({comentarios?.length || 0})</h3>
            {comentarios?.length > 0 ? (
                <ul>
                    {comentarios.map((c) => (
                        <li key={c.id}>
                            <strong>{c.autor?.nombre || "Anonimo"}:</strong> {c.texto}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay comentarios aún.</p>
            )}

            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default ForumDetail;

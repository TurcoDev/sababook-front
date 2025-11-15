import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../environments/api";

export function useFavoriteActions() {
  const { user } = useAuth() || {};

  // Agregar libro a favoritos
  const addFavorite = async (libro_id) => {
    if (!user?.token) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ libro_id }),
      });
      if (!res.ok) throw new Error("Error al agregar favorito");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // Eliminar libro de favoritos
  const removeFavorite = async (libro_id) => {
    if (!user?.token) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ libro_id }),
      });
      if (!res.ok) throw new Error("Error al eliminar favorito");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return { addFavorite, removeFavorite };
}

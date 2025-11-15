import { useEffect } from "react";
import { API_BASE_URL } from "../environments/api";
import { useAuth } from "./useAuth";

export function useFavorites(featuredBook, setFeaturedBook) {

  const { token } = useAuth() || {};

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/api/v1/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener favoritos");
        const data = await res.json();
        setFeaturedBook(data);
      } catch (err) {
        console.log(err);
        setFeaturedBook([]);
      }
    };
    fetchFavorites();
  }, [setFeaturedBook, token]);

  const handleFavoriteToggle = (bookId, isFeatured = false) => {
    // Lógica para alternar el estado de favorito...
    if (isFeatured && setFeaturedBook) {
      setFeaturedBook(prevBook => ({
        ...prevBook,
        isFavorite: !prevBook.isFavorite
      }));
    } else {
      setFeaturedBook(prevBooks =>
        prevBooks.map(book => {
          if ((book.id === bookId) || (book.libro_id === bookId)) {
            return { ...book, isFavorite: !book.isFavorite };
          }
          return book;
        })
      );
    }
  };
  return { handleFavoriteToggle };

}
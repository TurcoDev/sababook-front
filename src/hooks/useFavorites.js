export function useFavorites(books, setBooks, featuredBook, setFeaturedBook) {

  const handleFavoriteToggle = (bookId, isFeatured = false) => {
    // Lógica para alternar el estado de favorito...

    if (isFeatured) {
      setFeaturedBook(prevBook => ({
        ...prevBook,
        isFavorite: !prevBook.isFavorite
      }));
    } else {
      setBooks(prevBooks =>
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
function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <article className="book-card">
      <div className="cover-container">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
          />
        ) : (
          <div className="no-cover">No Cover Available</div>
        )}
      </div>

      <div className="book-details">
        <h2>{book.title}</h2>

        <p>
          <strong>Author:</strong>{" "}
          {book.author_name
            ? book.author_name.slice(0, 2).join(", ")
            : "Unknown"}
        </p>

        <p>
          <strong>First Published:</strong>{" "}
          {book.first_publish_year || "Unknown"}
        </p>

        {book.edition_count && (
          <p>
            <strong>Editions:</strong> {book.edition_count}
          </p>
        )}
      </div>
    </article>
  );
}

export default BookCard;
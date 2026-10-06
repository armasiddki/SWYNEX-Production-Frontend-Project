import { useState } from "react";
import "./App.css";
import BookCard from "./components/BookCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      setError("Please enter a book title or author.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=12`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch books.");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setBooks([]);
        setError("No books found. Try another search.");
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setBooks([]);
      setError(
        "Unable to connect to the book service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setBooks([]);
    setError("");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <p className="eyebrow">DISCOVER YOUR NEXT READ</p>

          <h1>Book Finder</h1>

          <p className="header-description">
            Search millions of books and discover something new to read.
          </p>

          <form className="search-form" onSubmit={searchBooks}>
            <div className="search-input-wrapper">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search for books"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </header>

      <main className="container">
        {loading && (
          <div className="status-box">
            <div className="loader"></div>
            <p>Finding books for you...</p>
          </div>
        )}

        {!loading && error && (
          <div className="status-box error-box">
            <div className="status-icon">!</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <div className="welcome-box">
            <div className="welcome-icon">📚</div>
            <h2>Start exploring</h2>
            <p>
              Search for a book title or author to discover your next
              read.
            </p>
          </div>
        )}

        {!loading && books.length > 0 && (
          <>
            <div className="results-header">
              <div>
                <p className="results-label">SEARCH RESULTS</p>
                <h2>Books you might enjoy</h2>
              </div>

              <span className="result-count">
                {books.length} results
              </span>
            </div>

            <div className="book-grid">
              {books.map((book, index) => (
                <BookCard
                  key={`${book.key}-${index}`}
                  book={book}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>
          Built with React & Open Library API ·{" "}
          <a
            href="https://openlibrary.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data provided by Open Library
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
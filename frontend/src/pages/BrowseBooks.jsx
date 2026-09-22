import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import {
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

import { getBooks } from "../services/api";
import BookCard from "../components/BookCard";

function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load books from backend
  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBooks();

      console.log(
        "BOOKS API RESPONSE:",
        response.data
      );

      const data =
        response.data?.books ??
        response.data?.data ??
        response.data ??
        [];

      console.log("BOOKS DATA:", data);

      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error(
        "GET BOOKS ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load books."
      );

      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load books when page opens
  useEffect(() => {
    console.log("🔥 BrowseBooks MOUNTED");

    loadBooks();

    return () => {
      console.log(
        "❌ BrowseBooks UNMOUNTED"
      );
    };
  }, [loadBooks]);

  // Search + filter
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchText =
        `${book.title || ""} ${
          book.author || ""
        } ${book.category || ""}`.toLowerCase();

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );

      const matchesType =
        type === "ALL" ||
        book.book_type === type;

      const matchesStatus =
        !book.status ||
        book.status === "AVAILABLE";

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [books, search, type]);

  return (
    <main className="page">

      <div className="container">

        {/* Page Header */}
        <div className="page-header">

          <h1>Browse Books</h1>

          <p>
            Discover books shared by your
            community.
          </p>

        </div>

        {/* Filters */}
        <div className="book-filters">

          {/* Search */}
          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by title, author or category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Type Filter */}
          <div className="filter-box">

            <SlidersHorizontal size={17} />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="ALL">
                All Types
              </option>

              <option value="EXCHANGE">
                Exchange
              </option>

              <option value="SHARE">
                Share
              </option>

              <option value="DONATE">
                Donate
              </option>
            </select>

          </div>

          {/* Refresh */}
          <button
            type="button"
            className="refresh-button"
            onClick={loadBooks}
          >
            <RefreshCw size={17} />
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="empty-state">
            <p>
              Loading books...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Books */}
        {!loading && !error && (
          <>

            <div className="results-count">
              {filteredBooks.length} book
              {filteredBooks.length !== 1
                ? "s"
                : ""}{" "}
              found
            </div>

            {filteredBooks.length === 0 ? (

              <div className="empty-state">

                <Search size={35} />

                <h3>
                  No books found
                </h3>

                <p>
                  Try another search or
                  filter.
                </p>

              </div>

            ) : (

              <div className="book-grid">

                {filteredBooks.map(
                  (book, index) => (
                    <BookCard
                      key={
                        book.book_id ||
                        book.id ||
                        index
                      }
                      book={book}
                    />
                  )
                )}

              </div>

            )}

          </>
        )}

      </div>

    </main>
  );
}

export default BrowseBooks;
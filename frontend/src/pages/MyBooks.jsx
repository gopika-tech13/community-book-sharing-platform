import React from "react";
import { useEffect, useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getBooks } from "../services/api";
import BookCard from "../components/BookCard";

function MyBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await getBooks();

        const data =
          response.data.books ||
          response.data.data ||
          response.data;

        const allBooks =
          Array.isArray(data) ? data : [];

        const userData =
          localStorage.getItem("user");

        const user =
          userData
            ? JSON.parse(userData)
            : null;

        const mine = allBooks.filter(
          (book) =>
            String(book.owner_id) ===
            String(user?.user_id)
        );

        setBooks(mine);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <main className="page">

      <div className="container">

        <div className="page-header page-header-row">

          <div>
            <h1>My Books</h1>

            <p>
              Manage the books you have shared.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/add-book")
            }
          >
            <Plus size={17} />
            Add Book
          </button>

        </div>

        {loading ? (
          <div className="empty-state">
            Loading your books...
          </div>
        ) : books.length === 0 ? (

          <div className="empty-state">

            <BookOpen size={40} />

            <h3>
              You haven't added any books yet.
            </h3>

            <p>
              Add your first book and share it
              with the community.
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/add-book")
              }
            >
              Add Your First Book
            </button>

          </div>

        ) : (

          <div className="book-grid">

            {books.map((book) => (
              <BookCard
                key={book.book_id}
                book={book}
              />
            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default MyBooks;
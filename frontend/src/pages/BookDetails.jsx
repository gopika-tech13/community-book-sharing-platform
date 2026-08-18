import React from "react";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  User,
  MapPin,
  Send,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getBooks } from "../services/api";
import Badge from "../components/Badge";
import RequestModal from "../components/RequestModal";

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await getBooks();

        const data =
          response.data.books ||
          response.data.data ||
          response.data;

        const books = Array.isArray(data)
          ? data
          : [];

        const found = books.find(
          (item) =>
            String(item.book_id) === String(bookId)
        );

        setBook(found || null);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookId]);

  if (loading) {
    return (
      <main className="page">
        <div className="empty-state">
          Loading book...
        </div>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="page">
        <div className="empty-state">

          <h2>
            Book not found
          </h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/books")}
          >
            Browse Books
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="page">

      <div className="container">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="details-card">

          <div className="details-cover">
            <BookOpen size={70} />
          </div>

          <div className="details-content">

            <Badge
              type={
                book.book_type?.toLowerCase()
              }
            >
              {book.book_type}
            </Badge>

            <h1>{book.title}</h1>

            <p className="details-author">
              by {book.author}
            </p>

            {book.category && (
              <p className="details-category">
                {book.category}
              </p>
            )}

            <div className="details-info">

              <div>
                <User size={17} />
                <span>
                  {book.owner_name ||
                    book.name ||
                    "Community Member"}
                </span>
              </div>

              {book.city && (
                <div>
                  <MapPin size={17} />
                  <span>{book.city}</span>
                </div>
              )}

            </div>

            <div className="details-description">

              <h3>
                About this book
              </h3>

              <p>
                {book.description ||
                  "No description provided."}
              </p>

            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <Send size={17} />
              Send Request
            </button>

          </div>

        </div>

      </div>

      {showModal && (
        <RequestModal
          book={book}
          onClose={() => setShowModal(false)}
        />
      )}

    </main>
  );
}

export default BookDetails;
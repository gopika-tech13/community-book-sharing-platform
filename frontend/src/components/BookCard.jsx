import React from "react";
import {
  BookOpen,
  User,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Badge from "./Badge";

function BookCard({ book }) {
  const navigate = useNavigate();

  if (!book) {
    return null;
  }

  const bookType = book.book_type || "EXCHANGE";
  const bookStatus = book.status || "AVAILABLE";

  const handleViewDetails = () => {
    if (!book.book_id) {
      console.error("Book ID missing:", book);
      return;
    }

    navigate(`/books/${book.book_id}`);
  };

  return (
    <div className="book-card">

      {/* Book Cover */}
      <div className="book-cover">
        <BookOpen size={42} />
      </div>

      {/* Book Content */}
      <div className="book-card-content">

        {/* Type + Status */}
        <div className="book-card-top">

          <Badge type={bookType.toLowerCase()}>
            {bookType}
          </Badge>

          <span className="book-status">
            {bookStatus}
          </span>

        </div>

        {/* Title */}
        <h3>
          {book.title || "Untitled Book"}
        </h3>

        {/* Author */}
        <p className="book-author">
          by {book.author || "Unknown Author"}
        </p>

        {/* Category */}
        {book.category && (
          <p className="book-category">
            {book.category}
          </p>
        )}

        {/* Owner */}
        <div className="book-owner">

          <User size={14} />

          <span>
            {book.owner_name ||
              book.name ||
              "Community Member"}
          </span>

        </div>

        {/* City */}
        {book.city && (
          <div className="book-location">

            <MapPin size={14} />

            <span>
              {book.city}
            </span>

          </div>
        )}

        {/* View Details */}
        <button
          type="button"
          className="book-view-button"
          onClick={handleViewDetails}
        >
          View Details

          <ArrowRight size={15} />

        </button>

      </div>

    </div>
  );
}

export default BookCard;
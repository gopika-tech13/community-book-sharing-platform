import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";

import { addBook } from "../services/api";

function AddBook() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    book_type: "EXCHANGE",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await addBook({
        owner_id: user.user_id,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description,
        book_type: formData.book_type,
        status: "AVAILABLE",
      });

      setMessage(
        "Book added successfully!"
      );

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        book_type: "EXCHANGE",
      });

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Unable to add book."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">

      <div className="container">

        <div className="page-header">
          <h1>Add a Book</h1>

          <p>
            Give your book a second life in the community.
          </p>
        </div>

        <div className="form-card">

          <div className="form-card-icon">
            <BookPlus size={23} />
          </div>

          <h2>Book Information</h2>

          <p className="form-description">
            Enter the details of the book you want to add.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="two-column">

              <div className="form-group">
                <label>Book Title</label>

                <input
                  className="input"
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Author</label>

                <input
                  className="input"
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">

              <label>Category</label>

              <input
                className="input"
                type="text"
                name="category"
                placeholder="Example: Computer Science"
                value={formData.category}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                className="textarea"
                name="description"
                placeholder="Tell people a little about this book..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Book Type</label>

              <select
                className="select"
                name="book_type"
                value={formData.book_type}
                onChange={handleChange}
              >
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <BookPlus size={17} />

              {loading
                ? "Adding Book..."
                : "Add Book"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}

export default AddBook;
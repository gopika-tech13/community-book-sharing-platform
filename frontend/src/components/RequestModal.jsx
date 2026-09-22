import React, { useState } from "react";
import { X } from "lucide-react";

import Button from "./Button";
import { sendRequest } from "../services/api";

function RequestModal({
  book,
  onClose,
  onSuccess,
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [requestType, setRequestType] = useState(
    book?.book_type || "EXCHANGE"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(userData);

    try {
      setLoading(true);

      await sendRequest({
        book_id: book.book_id,
        requester_id: user.user_id,
        message,
        request_type: requestType,
      });

      alert("Request sent successfully!");

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to send request."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <div>
            <h2>Request Book</h2>
            <p>{book.title}</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Request Type</label>

            <select
              className="select"
              value={requestType}
              onChange={(e) =>
                setRequestType(e.target.value)
              }
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

          <div className="form-group">

            <label>Message</label>

            <textarea
              className="textarea"
              placeholder="Write a message to the book owner..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              required
            />

          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Request"}
          </Button>

        </form>

      </div>

    </div>
  );
}

export default RequestModal;
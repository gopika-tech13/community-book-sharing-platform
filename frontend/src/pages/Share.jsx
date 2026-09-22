import React from "react";
import {
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Share() {
  const navigate = useNavigate();

  return (
    <main className="page">

      <div className="container">

        <section className="action-page">

          <div className="action-page-icon share">
            <Share2 size={32} />
          </div>

          <h1>Share a Book</h1>

          <p>
            Share your books with students and community members
            who need them.
          </p>

          <div className="action-info">

            <BookOpen size={22} />

            <div>
              <h3>
                Make knowledge accessible
              </h3>

              <p>
                You can share a book without permanently giving it away.
                Add your book and select SHARE as the book type.
              </p>
            </div>

          </div>

          <button
            className="btn btn-green"
            onClick={() =>
              navigate("/add-book")
            }
          >
            Add a Book to Share
            <ArrowRight size={17} />
          </button>

        </section>

      </div>

    </main>
  );
}

export default Share;
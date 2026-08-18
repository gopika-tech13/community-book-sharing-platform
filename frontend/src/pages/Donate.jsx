import React from "react";
import {
  Gift,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Donate() {
  const navigate = useNavigate();

  return (
    <main className="page">

      <div className="container">

        <section className="action-page">

          <div className="action-page-icon donate">
            <Gift size={32} />
          </div>

          <h1>Donate a Book</h1>

          <p>
            Give your old books a new home and help someone
            continue their learning journey.
          </p>

          <div className="action-info">

            <BookOpen size={22} />

            <div>

              <h3>
                Give books a second life
              </h3>

              <p>
                Add your book and choose DONATE as the book type.
                Someone in your community may benefit from it.
              </p>

            </div>

          </div>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/add-book")
            }
          >
            Add a Book to Donate
            <ArrowRight size={17} />
          </button>

        </section>

      </div>

    </main>
  );
}

export default Donate;
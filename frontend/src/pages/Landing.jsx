import React from "react";
import {
  BookOpen,
  Search,
  Handshake,
  Gift,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="page">

      <section className="hero">
        <div className="hero-badge">
          COMMUNITY-POWERED · COLLEGE BOOK SHARING
        </div>

        <h1>
          One Book Can Change
          <br />
          a Life. Share Yours.
        </h1>

        <p>
          Connect with students and community members to exchange,
          share and donate books. Give your books a second life and
          help someone discover their next great read.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/books")}
          >
            Explore Books
            <ArrowRight size={17} />
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/add-book")}
          >
            Share a Book
          </button>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <h2 className="section-title">
            How it works
          </h2>

          <div className="feature-grid">

            <Feature
              icon={<BookOpen size={21} />}
              title="List a Book"
              text="Add books you no longer need and make them available to your community."
            />

            <Feature
              icon={<Search size={21} />}
              title="Find a Book"
              text="Search through books shared by students and community members."
            />

            <Feature
              icon={<Handshake size={21} />}
              title="Exchange or Share"
              text="Send a request to exchange or share a book with another member."
            />

            <Feature
              icon={<Gift size={21} />}
              title="Donate"
              text="Give useful books to someone who needs them."
            />

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="cta-card">

            <div>
              <h2>Have books you're not using?</h2>

              <p>
                Someone in your community might be looking for exactly
                what you have.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-book")}
            >
              Add Your Book
              <ArrowRight size={17} />
            </button>

          </div>

        </div>
      </section>

      <footer className="footer">
        Smart Community Book Exchange
        <span>
          {" "}· Share Books. Share Knowledge. Build Community.
        </span>
      </footer>

    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="card feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}

export default Landing;
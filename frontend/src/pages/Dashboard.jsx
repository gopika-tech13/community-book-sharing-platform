import React from "react";
import {
  BookOpen,
  Plus,
  Search,
  Send,
  Bell,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <main className="page">

      <div className="container">

        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-label">
              COMMUNITY DASHBOARD
            </p>

            <h1>
              Welcome back,
              <br />
              <span>
                {user?.name || "Book Lover"}!
              </span>
            </h1>

            <p>
              Discover books, share knowledge and connect
              with your community.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-book")}
          >
            <Plus size={17} />
            Add a Book
          </button>

        </section>

        <section className="dashboard-grid">

          <DashboardCard
            icon={<Search size={22} />}
            title="Browse Books"
            text="Find books available for exchange, sharing and donation."
            button="Explore Books"
            onClick={() => navigate("/books")}
          />

          <DashboardCard
            icon={<BookOpen size={22} />}
            title="My Books"
            text="Manage the books you have added to the community."
            button="View My Books"
            onClick={() => navigate("/my-books")}
          />

          <DashboardCard
            icon={<Send size={22} />}
            title="My Requests"
            text="Track requests you have sent to other book owners."
            button="View Requests"
            onClick={() => navigate("/requests")}
          />

          <DashboardCard
            icon={<Bell size={22} />}
            title="Notifications"
            text="See updates about your book requests and exchanges."
            button="View Notifications"
            onClick={() => navigate("/notifications")}
          />

        </section>

        <section className="dashboard-actions">

          <h2>Share the Knowledge</h2>

          <p>
            Choose how you want to contribute to your community.
          </p>

          <div className="action-buttons">

            <button
              className="btn btn-primary"
              onClick={() => navigate("/exchange")}
            >
              Exchange Books
            </button>

            <button
              className="btn btn-green"
              onClick={() => navigate("/share")}
            >
              Share Books
            </button>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/donate")}
            >
              Donate Books
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}

function DashboardCard({
  icon,
  title,
  text,
  button,
  onClick,
}) {
  return (
    <div className="dashboard-card">

      <div className="dashboard-card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button
        className="dashboard-card-link"
        onClick={onClick}
      >
        {button}
        <ArrowRight size={15} />
      </button>

    </div>
  );
}

export default Dashboard;
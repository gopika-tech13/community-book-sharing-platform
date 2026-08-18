
import React from "react";
import {
  BookOpen,
  Home,
  Search,
  Plus,
  Bell,
  Inbox,
  LogOut,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userData =
    localStorage.getItem("user");

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="navbar">

      <div className="navbar-inner">

        <Link
          to="/"
          className="brand"
        >
          <div className="brand-icon">
            <BookOpen size={19} />
          </div>

          <span>
            Smart Book Exchange
          </span>
        </Link>

        {!user ? (

          <div className="navbar-actions">

            <button
              className="btn btn-outline"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/register")
              }
            >
              Get Started
            </button>

          </div>

        ) : (

          <nav className="nav-links">

            <Link to="/dashboard">
              <Home size={17} />
              <span>Home</span>
            </Link>

            <Link to="/books">
              <Search size={17} />
              <span>Browse</span>
            </Link>

            <Link to="/add-book">
              <Plus size={17} />
              <span>Add Book</span>
            </Link>

            <Link to="/requests">
              <Inbox size={17} />
              <span>Requests</span>
            </Link>

            <Link to="/notifications">
              <Bell size={17} />
            </Link>

            <div className="nav-user">

              <User size={16} />

              <span>
                {user.name}
              </span>

            </div>

            <button
              className="logout-button"
              onClick={logout}
            >
              <LogOut size={17} />
            </button>

          </nav>

        )}

      </div>

    </header>
  );
}

export default Navbar;
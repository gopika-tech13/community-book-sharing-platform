import React from "react";
import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";

import MyBooks from "./pages/MyBooks";
import MyExchanges from "./pages/MyExchanges";
import MyRequests from "./pages/MyRequests";

import Exchange from "./pages/MyExchanges";
import Share from "./pages/Share";
import Donate from "./pages/Donate";

import Notifications from "./pages/Notifications";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* Dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />


        {/* Books */}

        <Route path="/books" element={<BrowseBooks />} />

        <Route path="/books/:bookId" element={<BookDetails />} />

        <Route path="/add-book" element={<AddBook />} />

        <Route path="/my-books" element={<MyBooks />} />


        {/* Requests */}

        <Route path="/requests" element={<MyRequests />} />

        <Route path="/my-requests" element={<MyRequests />} />


        {/* Exchange */}

        <Route path="/exchange" element={<Exchange />} />

        <Route path="/my-exchanges" element={<MyExchanges />} />


        {/* Share */}

        <Route path="/share" element={<Share />} />


        {/* Donate */}

        <Route path="/donate" element={<Donate />} />


        {/* Notifications */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>
    </>
  );
}

export default App;
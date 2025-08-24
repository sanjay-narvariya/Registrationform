import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Sidebar toggle (only on small screens) */}
        <button
          className="btn btn-outline-light d-md-none me-2"
          onClick={onToggleSidebar}
        >
          ☰
        </button>

        {/* Brand Logo */}
        <Link className="navbar-brand" to="#">
          <img
            src="/Brand-icon.png"
            style={{ height: "50px" }}
            alt="Brand Logo"
          />
        </Link>

        {/* Optional: Future Right-Side Items */}
        <div className="d-none d-md-block text-white">
          {/* Add user info, links, etc. if needed */}
        </div>
      </div>
    </nav>
  ) : (
    <div></div> // Show nothing if not logged in
  );
}

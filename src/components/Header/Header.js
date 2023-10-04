import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Component for rendering the header/navigation bar.
 */
function Header() {
  // Define the state to store the active link
  const [activeLink, setActiveLink] = useState("");

  // Handle clicks and set the active link
  const handleLinkClick = (to) => {
    setActiveLink(to);
  };
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activeLink === "/" ? "active" : ""}`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/real-time-departures"
              className={`nav-link ${
                activeLink === "/real-time-departures" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/real-time-departures")}
            >
              Real time departures
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${activeLink === "/about" ? "active" : ""}`}
              onClick={() => handleLinkClick("/about")}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${
                activeLink === "/contact" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/contact")}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

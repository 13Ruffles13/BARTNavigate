import React from "react";
import Logo from "../assets/images/Logo-BartNavigate.jpg";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

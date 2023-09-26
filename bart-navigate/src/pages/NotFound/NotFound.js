import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import the CSS file

/**
 * Renders a 404 - Page Not Found error message.
 * @returns {JSX.Element} The rendered NotFound component.
 */
function NotFound() {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 - Page Not Found</h2>
      <p className="not-found-text">
        The page you are looking for does not exist.
      </p>
      <p className="not-found-link">
        <Link to="/">Go back to the home page</Link>
      </p>
    </div>
  );
}

export default NotFound;

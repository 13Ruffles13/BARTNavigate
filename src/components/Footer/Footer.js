import React from "react";
import "./Footer.css"; // Import the CSS file

/**
 * Component for rendering the footer.
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {currentYear} BartNavigate{" "}
          <span role="img" aria-label="train emoji" className="footer-emoji">
            🚆
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

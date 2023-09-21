import React, { useState } from "react";
import "./Contact.css";

/**
 * Component for rendering a contact form.
 */
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /**
   * Handles changes in form input fields.
   * @param {Event} event - The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data: ", formData);
  };

  // Service hours for BartNavigate
  const serviceHours = {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
  };

  // GitHub and LinkedIn links
  const githubLink = "https://github.com/13Ruffles13";
  const linkedinLink = "https://www.linkedin.com/in/rafael-alvarado-jr/";

  return (
    <div className="contact-container">
      <h2>Contact us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="service-hours">
        <h3>BartNavigate Service Hours</h3>
        <ul>
          {Object.entries(serviceHours).map(([day, hours]) => (
            <li key={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
            </li>
          ))}
        </ul>
      </div>
      <div className="social-links">
        <h3>Connect with the Creator</h3>
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default Contact;

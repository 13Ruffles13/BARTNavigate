import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

/**
 * Component for rendering a contact form.
 * @component
 */
function Contact() {
  /**
   * State to manage form data.
   * @type {Object}
   * @property {string} name - The name of the sender.
   * @property {string} email - The email address of the sender.
   * @property {string} message - The message content.
   * @property {string} subject - The subject of the message.
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
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

    emailjs
      .send(
        "service_drwq32n",
        "template_qygu9o2",
        formData,
        "xmsl3nYWUri2ywfYO"
      )
      .then(
        /**
         * Callback function executed upon successful email submission.
         * @param {Object} response - The response object from the email service.
         */
        (response) => {
          console.log("Email sent successfully:", response);
          setFormData({
            name: "",
            email: "",
            message: "",
            subject: "", // Clear the subject field after submission
          });
        },
        /**
         * Callback function executed upon an error in email submission.
         * @param {Error} error - The error object.
         */
        (error) => {
          console.error("Error sending email:", error);
        }
      );

    console.log("Form submitted with data: ", formData);
  };

  /**
   * Service hours for BartNavigate.
   * @type {Object}
   */
  const serviceHours = {
    monday: "5:00 AM - 12:00 PM",
    tuesday: "5:00 AM - 12:00 PM",
    wednesday: "5:00 AM - 12:00 PM",
    thursday: "5:00 AM - 12:00 PM",
    friday: "5:00 AM - 12:00 PM",
    saturday: "6:00 AM - 12:00 PM",
    sunday: "8:00 AM - 12:00 PM",
  };

  /**
   * GitHub profile link.
   * @type {string}
   */
  const githubLink = "https://github.com/13Ruffles13";

  /**
   * LinkedIn profile link.
   * @type {string}
   */
  const linkedinLink = "https://www.linkedin.com/in/rafael-alvarado-jr/";

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
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
          <label htmlFor="email">Your Email</label>
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
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
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
        <h3 className="service-hours-title">BartNavigate Service Hours</h3>
        <ul>
          {Object.entries(serviceHours).map(([day, hours]) => (
            <li key={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
            </li>
          ))}
        </ul>
      </div>
      <div className="social-links">
        <h3 className="social-links-title">Connect with the Creator</h3>
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

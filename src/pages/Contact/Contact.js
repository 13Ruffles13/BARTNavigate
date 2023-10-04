import React, { useState } from "react";
import emailjs from "emailjs-com";
import successImage from "../../assets/images/Email-Check-Mark-Successful.png";
import "./Contact.css";

/**
 * Component for displaying a success pop-up.
 * @param {Object} props - Component props.
 * @param {function} props.onClose - Callback function to close the pop-up.
 * @component
 */
function SuccessPopup({ onClose }) {
  return (
    <div className="success-popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <p>Successfully submitted!</p>
        <img src={successImage} alt="Success check mark" />
      </div>
    </div>
  );
}

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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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

    // Check if required fields are filled out
    if (formData.name.trim() === "") {
      setNameError("Please fill out your name.");
      return;
    } else {
      setNameError("");
    }

    if (formData.email.trim() === "") {
      setEmailError("Please fill out your email.");
      return;
    } else {
      setEmailError("");
    }

    if (formData.message.trim() === "") {
      setMessageError("Please fill out your message.");
      return;
    } else {
      setMessageError("");
    }

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
          setShowSuccessPopup(true); // Show user the success pop-up
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
   * Closes the success pop-up.
   */
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
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
        <div className="form-group required">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="form-group required">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
          />
        </div>
        <div className="form-group required">
          <label htmlFor="message">Message: </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          {messageError && <p className="error-message">{messageError}</p>}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />}
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

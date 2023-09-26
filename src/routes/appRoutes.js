import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import RealTimeDepartures from "../pages/RealTimeDepartures/RealTimeDepartures";
import NotFound from "../pages/NotFound/NotFound";

/**
 * Defines the routes for the BartNavigate application using React Router.
 * @returns {JSX.Element} The JSX element representing the application's routes.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route for the Home page */}
      <Route path="/BARTNavigate" element={<Home />} />

      {/* Route for the Real-time-departures page */}
      <Route path="/real-time-departures" element={<RealTimeDepartures />} />

      {/* Route for the About page */}
      <Route path="/about" element={<About />} />

      {/* Route for the Contact page */}
      <Route path="/contact" element={<Contact />} />

      {/* Route for handling unknown or non-existent routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

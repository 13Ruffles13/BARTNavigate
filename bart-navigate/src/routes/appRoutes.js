import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RouteInfo from "../pages/RouteInfo";
import NotFound from "../pages/NotFound";

/**
 * Defines the routes for the BartNavigate application using React Router.
 * @returns {JSX.Element} The JSX element representing the application's routes.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route for the Home page */}
      <Route path="/" element={<Home />} />

      {/* Route for the RouteInfo page */}
      <Route path="/route-info" element={<RouteInfo />} />

      {/* Route for the About page */}
      {/* <Route path="/about" element={<About />} /> */}

      {/* Route for the Contact page */}
      <Route path="/contact" element={<Contact />} />

      {/* Route for handling unknown or non-existent routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

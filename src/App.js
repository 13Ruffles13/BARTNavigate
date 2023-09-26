import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/appRoutes"; // Import your route configuration
import Footer from "./components/Footer/Footer";
import "./App.css";

/**
 * The main application component that sets up the routing and layout.
 * @returns {JSX.Element} The JSX element representing the application.
 */
function App() {
  return (
    <Router basename="/BARTNavigate">
      <div className="app-container">
        <Header />
        <AppRoutes /> {/* Route configuration component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

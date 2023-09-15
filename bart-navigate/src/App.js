import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Routes defined here */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/" element={<About />}></Route>
          <Route path="/" element={<Contact />}></Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

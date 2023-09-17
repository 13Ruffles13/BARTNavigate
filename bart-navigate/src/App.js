// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/appRoutes'; // Import your route configuration
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRoutes /> {/* Route configuration component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

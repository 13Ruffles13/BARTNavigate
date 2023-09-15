import React from "react";
import BartMap from '../assets/images/BART-System-Map.png'
import './Home.css'
function Home() {
  return (
    <div className="home">
      <h1>Welcome to BartNavigate</h1>
      <p>Explore the BartNavigate system and its routes:</p>
      <img src={BartMap} alt="BART Map" ></img>
    </div>
  );
}
export default Home;

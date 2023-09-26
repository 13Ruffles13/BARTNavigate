/**
 * Renders information about the BART system.
 * @returns {JSX.Element} The rendered About component.
 */
function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Bart Bay Area</h1>
      <p className="about-description">
        The Bay Area Rapid Transit (BART) system is a crucial component of
        public transportation in the San Francisco Bay Area. Established in
        1964, BART has served as a lifeline for commuters and travelers alike.
      </p>
      <p className="about-description">
        BART boasts an extensive network of{" "}
        <span className="about-numbers">50+</span> stations, connecting major
        cities, suburbs, and communities throughout the Bay Area. With over{" "}
        <span className="about-numbers">400,000</span> daily passengers, it
        stands as one of the busiest rapid transit systems in the United States.
      </p>
      <h2 className="about-subtitle">Key Features</h2>
      <ul className="about-features">
        <li>
          Comprehensive Coverage: BART spans{" "}
          <span className="about-numbers">120 miles</span> across the Bay Area,
          providing convenient access to various destinations.
        </li>
        <li>
          Efficiency: Trains run at intervals of approximately{" "}
          <span className="about-numbers">15 minutes</span> during peak hours,
          ensuring timely transportation.
        </li>
        <li>
          Accessibility: BART stations are equipped with facilities for
          passengers with disabilities, making it inclusive and convenient for
          all.
        </li>
        <li>
          Modern Amenities: Stations offer amenities such as secure parking,
          bike racks, and Wi-Fi connectivity.
        </li>
      </ul>
      <p className="about-description">
        Whether you're commuting to work, exploring the Bay Area's attractions,
        or reducing your carbon footprint, BART is here to facilitate your
        journey. Join the millions who rely on BART daily and discover the
        convenience and eco-friendliness of public transit in the Bay Area.
      </p>
    </div>
  );
}

export default About;

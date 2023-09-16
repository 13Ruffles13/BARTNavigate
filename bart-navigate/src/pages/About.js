import React, { useEffect, useState } from "react";
import { fetchBartRealTimeInfo } from "../services/bartService";

function About() {
  const [bartData, setBartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBartData() {
      try {
        const data = await fetchBartRealTimeInfo();
        setBartData(data.root.station);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getBartData();
  }, []);

  return (
    <div className="about">
      <h2>Real-Time BART Information</h2>
      {loading ? (
        <p>Loading BART data...</p>
      ) : (
        <pre>{JSON.stringify(bartData, null, 2)}</pre>
      )}
      {/* Display the BART data in a preformatted block */}
    </div>
  );
}
export default About;

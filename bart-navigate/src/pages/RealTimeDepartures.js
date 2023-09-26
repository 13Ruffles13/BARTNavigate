import React, { useEffect, useState, useCallback } from "react";
import { fetchBartRealTimeInfo } from "../services/bartService";
import "./RealTimeDepartures.css";
import BartMapImage from "../assets/images/BART-System-Map.png";

/**
 * RealTimeDepartures functional component.
 *
 * @returns {JSX.Element} The rendered RealTimeDepartures component.
 */
function RealTimeDepartures() {
  // State variables for component
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [colorRoutes, setColorRoutes] = useState([]);
  const [matchingTrains, setMatchingTrains] = useState({});
  const [bothStationsSelected, setBothStationsSelected] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  /**
   * Fetches closest trains between the current location and the destination.
   *
   * @param {string} destination - The selected destination station.
   */
  const fetchClosestTrains = useCallback(
    (destination) => {
      if (currentLocation === "" || destination === "") {
        console.log(
          "Please select both your current location and destination."
        );
        return;
      }

      // Find the current station object
      const currentStationObj = stations.find(
        (station) => station.name[0] === currentLocation
      );

      if (currentStationObj) {
        // Get colors of trains at the current station
        const currentLocationColors = new Set(
          currentStationObj.etd.flatMap((etd) =>
            etd.estimate.map((estimate) => estimate.color[0])
          )
        );

        // Find the destination station object
        const destinationStationObj = stations.find(
          (station) => station.name[0] === destination
        );

        if (destinationStationObj) {
          // Get colors of trains at the destination station
          const destinationLocationColors = new Set(
            destinationStationObj.etd.flatMap((etd) =>
              etd.estimate.map((estimate) => estimate.color[0])
            )
          );

          // Find matching colors
          const matchingColors = [...currentLocationColors].filter((color) =>
            destinationLocationColors.has(color)
          );

          if (matchingColors.length > 0) {
            const matchingTrains = {};

            // Sort matching trains by arrival time
            matchingColors.forEach((color) => {
              const matching = currentStationObj.etd.flatMap((etd) =>
                etd.estimate.filter((estimate) => estimate.color[0] === color)
              );

              matching.sort((a, b) => {
                const timeA = parseInt(a.minutes[0]);
                const timeB = parseInt(b.minutes[0]);
                return timeA - timeB;
              });

              matchingTrains[color] = matching;
            });

            // Update state with matching trains and colors
            setColorRoutes(matchingColors);
            setMatchingTrains(matchingTrains);
          } else {
            console.log("No matching route colors found.");
          }
        } else {
          console.log(`Destination station "${destination}" not found.`);
        }
      } else {
        console.log(`Current location station "${currentLocation}" not found.`);
      }
    },
    [currentLocation, stations, setColorRoutes, setMatchingTrains]
  );

  // Function to fetch BART real-time data
  const fetchData = useCallback(async () => {
    try {
      const jsonData = await fetchBartRealTimeInfo();
      const stationData = jsonData.root.station;
      setStations(stationData);
      setLoading(false);

      if (bothStationsSelected) {
        fetchClosestTrains(selectedStation);
      }
    } catch (error) {
      console.error(error);
    }
  }, [bothStationsSelected, selectedStation, fetchClosestTrains]);

  // Check if both stations are selected
  const checkBothStationsSelected = useCallback(() => {
    if (selectedStation && currentLocation) {
      setBothStationsSelected(true);
    } else {
      setBothStationsSelected(false);
    }
  }, [selectedStation, currentLocation]);

  // Fetch data on component mount and set interval to fetch data every minute
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  // Check both stations whenever the selected station or current location changes
  useEffect(() => {
    checkBothStationsSelected();
  }, [selectedStation, currentLocation, checkBothStationsSelected]);

  // Handle station selection
  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station === "" || station === undefined) return;
    fetchClosestTrains(station);
  };

  // Handle current location selection
  const handleCurrentLocationSelect = (location) => {
    setCurrentLocation(location);
    if (selectedStation === "" || selectedStation === undefined) return;
    fetchClosestTrains(selectedStation);
  };

  // Set interval to update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const pacificTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      );
      setCurrentTime(pacificTime.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="real-time-container">
      <div className="real-time-info">
        <h2 className="real-time-title">Real-Time BART Information</h2>
        <p className="current-time">Current Pacific Time: {currentTime}</p>
        {loading ? (
          <p className="real-time-loading">Loading...</p>
        ) : (
          <div>
            <form className="real-time-form">
              <div>
                <label className="real-time-label">
                  Select current station:
                </label>
                <select
                  className="real-time-input"
                  value={currentLocation}
                  onChange={(e) => handleCurrentLocationSelect(e.target.value)}
                >
                  <option value="">Select your current destination</option>
                  {stations
                    .slice()
                    .sort((a, b) => a.name[0].localeCompare(b.name[0]))
                    .map((station) => (
                      <option key={station.name[0]} value={station.name[0]}>
                        {station.name[0]}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="real-time-label">Select destination:</label>
                <select
                  className="real-time-input"
                  value={selectedStation}
                  onChange={(e) => handleStationSelect(e.target.value)}
                >
                  <option value="">Select a destination</option>
                  {stations
                    .slice()
                    .sort((a, b) => a.name[0].localeCompare(b.name[0]))
                    .map((station) => (
                      <option key={station.name[0]} value={station.name[0]}>
                        {station.name[0]}
                      </option>
                    ))}
                </select>
              </div>
              {bothStationsSelected && colorRoutes.length > 0 ? (
                <div>
                  <h3 className="real-time-selected">
                    Selected Current Location: {currentLocation}
                  </h3>
                  <h3 className="real-time-selected">
                    Selected Destination: {selectedStation}
                  </h3>
                  {colorRoutes.map((color) => (
                    <div key={color}>
                      <h4 className="real-time-route">
                        <span
                          className={`real-time-circle ${color.toLowerCase()}`}
                        >
                          &nbsp;{/* Add a non-breaking space */}
                        </span>
                        Route {color}
                      </h4>
                      <ul className="real-time-route-list">
                        {matchingTrains[color].map((train, index) => (
                          <li key={index} className="real-time-route-item">
                            <span
                              className={`real-time-circle route-color ${color.toLowerCase()}`}
                            ></span>
                            <strong>🚆 Train {index + 1}: </strong>
                            {train.minutes[0] === "Leaving" ? (
                              <span className="real-time-train-status real-time-train-leaving">
                                Train is leaving station
                              </span>
                            ) : train.minutes[0] === "0" ? (
                              <span className="real-time-train-status real-time-train-left-station">
                                Train has left station
                              </span>
                            ) : (
                              <span className="real-time-train-status">
                                {`${train.minutes[0]} minutes away`}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </form>
          </div>
        )}
      </div>
      <div className="real-time-map">
        <img className="real-time-img" src={BartMapImage} alt="BART Map" />
      </div>
    </div>
  );
}

export default RealTimeDepartures;

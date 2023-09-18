import React, { useEffect, useState, useCallback } from "react";
import { fetchBartRealTimeInfo } from "../services/bartService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RouteInfo.css";

/**
 * Component for displaying real-time BART information.
 */
function RouteInfo() {
  // State variables to manage various aspects of the component
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [userSelectedTime, setUserSelectedTime] = useState("");
  const [colorRoutes, setColorRoutes] = useState([]);
  const [matchingTrains, setMatchingTrains] = useState({});
  const [currentLocation, setCurrentLocation] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);
  const [bothStationsSelected, setBothStationsSelected] = useState(false);

  /**
   * Function to check if both stations are selected.
   */
  const checkBothStationsSelected = useCallback(() => {
    if (selectedStation && currentLocation && selectedDate) {
      setBothStationsSelected(true);
    } else {
      setBothStationsSelected(false);
    }
  }, [selectedStation, currentLocation, selectedDate]);

  // Fetch BART station data when the component mounts
  useEffect(() => {
    async function getBartData() {
      try {
        const jsonData = await fetchBartRealTimeInfo();
        const stationData = jsonData.root.station;
        setStations(stationData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getBartData();
  }, []);

  // Check if both stations are selected whenever any of them changes
  useEffect(() => {
    checkBothStationsSelected();
  }, [
    selectedStation,
    currentLocation,
    selectedDate,
    checkBothStationsSelected,
  ]);

  /**
   * Handle the selection of a BART station.
   * @param {string} station - The selected station.
   */
  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station === "" || station === undefined) return;
    fetchClosestTrains(station);
  };

  /**
   * Handle the selection of the user's current location.
   * @param {string} location - The selected location.
   */
  const handleCurrentLocationSelect = (location) => {
    setCurrentLocation(location);
    if (selectedStation === "" || selectedStation === undefined) return;
    fetchClosestTrains(selectedStation);
  };

  /**
   * Fetch the closest BART trains for the selected station.
   * @param {string} destination - The destination station.
   */
  const fetchClosestTrains = useCallback(
    (destination) => {
      if (currentLocation === "" || destination === "") {
        console.log(
          "Please select both your current location and destination."
        );
        return;
      }

      const currentStationObj = stations.find(
        (station) => station.name[0] === currentLocation
      );

      if (currentStationObj) {
        const currentLocationColors = new Set(
          currentStationObj.etd.flatMap((etd) =>
            etd.estimate.map((estimate) => estimate.color[0])
          )
        );

        const destinationStationObj = stations.find(
          (station) => station.name[0] === destination
        );

        if (destinationStationObj) {
          const destinationLocationColors = new Set(
            destinationStationObj.etd.flatMap((etd) =>
              etd.estimate.map((estimate) => estimate.color[0])
            )
          );

          const matchingColors = [...currentLocationColors].filter((color) =>
            destinationLocationColors.has(color)
          );

          if (matchingColors.length > 0) {
            const matchingTrains = {};

            matchingColors.forEach((color) => {
              const matching = currentStationObj.etd.flatMap((etd) =>
                etd.estimate.filter((estimate) => estimate.color[0] === color)
              );

              matching.sort((a, b) => {
                const timeA = a.minutes[0];
                const timeB = b.minutes[0];
                return timeA - timeB;
              });

              matchingTrains[color] = matching;
            });

            setMatchingTrains(matchingTrains);
            setColorRoutes(matchingColors);
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
    [currentLocation, stations, setMatchingTrains, setColorRoutes]
  );

  // Fetch closest BART trains when both stations are selected
  useEffect(() => {
    if (bothStationsSelected) {
      fetchClosestTrains(selectedStation);
    }
  }, [bothStationsSelected, selectedStation, fetchClosestTrains]);

  // Define time range options based on the selected date
  useEffect(() => {
    if (selectedDate) {
      let startTime = new Date(selectedDate);
      let endTime = new Date(selectedDate);
      startTime.setHours(4, 0, 0, 0);
      endTime.setHours(23, 59, 59, 999);

      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 6) {
        startTime.setHours(6, 0, 0, 0);
      } else if (dayOfWeek === 0 || isHoliday(selectedDate)) {
        startTime.setHours(8, 0, 0, 0);
      }

      const options = [];
      let currentTime = startTime;
      while (currentTime <= endTime) {
        options.push(
          currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }

      setTimeOptions(options);
      setUserSelectedTime(options[0]);
    }
  }, [selectedDate]);

  /**
   * Handle the selection of a date.
   * @param {Date} date - The selected date.
   */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  /**
   * Handle the selection of a departure time.
   * @param {string} time - The selected departure time.
   */
  const handleTimeSelect = (time) => {
    setUserSelectedTime(time);
  };

  /**
   * Check if the selected date is a holiday (e.g., Christmas).
   * @param {Date} date - The selected date.
   * @returns {boolean} - True if the date is a holiday, false otherwise.
   */
  const isHoliday = (date) => {
    const christmas = new Date(date.getFullYear(), 11, 25);
    return date.getTime() === christmas.getTime();
  };

  // Render the component
  return (
    <div className="about">
      <h2>Real-Time BART Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <form>
            <div>
              <label>Select current station:</label>
              <select
                value={currentLocation}
                onChange={(e) => handleCurrentLocationSelect(e.target.value)}
              >
                <option value="">Select your current destination</option>
                {stations.map((station) => (
                  <option key={station.name[0]} value={station.name[0]}>
                    {station.name[0]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select destination:</label>
              <select
                value={selectedStation}
                onChange={(e) => handleStationSelect(e.target.value)}
              >
                <option value="">Select a destination</option>
                {stations.map((station) => (
                  <option key={station.name[0]} value={station.name[0]}>
                    {station.name[0]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select a date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label>Select a time:</label>
              <select
                value={userSelectedTime}
                onChange={(e) => handleTimeSelect(e.target.value)}
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            {bothStationsSelected && colorRoutes.length > 0 && (
              <div>
                <h3>Selected Destination: {selectedStation}</h3>
                <h3>Selected Date: {selectedDate.toLocaleDateString()}</h3>
                <h3>Selected Time: {userSelectedTime}</h3>
                {colorRoutes.map((color) => (
                  <div key={color}>
                    <h4>
                      <span className={`route-color ${color.toLowerCase()}`}>
                        <span className="route-circle"></span>Route {color}
                      </span>
                    </h4>
                    <ul>
                      {matchingTrains[color].map((train, index) => (
                        <li key={index}>
                          Train {index + 1}:{" "}
                          {train.minutes[0] === "Leaving" ? (
                            <strong>Train is leaving station</strong>
                          ) : (
                            `${train.minutes[0]} minutes away`
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default RouteInfo;

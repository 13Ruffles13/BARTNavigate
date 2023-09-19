import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { fetchBartStationInfo } from "../services/stationInfoService";
import "./Home.css";

/**
 * The Home component represents the landing page of the BartNavigate website.
 * It displays a map of Bart stations and their information.
 *
 * @component
 */
function Home() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stationData, setStationData] = useState(null);
  const mapInitialized = useRef(false);

  /**
   * Effect to initialize the map and fetch Bart station data.
   */
  useEffect(() => {
    const mapContainer = mapRef.current;

    if (!mapContainer) {
      console.error("Map container element not found.");
      return;
    }

    if (!mapInitialized.current) {
      const map = L.map(mapContainer).setView([37.7749, -122.4194], 10); // Adjust the zoom level as needed

      // Use OpenStreetMap as the base map layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20, // Adjust the maximum zoom level as needed
      }).addTo(map);

      fetchBartStationInfo()
        .then((data) => {
          setStationData(data);
          setIsLoading(false);
          createMarkersOnMap(map, data);
        })
        .catch((error) => {
          console.error("Error fetching BART station data:", error);
          setIsLoading(false);
        });

      mapInitialized.current = true;
    }

    return () => {
      // Do any cleanup here if needed
    };
  }, []);

  /**
   * Create markers on the map for Bart stations.
   *
   * @param {L.Map} map - The Leaflet map instance.
   * @param {Object} stationInfo - The Bart station data.
   */
  function createMarkersOnMap(map, stationInfo) {
    const stations = stationInfo.root.stations[0].station;

    const stationArray = Array.isArray(stations) ? stations : [stations];

    const trainIcon = L.divIcon({
      className: "train-icon",
      html: "🚇",
      iconSize: [32, 32],
    });

    stationArray.forEach((station) => {
      const lat = parseFloat(station.gtfs_latitude[0]);
      const lon = parseFloat(station.gtfs_longitude[0]);

      if (!isNaN(lat) && !isNaN(lon)) {
        L.marker([lat, lon], { icon: trainIcon })
          .addTo(map)
          .bindPopup(`<b>${station.name[0]}</b><br/>${station.address[0]}`)
      }
    });
  }

  return (
    <div className="home">
      <h1>Welcome to BartNavigate</h1>
      <p>Explore the BartNavigate system and its routes:</p>
      <div ref={mapRef} id="map"></div>
      {isLoading ? <p>Loading...</p> : null}
    </div>
  );
}

export default Home;

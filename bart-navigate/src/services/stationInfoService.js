// services/stationInfoService.js
import axios from "axios";
import { parseString } from "xml2js";

const BART_API_KEY = "MW9S-E7SL-26DU-VV8V";
const BART_API_URL = "https://api.bart.gov/api";

// Function to fetch real-time BART station info
export async function fetchBartStationInfo() {
  try {
    const response = await axios.get(`${BART_API_URL}/stn.aspx`, {
      params: {
        key: BART_API_KEY,
        cmd: "stns",
      },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch BART real-time data");
    }

    const xmlData = response.data;
    let jsonData;
    parseString(xmlData, (err, result) => {
      if (err) {
        throw new Error("Failed to parse XML response");
      }
      jsonData = result;
    });
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
}

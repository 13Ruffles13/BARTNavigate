import React from "react";
import { render, screen, act } from "@testing-library/react";
import Home from "./Home";

// Mock the fetchBartStationInfo function
jest.mock("../../services/stationInfoService", () => ({
  fetchBartStationInfo: async () => ({
    root: {
      stations: [
        {
          station: [
            {
              name: ["Station 1"],
              gtfs_latitude: ["37.12345"],
              gtfs_longitude: ["-122.67890"],
              address: ["123 Main St"],
              city: ["City"],
              state: ["CA"],
              zipcode: ["12345"],
            },
          ],
        },
      ],
    },
  }),
}));

test("renders the Home component", async () => {
  await act(async () => {
    render(<Home />);
  });

  // Add your assertions here based on the rendered Home component
  const titleElement = screen.getByText("Welcome to BartNavigate");
  expect(titleElement).toBeInTheDocument();

  // You can add more specific assertions as needed
});

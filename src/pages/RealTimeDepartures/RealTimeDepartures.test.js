import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import RealTimeDepartures from "./RealTimeDepartures";

// Mock the fetchBartRealTimeInfo function and provide mock data
jest.mock("../../services/bartService", () => ({
  fetchBartRealTimeInfo: async () => ({
    root: {
      station: [
        {
          name: ["Station A"],
          etd: [
            {
              estimate: [
                {
                  color: ["RED"],
                  minutes: ["5"],
                },
              ],
            },
          ],
        },
        {
          name: ["Station B"],
          etd: [
            {
              estimate: [
                {
                  color: ["BLUE"],
                  minutes: ["10"],
                },
              ],
            },
          ],
        },
      ],
    },
  }),
}));

test("renders the RealTimeDepartures component", async () => {
  await act(async () => {
    render(<RealTimeDepartures />);
  });

  // Use waitFor to wait for the component to finish rendering and data fetching
  await waitFor(() => {
    // Check if the component's title is rendered
    const titleElement = screen.getByText("Real-Time BART Information");
    expect(titleElement).toBeInTheDocument();
  });
});

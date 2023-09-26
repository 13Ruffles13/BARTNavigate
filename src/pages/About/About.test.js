import React from "react";
import { render, screen } from "@testing-library/react";
import About from "./About";

test("About component renders without errors", () => {
  render(<About />);

  // Check if elements in the About component are present
  const aboutTitle = screen.getByText("About Bart Bay Area");
  const aboutDescription = screen.getByText(
    "The Bay Area Rapid Transit (BART) system is a crucial component of public transportation in the San Francisco Bay Area. Established in 1964, BART has served as a lifeline for commuters and travelers alike."
  );
  const keyFeaturesTitle = screen.getByText("Key Features");

  // Assertions
  expect(aboutTitle).toBeInTheDocument();
  expect(aboutDescription).toBeInTheDocument();
  expect(keyFeaturesTitle).toBeInTheDocument();
});

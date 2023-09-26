import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import Header from "./Header";

test("Header renders navigation links", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check if the navigation links are present
  const homeLink = screen.getByText(/Home/i);
  const departuresLink = screen.getByText(/Real time departures/i);
  const aboutLink = screen.getByText(/About/i);
  const contactLink = screen.getByText(/Contact/i);

  // Assertions
  expect(homeLink).toBeInTheDocument();
  expect(departuresLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import AppRoutes from "./appRoutes";

test("renders the AppRoutes component with correct routes", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>

      <AppRoutes />
    </MemoryRouter>
  );

  // Check if the Home component is rendered for the "/" route
  const homeElement = screen.getByText("Welcome to BartNavigate");
  expect(homeElement).toBeInTheDocument();
});

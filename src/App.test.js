import React from "react";
import { render, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders the App component", () => {
  // Suppress the warning related to basename
  console.warn = jest.fn();
  act(() => {
    render(
      <Router basename="/BARTNavigate">
        <App />
      </Router>
    );
  });
});

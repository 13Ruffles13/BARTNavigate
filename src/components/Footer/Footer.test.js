import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

test("Footer displays current year and text", () => {
  const { getByText, getByRole } = render(<Footer />);

  // Get the current year and format it as a string
  const currentYear = new Date().getFullYear().toString();

  // Check if the footer contains the current year
  const yearElement = getByText(`© ${currentYear} BartNavigate`);

  // Check if the footer contains the train emoji
  const emojiElement = getByRole("img", { name: "train emoji" });

  // Assertions
  expect(yearElement).toBeInTheDocument();
  expect(emojiElement).toBeInTheDocument();
});

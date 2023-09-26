import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

test('Contact component renders without errors', () => {
  render(<Contact />);

  // Check if the elements in the Contact component are present
  const contactTitle = screen.getByText('Contact Us');
  const nameInput = screen.getByLabelText('Your Name');
  const emailInput = screen.getByLabelText('Your Email');
  const subjectInput = screen.getByLabelText('Subject');
  const messageTextarea = screen.getByLabelText('Your Message');
  const submitButton = screen.getByText('Submit');

  // Assertions
  expect(contactTitle).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(subjectInput).toBeInTheDocument();
  expect(messageTextarea).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello World', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Integrated CI', () => {
  render(<App />);
  const linkElement = screen.getByText(/Integrated CI/i);
  expect(linkElement).toBeInTheDocument();
});
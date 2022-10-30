import { render, screen } from '@testing-library/react';
import App from './App';

test('react testing implemented', () => {
  render(<App />);
  const linkElement = screen.getByText(/react testing/i);
  expect(linkElement).toBeInTheDocument();
});



import { render, screen } from '@testing-library/react';
import App from './App';



test('react testing implemented', () => {
  render(<App />);
  const linkElement = screen.getByText(/react testing/i);
  expect(linkElement).toBeInTheDocument();
});

test('login component test', () => {
  const {getByLabelText} = render(<App />);
  const childElement = getByLabelText("Email");
  expect(childElement).toBeTruthy();
  
});

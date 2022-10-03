import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('socket.io-client', () => mockUrl => ({
  on: jest.fn,
  off: jest.fn
}));

test('render empty comments board', () => {
  render(<App />);
  const linkElement = screen.getByText(/Comments Board/i);
  expect(linkElement).toBeInTheDocument();
});

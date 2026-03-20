import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders hero section', () => {
    render(<App />);
    expect(screen.getByText('AutoDev Studio')).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(<App />);
    expect(screen.getByText('What We Build')).toBeInTheDocument();
  });

  test('renders contact form section', () => {
    render(<App />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/© 2026 AutoDev Studio/)).toBeInTheDocument();
  });
});
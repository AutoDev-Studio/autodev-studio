import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  test('renders with default props', () => {
    render(<Hero />);
    expect(screen.getByText('AutoDev Studio')).toBeInTheDocument();
    expect(screen.getByText('Zero-human software development')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    render(
      <Hero
        title="Custom Title"
        tagline="Custom tagline"
        ctaText="Click me"
      />
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom tagline')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('has proper heading element', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('AutoDev Studio');
    expect(heading).toHaveClass('text-3xl', 'md:text-5xl', 'lg:text-6xl');
  });
});
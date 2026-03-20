import { render, screen } from '@testing-library/react';
import Features from '../Features';

describe('Features', () => {
  const mockFeatures = [
    { title: 'Test Feature 1', description: 'Description 1' },
    { title: 'Test Feature 2', description: 'Description 2' },
  ];

  test('renders heading', () => {
    render(<Features />);
    expect(screen.getByText('What We Build')).toBeInTheDocument();
  });

  test('renders default features', () => {
    render(<Features />);
    expect(screen.getByText('UI Design')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Development')).toBeInTheDocument();
    expect(screen.getByText('Deployment')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  test('renders custom features', () => {
    render(<Features features={mockFeatures} />);
    expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('renders correct number of feature cards', () => {
    render(<Features features={mockFeatures} />);
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);
  });
});
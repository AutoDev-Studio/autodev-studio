import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  const mockLinks = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ];

  test('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2026 AutoDev Studio. All rights reserved.')).toBeInTheDocument();
  });

  test('renders custom copyright', () => {
    render(<Footer copyright="Custom Copyright" />);
    expect(screen.getByText('Custom Copyright')).toBeInTheDocument();
  });

  test('renders default links', () => {
    render(<Footer />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toHaveAttribute('href', 'mailto:hello@autodev.live');
  });

  test('renders custom links', () => {
    render(<Footer links={mockLinks} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
    const twitterLink = screen.getByText('Twitter');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
  });
});
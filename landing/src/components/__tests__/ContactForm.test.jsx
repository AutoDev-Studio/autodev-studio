import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.window.open = jest.fn();
  });

  test('renders form with all fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('allows user to fill form fields', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello there');
    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello there');
  });

  test('submits form and opens mailto link', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(global.window.open).toHaveBeenCalledTimes(1);
    const mailtoLink = global.window.open.mock.calls[0][0];
    expect(mailtoLink).toMatch(/^mailto:hello@autodev\.live\?subject=.+&body=.+$/);
    expect(decodeURIComponent(mailtoLink)).toContain('Jane Smith');
    expect(decodeURIComponent(mailtoLink)).toContain('jane@example.com');
    expect(decodeURIComponent(mailtoLink)).toContain('Test message');
  });

  test('shows success message after submission', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/thank you!/i)).toBeInTheDocument();
    expect(screen.getByText(/your message has been prepared/i)).toBeInTheDocument();
  });

  test('calls onSubmit prop when provided', async () => {
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), 'Prop Test');
    await user.type(screen.getByLabelText(/email/i), 'prop@test.com');
    await user.type(screen.getByLabelText(/message/i), 'Prop message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Prop Test',
      email: 'prop@test.com',
      message: 'Prop message',
    });
  });
});
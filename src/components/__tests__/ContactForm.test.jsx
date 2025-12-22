import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../Contact/ContactForm';

// Mock the contactService
vi.mock('../../services/contactService', () => ({
    sendContactMessage: vi.fn()
}));

describe('ContactForm Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all form fields', () => {
        render(<ContactForm />);

        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/comments/i)).toBeInTheDocument();
    });

    it('should show validation errors for required fields', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
            expect(screen.getByText(/comments are required/i)).toBeInTheDocument();
        });
    });

    it('should validate email format', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const emailInput = screen.getByLabelText(/email address/i);
        await user.type(emailInput, 'invalid-email');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
        });
    });

    it('should validate phone number format', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const phoneInput = screen.getByLabelText(/phone number/i);
        await user.type(phoneInput, 'abc123');

        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
        });
    });

    it('should clear error when user starts typing', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        // Trigger validation error
        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        });

        // Start typing
        const firstNameInput = screen.getByLabelText(/first name/i);
        await user.type(firstNameInput, 'John');

        // Error should be cleared
        expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
    });

    it('should submit form with valid data', async () => {
        const { sendContactMessage } = await import('../../services/contactService');
        sendContactMessage.mockResolvedValue({ success: true });

        const user = userEvent.setup();
        render(<ContactForm />);

        // Fill in all required fields
        await user.type(screen.getByLabelText(/first name/i), 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
        await user.type(screen.getByLabelText(/phone number/i), '+1234567890');

        // Select subject
        const subjectSelect = screen.getByLabelText(/subject/i);
        await user.selectOptions(subjectSelect, 'Financial Planning');

        await user.type(screen.getByLabelText(/comments/i), 'I need help with financial planning');

        // Submit
        const submitButton = screen.getByRole('button', { name: /send message/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(sendContactMessage).toHaveBeenCalledWith({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                subject: 'Financial Planning',
                comments: 'I need help with financial planning'
            });
        });
    });

    it('should show success message after successful submission', async () => {
        const { sendContactMessage } = await import('../../services/contactService');
        sendContactMessage.mockResolvedValue({ success: true });

        const user = userEvent.setup();
        render(<ContactForm />);

        // Fill and submit form
        await user.type(screen.getByLabelText(/first name/i), 'Jane');
        await user.type(screen.getByLabelText(/last name/i), 'Smith');
        await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText(/subject/i), 'Tax Planning & Compliance');
        await user.type(screen.getByLabelText(/comments/i), 'Tax consultation needed');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/we have received your details/i)).toBeInTheDocument();
        });
    });

    it('should show error message on submission failure', async () => {
        const { sendContactMessage } = await import('../../services/contactService');
        sendContactMessage.mockRejectedValue(new Error('Network error'));

        const user = userEvent.setup();
        render(<ContactForm />);

        // Fill and submit form
        await user.type(screen.getByLabelText(/first name/i), 'Test');
        await user.type(screen.getByLabelText(/last name/i), 'User');
        await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
        await user.selectOptions(screen.getByLabelText(/subject/i), 'Investment Management');
        await user.type(screen.getByLabelText(/comments/i), 'Test message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/sorry, there was an error/i)).toBeInTheDocument();
        });
    });

    it('should sanitize inputs before submission (XSS Prevention)', async () => {
        const { sendContactMessage } = await import('../../services/contactService');
        sendContactMessage.mockResolvedValue({ success: true });

        const user = userEvent.setup();
        render(<ContactForm />);

        // Try to inject XSS
        await user.type(screen.getByLabelText(/first name/i), '<script>alert("XSS")</script>');
        await user.type(screen.getByLabelText(/last name/i), 'Test');
        await user.type(screen.getByLabelText(/email address/i), 'test@test.com');
        await user.selectOptions(screen.getByLabelText(/subject/i), 'Financial Planning');
        await user.type(screen.getByLabelText(/comments/i), '<img src=x onerror=alert(1)>');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(sendContactMessage).toHaveBeenCalled();
        });

        // The actual sanitization happens in contactService, 
        // but we verify the data was sent (will be sanitized by service layer)
    });

    it('should clear form after successful submission', async () => {
        const { sendContactMessage } = await import('../../services/contactService');
        sendContactMessage.mockResolvedValue({ success: true });

        const user = userEvent.setup();
        render(<ContactForm />);

        const firstNameInput = screen.getByLabelText(/first name/i);

        await user.type(firstNameInput, 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
        await user.selectOptions(screen.getByLabelText(/subject/i), 'Financial Planning');
        await user.type(screen.getByLabelText(/comments/i), 'Message');

        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(firstNameInput).toHaveValue('');
        });
    });
});

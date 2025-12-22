import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sanitizeInput, sendContactMessage } from '../contactService';

// Mock axios
vi.mock('axios', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('contactService', () => {
    describe('Input Sanitization (XSS Prevention)', () => {
        it('should sanitize HTML tags from input', () => {
            const input = '<script>alert("XSS")</script>';
            const result = sanitizeInput(input);
            expect(result).not.toContain('<script>');
            expect(result).toContain('&lt;script&gt;');
        });

        it('should sanitize special characters', () => {
            const input = '"><img src=x onerror=alert(1)>';
            const result = sanitizeInput(input);
            expect(result).not.toContain('<');
            expect(result).not.toContain('>');
            expect(result).toContain('&lt;');
            expect(result).toContain('&gt;');
        });

        it('should sanitize quotes and apostrophes', () => {
            const input = `"test' value`;
            const result = sanitizeInput(input);
            expect(result).toContain('&quot;');
            expect(result).toContain('&#x27;');
        });

        it('should handle non-string inputs safely', () => {
            expect(sanitizeInput(null)).toBe(null);
            expect(sanitizeInput(undefined)).toBe(undefined);
            expect(sanitizeInput(123)).toBe(123);
        });

        it('should sanitize forward slashes', () => {
            const input = '</script><script>';
            const result = sanitizeInput(input);
            expect(result).toContain('&#x2F;');
        });
    });

    describe('sendContactMessage', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should sanitize all inputs before sending', async () => {
            const axios = await import('axios');
            axios.default.post.mockResolvedValue({ data: { success: true } });

            const formData = {
                firstName: '<script>alert(1)</script>John',
                lastName: 'Doe<img src=x>',
                email: 'test@test.com',
                phone: '+1234567890',
                subject: 'Test Subject',
                comments: 'Test comments with <b>HTML</b>'
            };

            await sendContactMessage(formData);

            const callArgs = axios.default.post.mock.calls[0][1];

            // Verify all fields are sanitized
            expect(callArgs.name).not.toContain('<script>');
            expect(callArgs.name).not.toContain('<img');
            expect(callArgs.message).not.toContain('<b>');
        });
    });
});

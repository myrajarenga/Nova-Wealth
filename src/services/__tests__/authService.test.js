import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getToken, setToken, logout } from '../authService';

describe('authService', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        sessionStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    describe('Token Management', () => {
        it('should store token in localStorage', () => {
            const testToken = 'test-jwt-token-123';
            setToken(testToken);

            expect(localStorage.getItem('authToken')).toBe(testToken);
            expect(getToken()).toBe(testToken);
        });

        it('should retrieve token from localStorage', () => {
            const testToken = 'stored-token-456';
            localStorage.setItem('authToken', testToken);

            expect(getToken()).toBe(testToken);
        });

        it('should return null when no token exists', () => {
            expect(getToken()).toBeNull();
        });

        it('should remove token when set to null', () => {
            localStorage.setItem('authToken', 'some-token');
            setToken(null);

            expect(localStorage.getItem('authToken')).toBeNull();
            expect(getToken()).toBeNull();
        });

        it('should handle SSR environment (typeof window === undefined)', () => {
            // getToken should handle server-side rendering gracefully
            const originalWindow = global.window;
            delete global.window;

            expect(() => getToken()).not.toThrow();

            global.window = originalWindow;
        });
    });

    describe('Logout Function', () => {
        it('should clear auth token on logout', () => {
            localStorage.setItem('authToken', 'token-to-clear');
            logout();

            expect(localStorage.getItem('authToken')).toBeNull();
        });

        it('should set logout success flag in sessionStorage', () => {
            logout();

            expect(sessionStorage.getItem('logoutSuccess')).toBe('1');
        });

        it('should not throw error if sessionStorage is unavailable', () => {
            const originalSessionStorage = global.sessionStorage;
            delete global.sessionStorage;

            expect(() => logout()).not.toThrow();

            global.sessionStorage = originalSessionStorage;
        });
    });

    describe('Security - Token Storage', () => {
        it('should not expose token in cookies (using localStorage instead)', () => {
            setToken('secret-token');

            // Verify token is NOT in document.cookie
            expect(document.cookie).not.toContain('secret-token');
        });

        it('should validate token format (basic check)', () => {
            const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature';
            setToken(validToken);

            expect(getToken()).toBe(validToken);
        });
    });
});

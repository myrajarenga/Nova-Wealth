import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AutoLogout from '../AutoLogout';

// Mock the authService
vi.mock('../../services/authService', () => ({
    logout: vi.fn()
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('AutoLogout Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should render children correctly', () => {
        const { getByText } = render(
            <MemoryRouter>
                <AutoLogout timeoutMs={20 * 60 * 1000}>
                    <div>Test Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should use default 20-minute timeout', () => {
        const spy = vi.spyOn(global, 'setTimeout');

        render(
            <MemoryRouter>
                <AutoLogout>
                    <div>Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        expect(spy).toHaveBeenCalledWith(expect.any(Function), 1200000); // 20 minutes
    });

    it('should logout after specified timeout of inactivity', async () => {
        const { logout } = await import('../../services/authService');

        render(
            <MemoryRouter>
                <AutoLogout timeoutMs={5000}>
                    <div>Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        // Fast-forward time by 5 seconds
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(logout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should reset timer on user activity (mousemove)', async () => {
        const { logout } = await import('../../services/authService');

        render(
            <MemoryRouter>
                <AutoLogout timeoutMs={5000}>
                    <div>Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        // Advance time partially
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Simulate user activity
        act(() => {
            window.dispatchEvent(new Event('mousemove'));
        });

        // Advance another 3 seconds (total 6, but timer reset at 3)
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Should NOT have logged out yet (timer was reset)
        expect(logout).not.toHaveBeenCalled();

        // Advance to complete the timeout from reset
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        // NOW it should logout
        expect(logout).toHaveBeenCalled();
    });

    it('should reset timer on keyboard activity', async () => {
        const { logout } = await import('../../services/authService');

        render(
            <MemoryRouter>
                <AutoLogout timeoutMs={5000}>
                    <div>Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        act(() => {
            vi.advanceTimersByTime(3000);
            window.dispatchEvent(new Event('keydown'));
            vi.advanceTimersByTime(3000);
        });

        expect(logout).not.toHaveBeenCalled();
    });

    it('should clean up event listeners on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = render(
            <MemoryRouter>
                <AutoLogout>
                    <div>Content</div>
                </AutoLogout>
            </MemoryRouter>
        );

        unmount();

        // Should remove all activity listeners
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    });
});

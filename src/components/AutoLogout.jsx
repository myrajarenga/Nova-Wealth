import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const AutoLogout = ({ children, timeoutMs = 3600000 }) => { // Default 1 hour
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            console.log('User inactive for too long. Logging out...');
            logout();
            navigate('/login');
            window.location.reload(); // Force reload to clear state effectively
        }, timeoutMs);
    }, [navigate, timeoutMs]);

    useEffect(() => {
        // Events to track activity
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        // Initial timer start
        resetTimer();

        // Attach listeners
        const handleActivity = () => resetTimer();

        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [resetTimer]);

    return <>{children}</>;
};

export default AutoLogout;

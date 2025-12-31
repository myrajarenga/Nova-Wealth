/**
 * Rate Limiter Utility
 * 
 * Client-side rate limiting for form submissions
 * Prevents spam and abuse
 */

const STORAGE_PREFIX = 'nw_rl_'; // Nova Wealth Rate Limiter prefix

/**
 * Rate limiter configuration
 */
const DEFAULT_CONFIG = {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000, // 30 minutes after exceeding limit
};

/**
 * Get rate limit data from storage
 * @param {string} key 
 */
function getRateLimitData(key) {
    try {
        const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Set rate limit data in storage
 * @param {string} key 
 * @param {Object} data 
 */
function setRateLimitData(key, data) {
    try {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
    } catch (e) {
        // Silent fail if localStorage is full
    }
}

/**
 * Clear rate limit data
 * @param {string} key 
 */
function clearRateLimitData(key) {
    try {
        localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (e) {
        // Silent fail
    }
}

/**
 * Check if action is rate limited
 * @param {string} action - Unique identifier for the action (e.g., 'contact-form', 'login')
 * @param {Object} config - Custom configuration
 * @returns {Object} { allowed: boolean, remainingAttempts: number, resetTime: number|null, error: string|null }
 */
export function checkRateLimit(action, config = {}) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const now = Date.now();

    const data = getRateLimitData(action);

    // No previous attempts
    if (!data) {
        return {
            allowed: true,
            remainingAttempts: cfg.maxAttempts - 1,
            resetTime: null,
            error: null,
        };
    }

    // Check if block period has expired
    if (data.blockedUntil && now < data.blockedUntil) {
        const minutesLeft = Math.ceil((data.blockedUntil - now) / 60000);
        return {
            allowed: false,
            remainingAttempts: 0,
            resetTime: data.blockedUntil,
            error: `Too many attempts. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
        };
    }

    // Block period expired, clear it
    if (data.blockedUntil && now >= data.blockedUntil) {
        clearRateLimitData(action);
        return {
            allowed: true,
            remainingAttempts: cfg.maxAttempts - 1,
            resetTime: null,
            error: null,
        };
    }

    // Check if window has expired (reset attempts)
    if (data.windowStart && now - data.windowStart > cfg.windowMs) {
        clearRateLimitData(action);
        return {
            allowed: true,
            remainingAttempts: cfg.maxAttempts - 1,
            resetTime: null,
            error: null,
        };
    }

    // Within window, check attempts
    const attempts = data.attempts || 0;
    const remaining = cfg.maxAttempts - attempts;

    if (attempts >= cfg.maxAttempts) {
        // Exceeded limit, block
        const blockedUntil = now + cfg.blockDurationMs;
        setRateLimitData(action, { ...data, blockedUntil });

        const minutesLeft = Math.ceil(cfg.blockDurationMs / 60000);
        return {
            allowed: false,
            remainingAttempts: 0,
            resetTime: blockedUntil,
            error: `Too many attempts. Please try again in ${minutesLeft} minutes.`,
        };
    }

    return {
        allowed: true,
        remainingAttempts: remaining - 1,
        resetTime: data.windowStart + cfg.windowMs,
        error: null,
    };
}

/**
 * Record an attempt
 * @param {string} action 
 * @param {Object} config 
 */
export function recordAttempt(action, config = {}) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const now = Date.now();

    const data = getRateLimitData(action) || {
        windowStart: now,
        attempts: 0,
    };

    // If window expired, reset
    if (now - data.windowStart > cfg.windowMs) {
        data.windowStart = now;
        data.attempts = 0;
    }

    data.attempts += 1;
    setRateLimitData(action, data);
}

/**
 * Reset rate limit for an action
 * @param {string} action 
 */
export function resetRateLimit(action) {
    clearRateLimitData(action);
}

/**
 * Get formatted time remaining message
 * @param {number} resetTime 
 * @returns {string}
 */
export function getTimeRemainingMessage(resetTime) {
    if (!resetTime) return '';

    const now = Date.now();
    const diff = resetTime - now;

    if (diff <= 0) return 'You can try again now.';

    const minutes = Math.ceil(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return `Try again in ${hours} hour${hours > 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.`;
    }

    return `Try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`;
}

export default {
    checkRateLimit,
    recordAttempt,
    resetRateLimit,
    getTimeRemainingMessage,
};

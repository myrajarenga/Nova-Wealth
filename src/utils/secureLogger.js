/**
 * Secure Logging Utility
 * 
 * Purpose: Centralized logging that sanitizes sensitive data and provides
 * detailed logs for developers while showing generic messages to users.
 */

const isDevelopment = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Patterns to detect and redact sensitive information
const SENSITIVE_PATTERNS = {
    email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
    phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    token: /([Bb]earer\s+)?[A-Za-z0-9-._~+\/]+=*/g,
    password: /(password|passwd|pwd)[\s:=]+\S+/gi,
    ssn: /\d{3}-\d{2}-\d{4}/g,
    creditCard: /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,
};

/**
 * Sanitize log message by redacting sensitive information
 */
function sanitizeMessage(message) {
    if (typeof message !== 'string') {
        try {
            message = JSON.stringify(message);
        } catch (e) {
            message = String(message);
        }
    }

    let sanitized = message;

    // Redact sensitive patterns
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.email, '[EMAIL_REDACTED]');
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.phone, '[PHONE_REDACTED]');
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.token, '[TOKEN_REDACTED]');
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.password, '[PASSWORD_REDACTED]');
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.ssn, '[SSN_REDACTED]');
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.creditCard, '[CARD_REDACTED]');

    return sanitized;
}

/**
 * Generate unique error fingerprint for tracking
 */
function generateErrorFingerprint(error) {
    const errorString = `${error.name}:${error.message}:${error.stack?.split('\n')[1] || ''}`;
    let hash = 0;
    for (let i = 0; i < errorString.length; i++) {
        const char = errorString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return `ERR-${Math.abs(hash).toString(16).toUpperCase().substring(0, 8)}`;
}

/**
 * Log error securely
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (component name, user action, etc.)
 * @returns {string} Error fingerprint for user display
 */
export function logError(error, context = {}) {
    const fingerprint = generateErrorFingerprint(error);
    const timestamp = new Date().toISOString();

    // Detailed log for developers (only in development)
    if (isDevelopment) {
        console.group(`🔴 Error ${fingerprint}`);
        console.error('Time:', timestamp);
        console.error('Context:', context);
        console.error('Error:', error);
        console.error('Stack:', error.stack);
        console.groupEnd();
    }

    // In production, send to monitoring service (placeholder for now)
    if (isProd) {
        // TODO: Send to your monitoring service (Sentry, LogRocket, etc.)
        try {
            // Example: sendToMonitoring({ fingerprint, error: error.message, context, timestamp });
        } catch (e) {
            // Silent fail - don't break the app if monitoring fails
        }
    }

    return fingerprint;
}

/**
 * Log warning securely
 */
export function logWarning(message, context = {}) {
    const sanitized = sanitizeMessage(message);

    if (isDevelopment) {
        console.warn('⚠️', sanitized, context);
    }
}

/**
 * Log info securely (development only)
 */
export function logInfo(message, context = {}) {
    if (isDevelopment) {
        const sanitized = sanitizeMessage(message);
        console.log('ℹ️', sanitized, context);
    }
}

/**
 * Get user-friendly error message
 * Never expose technical details to end users
 */
export function getUserFriendlyMessage(error, customMessage = null) {
    // If custom message provided, use it
    if (customMessage) return customMessage;

    // Generic messages based on error type
    if (error.message?.toLowerCase().includes('network') || error.code === 'ERR_NETWORK') {
        return 'Unable to connect. Please check your internet connection and try again.';
    }

    if (error.response?.status === 429) {
        return 'Too many requests. Please wait a moment and try again.';
    }

    if (error.response?.status === 503 || error.response?.status === 504) {
        return 'Service temporarily unavailable. Please try again in a few moments.';
    }

    if (error.response?.status >= 500) {
        return 'Something went wrong on our end. Our team has been notified.';
    }

    // Generic fallback - never expose technical details
    return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
}

/**
 * Log authentication-related errors with extra security
 * Never reveal account existence or specific auth failures
 */
export function logAuthError(error, context = {}) {
    const fingerprint = logError(error, { ...context, type: 'auth' });

    // Always return generic message for security
    return {
        fingerprint,
        userMessage: 'Unable to sign in. Please check your credentials and try again.',
    };
}

/**
 * Sanitize object for logging (remove sensitive fields)
 */
export function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'ssn', 'creditCard', 'cvv'];
    const sanitized = { ...obj };

    for (const key in sanitized) {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
            sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object') {
            sanitized[key] = sanitizeObject(sanitized[key]);
        }
    }

    return sanitized;
}

export default {
    logError,
    logWarning,
    logInfo,
    getUserFriendlyMessage,
    logAuthError,
    sanitizeObject,
};

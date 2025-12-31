/**
 * Input Validator Utility
 * 
 * Comprehensive validation and sanitization for user inputs
 * Protects against XSS, SQL injection, and malicious data
 */

// Known disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
    'mailinator.com', 'trashmail.com', 'yopmail.com', 'maildrop.cc'
];

// SQL injection patterns
const SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /(\bOR\b.*=.*\bOR\b|\bAND\b.*=.*\bAND\b)/gi,
];

// XSS patterns
const XSS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onload, etc.
    /<embed|<object/gi,
];

/**
 * Validate email address
 * @param {string} email 
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { isValid: false, error: 'Email is required' };
    }

    const trimmed = email.trim().toLowerCase();

    // Basic format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    // Check for disposable email domains
    const domain = trimmed.split('@')[1];
    if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        return { isValid: false, error: 'Please use a permanent email address' };
    }

    // Check length
    if (trimmed.length > 254) {
        return { isValid: false, error: 'Email address is too long' };
    }

    return { isValid: true, error: null };
}

/**
 * Validate phone number (international format support)
 * @param {string} phone 
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validatePhone(phone) {
    if (!phone) {
        return { isValid: true, error: null }; // Phone is optional in most forms
    }

    if (typeof phone !== 'string') {
        return { isValid: false, error: 'Invalid phone number format' };
    }

    const trimmed = phone.trim();

    // Allow digits, spaces, dashes, parentheses, and leading +
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(trimmed)) {
        return { isValid: false, error: 'Please enter a valid phone number' };
    }

    return { isValid: true, error: null };
}

/**
 * Validate name (first name, last name)
 * @param {string} name 
 * @param {string} fieldName 
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateName(name, fieldName = 'Name') {
    if (!name || typeof name !== 'string') {
        return { isValid: false, error: `${fieldName} is required` };
    }

    const trimmed = name.trim();

    if (trimmed.length < 2) {
        return { isValid: false, error: `${fieldName} must be at least 2 characters` };
    }

    if (trimmed.length > 50) {
        return { isValid: false, error: `${fieldName} is too long` };
    }

    // Allow letters, spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(trimmed)) {
        return { isValid: false, error: `${fieldName} contains invalid characters` };
    }

    return { isValid: true, error: null };
}

/**
 * Detect SQL injection attempts
 * @param {string} input 
 * @returns {boolean} true if SQL injection detected
 */
export function detectSQLInjection(input) {
    if (!input || typeof input !== 'string') return false;

    return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Detect XSS attempts
 * @param {string} input 
 * @returns {boolean} true if XSS detected
 */
export function detectXSS(input) {
    if (!input || typeof input !== 'string') return false;

    return XSS_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Sanitize text input
 * @param {string} input 
 * @param {number} maxLength 
 * @returns {string} sanitized input
 */
export function sanitizeText(input, maxLength = 5000) {
    if (!input || typeof input !== 'string') return '';

    let sanitized = input.trim();

    // Limit length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    // Remove null bytes
    sanitized = sanitized.replace(/\0/g, '');

    // HTML entity encode to prevent XSS
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

    return sanitized;
}

/**
 * Validate message/comment field
 * @param {string} message 
 * @param {number} minLength 
 * @param {number} maxLength 
 * @returns {Object} { isValid: boolean, error: string|null, sanitized: string }
 */
export function validateMessage(message, minLength = 10, maxLength = 5000) {
    if (!message || typeof message !== 'string') {
        return { isValid: false, error: 'Message is required', sanitized: '' };
    }

    const trimmed = message.trim();

    if (trimmed.length < minLength) {
        return { isValid: false, error: `Message must be at least ${minLength} characters`, sanitized: '' };
    }

    if (trimmed.length > maxLength) {
        return { isValid: false, error: `Message must be less than ${maxLength} characters`, sanitized: '' };
    }

    // Check for SQL injection
    if (detectSQLInjection(trimmed)) {
        return { isValid: false, error: 'Message contains invalid content', sanitized: '' };
    }

    // Check for XSS
    if (detectXSS(trimmed)) {
        return { isValid: false, error: 'Message contains invalid content', sanitized: '' };
    }

    // Sanitize
    const sanitized = sanitizeText(trimmed, maxLength);

    return { isValid: true, error: null, sanitized };
}

/**
 * Detect credit card patterns (to prevent accidental submission)
 * @param {string} input 
 * @returns {boolean} true if credit card detected
 */
export function detectCreditCard(input) {
    if (!input || typeof input !== 'string') return false;

    const ccPattern = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
    return ccPattern.test(input);
}

/**
 * Comprehensive form validation
 * @param {Object} formData 
 * @returns {Object} { isValid: boolean, errors: Object, sanitized: Object }
 */
export function validateContactForm(formData) {
    const errors = {};
    const sanitized = {};

    // Validate first name
    const firstNameResult = validateName(formData.firstName, 'First name');
    if (!firstNameResult.isValid) {
        errors.firstName = firstNameResult.error;
    }
    sanitized.firstName = sanitizeText(formData.firstName || '', 50);

    // Validate last name
    const lastNameResult = validateName(formData.lastName, 'Last name');
    if (!lastNameResult.isValid) {
        errors.lastName = lastNameResult.error;
    }
    sanitized.lastName = sanitizeText(formData.lastName || '', 50);

    // Validate email
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
        errors.email = emailResult.error;
    }
    sanitized.email = (formData.email || '').trim().toLowerCase();

    // Validate phone (optional)
    if (formData.phone) {
        const phoneResult = validatePhone(formData.phone);
        if (!phoneResult.isValid) {
            errors.phone = phoneResult.error;
        }
    }
    sanitized.phone = sanitizeText(formData.phone || '', 20);

    // Validate subject
    if (!formData.subject || !formData.subject.trim()) {
        errors.subject = 'Please select a subject';
    }
    sanitized.subject = sanitizeText(formData.subject || '', 100);

    // Validate message
    const messageResult = validateMessage(formData.comments);
    if (!messageResult.isValid) {
        errors.comments = messageResult.error;
    } else {
        // Check for credit card in message
        if (detectCreditCard(formData.comments)) {
            errors.comments = 'Please do not include credit card information in your message';
        }
    }
    sanitized.comments = messageResult.sanitized;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitized,
    };
}

export default {
    validateEmail,
    validatePhone,
    validateName,
    validateMessage,
    validateContactForm,
    sanitizeText,
    detectSQLInjection,
    detectXSS,
    detectCreditCard,
};

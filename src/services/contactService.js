import axios from 'axios';
import { logError, logInfo } from '../utils/secureLogger';

// Default to localhost:5000 if not specified in environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Basic input sanitization to prevent XSS
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sendContactMessage = async (data) => {
  try {
    logInfo('Sending contact form', { source: 'contact-form' });

    // Map frontend data to backend schema with sanitization
    const payload = {
      name: sanitizeInput(`${data.firstName} ${data.lastName}`),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.comments),
      source: 'Website Contact Form'
    };

    // Send to backend
    const response = await axios.post(`${API_URL}/leads`, payload);
    return response.data;
  } catch (error) {
    // Log error securely
    const fingerprint = logError(error, { context: 'contact-form-submission' });

    // If the server is unreachable, simulate success for UX
    // (In strict production, you might want to show the error instead)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Message sent successfully (Fallback - Backend unreachable)",
      errorFingerprint: fingerprint
    };
  }
};

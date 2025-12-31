import React, { useState, useRef, useEffect } from 'react';
import { sendContactMessage } from '../../services/contactService';
import { validateContactForm } from '../../utils/inputValidator';
import { checkRateLimit, recordAttempt, getTimeRemainingMessage } from '../../utils/rateLimiter';

const services = [
  "Financial Planning",
  "Investment Management",
  "Retirement Planning",
  "Insurance & Risk Solutions",
  "Estate Planning",
  "Tax Planning & Compliance",
  "Portfolio Management",
  "Corporate Advisory"
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    comments: '',
    website_url: '', // Honeypot field - should remain empty
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [rateLimitError, setRateLimitError] = useState(null);
  const formStartTime = useRef(Date.now());

  useEffect(() => {
    // Reset form start time when component mounts
    formStartTime.current = Date.now();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRateLimitError(null);

    // 1. Check honeypot (bot detection)
    if (formData.website_url) {
      // Silent rejection - don't tell bots what went wrong
      setSubmitStatus('error');
      return;
    }

    // 2. Check timing (bot detection - form must take at least 3 seconds)
    const timeTaken = Date.now() - formStartTime.current;
    if (timeTaken < 3000) {
      setErrors({ _global: 'Please take a moment to review your message before submitting.' });
      return;
    }

    // 3. Check rate limit
    const rateCheck = checkRateLimit('contact-form', {
      maxAttempts: 3,
      windowMs: 15 * 60 * 1000, // 15 minutes
      blockDurationMs: 30 * 60 * 1000, // 30 minutes
    });

    if (!rateCheck.allowed) {
      setRateLimitError(rateCheck.error);
      return;
    }

    // 4. Validate form with comprehensive security checks
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // 5. Submit form
    setIsSubmitting(true);
    try {
      // Record attempt for rate limiting
      recordAttempt('contact-form');

      await sendContactMessage(validation.sanitized);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        comments: '',
        website_url: '',
      });
      // Reset form start time
      formStartTime.current = Date.now();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 h-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="First name here"
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />
            {errors.firstName && (
              <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Last name here"
              aria-invalid={errors.lastName ? 'true' : 'false'}
            />
            {errors.lastName && (
              <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Add email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Add phone number"
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent appearance-none`}
                aria-invalid={errors.subject ? 'true' : 'false'}
              >
                <option value="">Select a subject</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {errors.subject && (
              <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>

          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
            }}
            aria-hidden="true"
          />

          <div className="lg:col-span-2">
            <label htmlFor="comments" className="block text-gray-700 font-semibold mb-2">
              Comments / Questions <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-3 rounded-lg border ${errors.comments ? 'border-red-500' : 'border-gray-300'
                } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Comments"
              aria-invalid={errors.comments ? 'true' : 'false'}
            />
            {errors.comments && (
              <p className="mt-1 text-red-500 text-sm">{errors.comments}</p>
            )}
          </div>
        </div>

        {/* Global errors */}
        {errors._global && (
          <div className="rounded-md bg-yellow-50 p-4">
            <p className="text-sm text-yellow-700">{errors._global}</p>
          </div>
        )}

        {/* Rate limit error */}
        {rateLimitError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{rateLimitError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-lg 
            transition-all duration-200 hover:bg-[#B99A2F] focus:outline-none focus:ring-2 
            focus:ring-[#D4AF37] focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p className="text-green-600 text-center mt-4 font-medium">
            We have received your details. Our wealth advisors will be in touch with you in less than 24 hrs.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600 text-center mt-4">
            Sorry, there was an error sending your message. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;

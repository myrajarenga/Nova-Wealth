import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    return newErrors;
  };

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
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Mock API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
            placeholder="Enter your full name"
            aria-invalid={errors.fullName ? 'true' : 'false'}
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
            placeholder="Enter your email address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
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
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
            placeholder="Enter your phone number"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
            placeholder="How can we help you?"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-lg 
            transition-all duration-200 hover:bg-[#B99A2F] focus:outline-none focus:ring-2 
            focus:ring-[#D4AF37] focus:ring-offset-2 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p className="text-green-600 text-center mt-4">
            Thank you! Your message has been sent successfully.
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
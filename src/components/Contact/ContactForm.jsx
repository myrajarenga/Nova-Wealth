import React, { useState } from 'react';
import { sendContactMessage } from '../../services/contactService';

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
    subject: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.comments.trim()) {
      newErrors.comments = 'Comments are required';
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
        await sendContactMessage(formData);
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', comments: '' });
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Add email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.comments ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
              placeholder="Comments"
              aria-invalid={errors.comments ? 'true' : 'false'}
            />
            {errors.comments && (
              <p className="mt-1 text-red-500 text-sm">{errors.comments}</p>
            )}
          </div>
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
import React from 'react';
import { Link } from 'react-router-dom';

const OfficeDetails = () => {


  return (
    <div className="space-y-8">
      {/* Office Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">
          Our Office
        </h2>
        
        {/* Address */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Address</p>
            <p className="text-gray-600 mt-1">
              Office 47, Park Court Ojijo Road, Parklands<br />
              Nairobi, KE 00100
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Phone</p>
            <a 
              href="tel:+254700555555" 
              className="text-gray-600 hover:text-[#D4AF37] transition-colors mt-1 block"
            >
              +254 700 555 555
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <a 
              href="mailto:info@novawealth.com" 
              className="text-gray-600 hover:text-[#D4AF37] transition-colors mt-1 block"
            >
              info@novawealth.com
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Business Hours</p>
            <p className="text-gray-600 mt-1">
              Monday - Friday: 8:00 AM - 5:00 PM<br />
              Saturday & Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Consultation Button */}
      <Link
        to="/assessment"
        className="w-full block text-center bg-black text-white font-bold py-4 px-6 rounded-lg
          transition-all duration-200 hover:bg-black/90 focus:outline-none focus:ring-2
          focus:ring-black focus:ring-offset-2"
        aria-label="Book Appointment"
      >
        Book Appointment
      </Link>
    </div>
  );
};

export default OfficeDetails;
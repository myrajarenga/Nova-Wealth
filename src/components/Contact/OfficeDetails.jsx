import React from 'react';

const OfficeDetails = () => {
  return (
    <div className="h-full">
      {/* Office Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 h-full">
        <h2 className="font-montserrat text-2xl font-bold text-black mb-6">
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
            <p className="font-semibold text-black">Address</p>
            <p className="text-black mt-1">
              Office 47, Park Court Ojijo Road, Parklands <br />
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
            <p className="font-semibold text-black">Call</p>
            <a 
              href="tel:+254 737648915" 
              className="text-black hover:text-[#D4AF37] transition-colors mt-1 block"
            >
              +254 737648915
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2.01c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.45 1.33 4.96L2 22l5.25-1.37a9.93 9.93 0 004.79 1.23h.01c5.49 0 9.95-4.45 9.95-9.94 0-2.66-1.04-5.16-2.93-7.04A9.93 9.93 0 0012.04 2Zm0 1.8c2.17 0 4.21.84 5.74 2.37a8.08 8.08 0 012.37 5.73c0 4.48-3.65 8.12-8.13 8.12-1.42 0-2.8-.37-4.02-1.08l-.29-.16-3.12.81.83-3.04-.19-.31A8.09 8.09 0 013.9 12.1c0-4.47 3.64-8.12 8.14-8.12Zm-3.3 3.46c-.17-.38-.34-.38-.5-.39h-.43c-.15 0-.4.06-.6.28-.21.22-.79.77-.79 1.88 0 1.11.81 2.18.92 2.33.11.15 1.56 2.49 3.83 3.4 1.89.75 2.27.61 2.68.57.41-.04 1.32-.54 1.51-1.07.19-.53.19-.99.13-1.08-.06-.09-.21-.15-.43-.26-.22-.11-1.32-.65-1.52-.73-.2-.08-.35-.11-.5.11-.15.22-.57.73-.7.88-.13.15-.26.17-.48.06-.22-.11-.91-.33-1.73-1.05-.64-.57-1.07-1.28-1.2-1.49-.13-.22-.01-.34.1-.45.1-.1.22-.26.34-.39.11-.13.15-.22.23-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.19-.7-1.64Z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-black">WhatsApp</p>
            <a
              href="https://wa.me/254737648915"
              className="text-black hover:text-[#D4AF37] transition-colors mt-1 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              +254 737648915
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
            <p className="font-semibold text-black">Email</p>
            <a 
              href="mailto:info@novawealth.co.ke" 
              className="text-black hover:text-[#D4AF37] transition-colors mt-1 block"
            >
              info@novawealth.co.ke
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-black">Business Hours</p>
            <p className="text-black mt-1">
              Monday - Friday: 8:00 AM - 5:00 PM<br />
              Saturday & Sunday: Closed
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-[#B99A2F] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
        >
          Subscribe
        </button>
      </div>

    </div>
  );
};

export default OfficeDetails;

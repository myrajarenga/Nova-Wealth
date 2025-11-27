import React from 'react';

// SupportSection — contact details and hours
const SupportSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto text-center">
        <h2 className="font-montserrat text-lg md:text-xl font-semibold text-black">Need Additional Support?</h2>
        <p className="font-opensans text-[#2C3E50] mt-2">Our client support team is available Monday through Friday, 8:00 AM to 5:00 PM EAT</p>
        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center font-opensans text-sm">
          <div className="flex items-center gap-2 text-black">
            <span>📞</span>
            <a href="tel:+254737648915" className="hover:underline">+254 737648915</a>
          </div>
          <div className="flex items-center gap-2 text-black">
            <span>✉️</span>
            <a href="mailto:info@novawealth.co.ke" className="hover:underline">info@novawealth.co.ke</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;



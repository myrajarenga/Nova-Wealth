import React from 'react';

// CallToActionBar — gold band with white title and white button
const CallToActionBar = () => {
  return (
    <section className="bg-[#D4AF37] py-10">
      <div className="container mx-auto text-center">
        <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white">
          Ready to Optimize Your Wealth Strategy?
        </h3>
        <p className="font-opensans text-white/90 max-w-2xl mx-auto mt-2">
          Connect with your dedicated advisor today to discuss personalized investment solutions and comprehensive
          financial planning.
        </p>
        <a href="/contact" className="inline-block mt-6 px-5 py-2 rounded-md bg-white text-black border border-white font-montserrat hover:opacity-90">
          Contact Your Advisor
        </a>
      </div>
    </section>
  );
};

export default CallToActionBar;



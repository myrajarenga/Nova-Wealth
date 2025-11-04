import React from 'react';

// CTASection — gold background, centered layout, contrasting buttons
const CTASection = () => {
  return (
    <section className="bg-[#D4AF37]">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-black">Partner With NovaWealth Today.</h2>
        <p className="font-opensans max-w-2xl mx-auto text-black/80 mt-3">
          Schedule a consultation with our team and discover how we can help secure your financial future.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-md bg-black text-white font-montserrat hover:opacity-90"
          >
            Schedule Consultation
          </a>
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-md border border-white text-black bg-white/0 hover:bg-white/10 font-montserrat"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
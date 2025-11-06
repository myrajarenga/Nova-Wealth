import React from 'react';

// CTASection — gold background, centered layout, contrasting buttons
const CTASection = () => {
  return (
    <section className="bg-[#D4AF37]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-black">Partner With NovaWealth Today.</h2>
        <p className="font-opensans max-w-2xl mx-auto text-black/80 mt-4">
          Schedule a consultation with our team and discover how we can help secure your financial future.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-md border border-white text-white bg-transparent font-montserrat hover:bg-white/10"
          >
            Schedule Consultation
          </a>
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-md bg-white text-black font-montserrat hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
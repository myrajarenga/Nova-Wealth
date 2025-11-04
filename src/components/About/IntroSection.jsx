import React from 'react';

// IntroSection — black background, centered content, thin gold divider
const IntroSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-montserrat text-3xl md:text-4xl font-bold">About Us</h1>
        <div className="border-b border-[#D4AF37] w-24 mx-auto my-4" aria-hidden="true" />
        <p className="font-opensans max-w-3xl mx-auto text-gray-300">
          NovaWealth empowers clients through data‑driven, personalized wealth management — blending rigorous research,
          disciplined risk governance, and human insight to help you build, protect, and sustain multi‑generational wealth.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
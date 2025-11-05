import React from 'react';

// IntroSection — black background, centered content, thin gold divider
const IntroSection = () => {
  return (
    <section className="bg-black text-[#D4AF37]">
      
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-24 text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl font-bold tracking-tight">About Us</h1>
        <div className="border-b border-[#D4AF37] w-28 mx-auto my-6" aria-hidden="true" />
        <p className="font-opensans max-w-3xl mx-auto text-gray-300 text-lg">
          NovaWealth empowers clients through data‑driven, personalized wealth management — blending rigorous research,
          disciplined risk governance, and human insight to help you build, protect, and sustain multi‑generational wealth.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
import React from 'react';

// OurStory — simplified, spacious single-column layout with dynamic founding year
const OurStory = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="bg-#ffffff text- #000000">
      
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center">Our Story</h2>       <div className="border-b border-[#D4AF37] w-24 mx-auto my-6" aria-hidden="true" />
        <article className="font-opensans max-w-3xl mx-auto space-y-6 text-black">
          <p>
            Founded in {currentYear}, NovaWealth is built for clients who want clarity, confidence, and a truly personalized approach to building and protecting wealth.
          </p>
          <p>
            We blend institutional‑grade research with thoughtful financial planning and modern portfolio construction, focusing on what matters most: aligning strategies to your goals and values.
          </p>
          <p>
            Our philosophy is simple — transparent communication, disciplined risk management, and data‑driven insight, delivered with genuine care.
          </p>
        </article>
      </div>
    </section>
  );
};

export default OurStory;
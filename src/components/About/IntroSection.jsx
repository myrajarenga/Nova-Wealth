import React from 'react';

const IntroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="About Nova Wealth hero"
    >
      {/* Background with overlay */}
      <div
        className="relative h-[500px] md:h-[600px] w-full bg-center bg-cover"
        style={{
          backgroundImage: `url('/images/about us page background image.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="font-montserrat text-[#D4AF37] text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            About Nova Wealth
          </h1>

          <p className="font-opensans text-white/90 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
            We build enduring legacies through expert financial planning, strategic investments, and
            a commitment to long-term prosperity for every generation.
          </p>

          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#c39b32] transition-all duration-300 shadow-lg"
            >
              Talk to Our Advisors
            </a>
          </div>
        </div>
      </div>

      {/* Subtext or scroll hint (optional aesthetic touch) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#D4AF37] text-sm tracking-wide">
        Here for generations
      </div>
    </section>
  );
};

export default IntroSection;

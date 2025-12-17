import React from "react";

const IntroSection = () => {
  return (
    <section
      id="about-nova-wealth"
      className="relative w-full overflow-hidden"
      aria-label="About Nova Wealth hero"
    >
      

      {/* HERO IMAGE LAYER */}
      <div className="relative h-[500px] md:h-[600px] w-full">
        <img
          src="/images/about-us -background.png"
          alt="About Nova Wealth"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="font-montserrat text-[#D4AF37] text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            About Nova Wealth
          </h1>

          <p className="font-opensans text-white/90 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
            At Nova Wealth, we believe true wealth is more than numbers—it is
            security, legacy, and the freedom to live with purpose. Founded in
            Nairobi, we are a boutique wealth management firm dedicated to
            guiding High Net Worth Individuals, working professionals, business
            owners, families, expatriates, diaspora clients, SMEs, and
            corporates toward financial clarity and resilience.
          </p>

          <p className="font-opensans text-white/90 text-lg md:text-xl max-w-3xl mt-4 leading-relaxed">
            What sets us apart is our boutique philosophy: we take the time to
            understand your ambitions, values, and challenges, then design
            tailored pathways that protect today while building tomorrow.
            Whether you are growing a business, securing your family’s future,
            or planning across borders, Nova Wealth is your trusted partner in
            navigating complexity with confidence.
          </p>

          <p className="font-montserrat font-bold text-[#D4AF37] text-base md:text-lg mt-6">
            Nova Wealth. Securing Tomorrow’s Legacy, Today.
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#c39b32] transition-all duration-300 shadow-lg"
            >
              Talk to Our Advisors
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

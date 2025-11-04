import React from 'react';

// VisionSection — dark navy background, counters, gold accents, subtle fade-in
const VisionSection = () => {
  return (
    <section className="bg-[#0b1420] text-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-center mb-6">Our Vision & Impact</h2>
        <p className="font-opensans text-center text-gray-300 max-w-3xl mx-auto mb-10">
          We measure success by the clarity of your plan and the confidence to follow it. Our data‑driven approach delivers
          sustainable outcomes across markets.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-opacity duration-700">
          <div className="text-center p-6 rounded-xl bg-white/5">
            <div className="text-[#D4AF37] font-montserrat text-3xl font-bold">500+</div>
            <div className="font-opensans text-gray-300">Clients Empowered</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5">
            <div className="text-[#D4AF37] font-montserrat text-3xl font-bold">10+</div>
            <div className="font-opensans text-gray-300">Years Combined Experience</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5">
            <div className="text-[#D4AF37] font-montserrat text-3xl font-bold">5</div>
            <div className="font-opensans text-gray-300">African Markets Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
import React from 'react';
import heroImg from '../../assets/images/wealth-meeting.jpg';

// Intro hero — background image with dark overlay, gold title and light subtitle
const IntroSection = () => {
  return (
    <section
      className="relative w-full"
      aria-label="About Nova Wealth hero"
    >
      <div
        className="relative h-[340px] md:h-[420px] w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-montserrat text-[#D4AF37] text-4xl md:text-5xl font-bold">
            About Nova Wealth
          </h1>
          <p className="font-opensans text-white/90 max-w-2xl mt-4">
            Building lasting wealth through trusted expertise, personalized strategies, and unwavering
            commitment to our clients' financial success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
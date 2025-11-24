import React from "react";
import { motion } from "framer-motion";

const heroImages = [
  "/images/Office -background1.jpg",
  "/images/Office -background2.jpg",
  "/images/Office -background3.jpg",
  
];

const IntroSection = () => {
  return (
    <section
      id="about-nova-wealth"
      className="relative w-full overflow-hidden"
      aria-label="About Nova Wealth hero"
    >
      

      {/* HERO IMAGE LAYER */}
      <div className="relative h-[500px] md:h-[600px] w-full">
        {heroImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: index * 6, // rotates every 6 seconds
            }}
            style={{
              animation: "fadeSlide 24s infinite",
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="font-montserrat text-[#D4AF37] text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            About Nova Wealth
          </h1>

          <p className="font-opensans text-white/90 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
            We build enduring legacies through expert financial planning,
            strategic investments, and a commitment to long-term prosperity for
            every generation.
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

      {/* Bottom text */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#D4AF37] text-sm tracking-wide">
        Here for generations
      </div>

      {/* CUSTOM KEYFRAMES */}
      <style>{`
        @keyframes fadeSlide {
          0% { opacity: 0; }
          10% { opacity: 1; }
          40% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default IntroSection;

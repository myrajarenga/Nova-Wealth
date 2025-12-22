import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroSection = () => {
  const images = [
    "/images/about-us -background.png",
    "/images/about-us2.png",
    "/images/about-us3.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      id="about-nova-wealth"
      className="relative w-full overflow-hidden bg-black min-h-[650px] md:min-h-[700px] flex items-center justify-center md:items-start placeholder-black"
      aria-label="About Nova Wealth hero"
    >
      {/* SEAMLESS IMAGE LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="About Nova Wealth Story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlay for professional depth and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-[1]" />

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center py-20 md:pt-20 md:pb-20 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-montserrat text-[#D4AF37] text-4xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-8"
        >
          At Nova Wealth
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="font-montserrat text-white text-base md:text-xl leading-relaxed drop-shadow-md font-medium">
            We believe true wealth is more than numbers, it is security, legacy, and the freedom to live with purpose. Founded in Nairobi, we are a boutique wealth management firm dedicated to guiding <span className="text-[#D4AF37] font-bold">High Net Worth Individuals</span>, <span className="text-[#D4AF37] font-bold">Working Professionals</span>, <span className="text-[#D4AF37] font-bold">Business Owners</span>, <span className="text-[#D4AF37] font-bold">Families</span>, <span className="text-[#D4AF37] font-bold">Expatriates</span>, <span className="text-[#D4AF37] font-bold">Diaspora Clients</span>, <span className="text-[#D4AF37] font-bold">SMEs</span>, and <span className="text-[#D4AF37] font-bold">Corporates</span> toward financial clarity and resilience.
          </p>

          <p className="font-montserrat text-white text-base md:text-xl leading-relaxed drop-shadow-md font-medium">
            What sets us apart is our boutique philosophy. We take the time to understand your ambitions, values, and challenges, then design tailored pathways that protect today while building tomorrow. Whether you are growing a business, securing your family’s future, or planning across borders, Nova Wealth is your trusted partner in navigating complexity with confidence.
          </p>

          <p className="font-montserrat font-bold text-[#D4AF37] text-lg md:text-xl mt-10 tracking-wide">
            Nova Wealth. Securing Tomorrow’s Legacy, Today.
          </p>

          <div className="pt-8">
            <a
              href="/contact"
              className="inline-block bg-[#D4AF37] text-black font-bold px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1"
            >
              Talk to Our Advisors
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;

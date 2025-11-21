import React, { useState } from "react";
import { motion } from "framer-motion";

const heroImages = [
  "/images/Office -background1.jpg",
  "/images/Office -background2.jpg",
  "/images/Office -background3.jpg",
  
];

const IntroSection = () => {
  const [open, setOpen] = useState(false)
  const anchors = [
    { label: 'About Nova Wealth', id: 'about-nova-wealth' },
    { label: 'Our Story', id: 'our-story' },
    { label: 'Our Values', id: 'our-values' },
    { label: 'Why Nova Wealth', id: 'why-nova-wealth' },
    { label: 'Our Process', id: 'our-process' },
    { label: 'Meet Our Founders', id: 'meet-our-founders' },
  ]

  function scrollToId(id) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset
    const offset = 90
    window.scrollTo({ top: y - offset, behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <section
      id="about-nova-wealth"
      className="relative w-full overflow-hidden"
      aria-label="About Nova Wealth hero"
    >
      {/* TOP DROPDOWN NAV OVERLAY */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur border-b border-[#FFD700]/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="font-montserrat font-bold text-[#333333]">About Navigation</div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFD700] text-black hover:bg-[#FFF5CC]"
            >
              <span className="font-montserrat font-semibold">Sections</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg border border-[#FFD700]/60 bg-white shadow-lg">
                {anchors.map(a => (
                  <button
                    key={a.id}
                    onClick={() => scrollToId(a.id)}
                    className="w-full text-left px-4 py-2 font-opensans text-[#333333] hover:bg-[#FFF5CC] hover:text-black"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
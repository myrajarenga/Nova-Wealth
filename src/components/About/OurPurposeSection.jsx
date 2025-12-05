import React from 'react';
import { motion } from 'framer-motion';

const OurPurposeSection = () => {
  const items = [
    {
      title: 'Our Mission',
      desc: `To empower individuals, families, and entrepreneurs to make confident, 
      values-based financial decisions through modern, transparent, and holistic 
      wealth strategies designed for long-term growth.`,
      icon: '🎯',
    },
    {
      title: 'Our Vision',
      desc: `To redefine what wealth means for a connected generation — where financial 
      success is measured not just by numbers, but by the ability to create freedom, 
      impact, and legacy across Africa and beyond.`,
      icon: '🌍',
    },
  ];

  return (
    <section id="our-purpose" className="relative bg-gradient-to-b from-white via-[#FAF8F2] to-[#F9F7F1] text-black py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-montserrat text-3xl md:text-4xl font-bold text-[#1F2937]"
        >
          Our Purpose
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-opensans text-black/80 text-lg max-w-3xl mx-auto mt-4 leading-relaxed"
        >
          Everything we do at Nova Wealth stems from a single philosophy — that wealth
          should serve life, not the other way around. Our purpose is to bridge modern
          innovation with timeless financial wisdom, guiding every client toward clarity
          and confidence in their financial journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {items.map((it, index) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, type: "spring", bounce: 0.2 }}
              className="rounded-2xl bg-white shadow-md border border-[#EAEAEA] p-8 text-left hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-2xl font-bold mb-4" aria-hidden="true">
                {it.icon}
              </div>
              <h3 className="font-montserrat text-2xl font-semibold text-[#1F2937] mb-3">
                {it.title}
              </h3>
              <p className="font-opensans text-black/80 leading-relaxed text-[1.05rem]">
                {it.desc}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <p className="font-opensans text-[1.1rem] leading-relaxed text-[#2C3E50] italic">
            “At Nova Wealth, we see finance as a form of stewardship — a way to honor your story,
            protect your future, and create lasting value for generations.”
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPurposeSection;

import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "Innovation",
    desc: "Forward-thinking strategies and digital tools to enhance outcomes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 3a7 7 0 00-4 12.75V18a1 1 0 001 1h6a1 1 0 001-1v-2.25A7 7 0 0012 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Expertise",
    desc: "Institutional-grade research and disciplined risk management.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 15l3-6 3 4 4-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 11v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Client Focus",
    desc: "Personalized portfolios aligned with goals, values, and risk.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 21a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    desc: "Transparent fees, clear reporting, and fiduciary responsibility.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    desc: "Working with your advisors to deliver holistic solutions.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="7" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 19a4.5 4.5 0 019 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11.5 19a4.5 4.5 0 019 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ValuesGrid = () => {
  return (
    <section id="our-values" className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-montserrat text-3xl md:text-4xl font-bold text-center"
        >
          Our Values
        </motion.h2>

        <div className="border-b border-[#D4AF37] w-24 mx-auto my-6" aria-hidden="true" />

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, index) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-black/10 bg-white p-8 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/90 flex items-center justify-center text-black text-2xl shadow-md mx-auto mb-4" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-center">{v.title}</h3>
              <p className="font-opensans text-gray-700 text-center mt-2 leading-relaxed">{v.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesGrid;

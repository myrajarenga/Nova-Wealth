import React from "react";
import { motion } from "framer-motion";

const values = [
  { title: "Innovation", desc: "Forward-thinking strategies and digital tools to enhance outcomes.", icon: "💡" },
  { title: "Expertise", desc: "Institutional-grade research and disciplined risk management.", icon: "📈" },
  { title: "Client Focus", desc: "Personalized portfolios aligned with goals, values, and risk.", icon: "🎯" },
  { title: "Integrity", desc: "Transparent fees, clear reporting, and fiduciary responsibility.", icon: "🛡️" },
  { title: "Collaboration", desc: "Working with your advisors to deliver holistic solutions.", icon: "🤝" },
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

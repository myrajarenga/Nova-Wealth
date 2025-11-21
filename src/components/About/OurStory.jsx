import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section id="our-story" className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        {/* Title */}
        <motion.h2
          className="font-montserrat text-3xl md:text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Story
        </motion.h2>

        {/* Subtle divider */}
        <motion.div
          className="border-b border-[#D4AF37] w-24 mx-auto my-5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10 md:mt-14">
          {/* Left: Narrative */}
          <motion.article
            className="font-opensans space-y-6 text-[1.05rem] leading-relaxed text-gray-900"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-900">
              In 2024, a group of seasoned wealth advisors got together and decided to do something about the investment limitations which continue to plague the bank-owned, large conglomerates, and other mainstream investment dealers. Most clients are served by the so-called financial advisors who are really investment or insurance sales reps, paid by commissions on investments they are incentivized to sell. These leaves clients exposed.
            </p>
            
            <p className="text-gray-900">
              Founded in 2025 by a small team of passionate advisors, our story
              started not in boardrooms but in real conversations — about
              purpose, family, and legacy. We saw that traditional financial
              services were often built around products, not people.
            </p>
            
            <p className="text-gray-900">
              Today, we’re reimagining what wealth management means for a
              connected, digital generation. For us, it’s more than numbers —
              it’s about clarity, confidence, and continuity.
            </p>

            <motion.div
              className="mt-8 border-l-4 border-[#D4AF37] pl-5 italic text-[#2C3E50]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              “We built Nova Wealth on trust, empathy, and transparency —
              because we believe financial advice should empower, not overwhelm.”
            </motion.div>
          </motion.article>

          {/* Right: Image / visual */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-md relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/collaboration imgage.png"
              alt="Team collaboration at Nova Wealth"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";



const members = [
  {
    name: "Janet Mavisi",
    role: "Co-Founder",
    specialty:
      "A seasoned Relationship Manager and Wealth Advisor with over 15 years of experience serving high-net-worth clients across banking and insurance sectors. Known for her client-centric advisory style and commitment to long-term financial outcomes.",
    experience: "15+ years in Wealth Advisory",
    img: "/images/janet-image.jpg",
    linkedin: "https://www.linkedin.com/in/mavisi-janet-880ab716b/"
  },
  {
    name: "Frankline Mutea",
    role: "Co-Founder",
    specialty:
      "An accomplished investment specialist with 16 years advising high-net-worth individuals and corporate institutions. Focused on disciplined investment governance and long-term capital growth.",
    experience: "16+ years in Investments & Strategy",
    img: "/images/frankline-image.jpg",
    linkedin: "https://www.linkedin.com/in/muteafrankline//"

  },
];

const TeamGrid = () => {
  return (
    <section className="bg-white text-black py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-montserrat text-4xl md:text-5xl font-bold text-center"
        >
          Meet Our Leadership
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-opensans text-center text-gray-600 max-w-3xl mx-auto mt-4 mb-12"
        >
          A team driven by expertise, integrity, and a shared commitment to shaping lasting wealth.
        </motion.p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-10">
          {members.map((m, index) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-[#D4AF37]/50 shadow-md"
                />
              </div>

              <h3 className="font-montserrat text-2xl font-semibold text-[#D4AF37]">
                {m.name}
              </h3>

              <p className="text-gray-700 mt-1 font-semibold">{m.role}</p>

              <p className="text-gray-600 mt-3 leading-relaxed">{m.specialty}</p>

              <p className="text-gray-500 mt-4 italic">{m.experience}</p>
                          {/* LinkedIn Button */}
              <div className="mt-5 flex justify-center">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 bg-[#0A66C2] 
                    text-white px-4 py-2 rounded-lg
                    hover:bg-[#084a8d] transition-all duration-300
                    shadow-sm hover:shadow-md
                  "
                >
                  <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="18"
                   height="18"
                   viewBox="0 0 24 24"
                   fill="currentColor"
>
                   <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.56h4.56V24H.22V8.56zM8.68 8.56h4.37v2.1h.06c.61-1.15 2.1-2.36 4.33-2.36 4.63 0 5.48 3.05 5.48 7.02V24h-4.56V16.1c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.05-3.02 4.15V24H8.68V8.56z"/>
                  </svg>

                  <span className="font-opensans text-sm">LinkedIn</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;

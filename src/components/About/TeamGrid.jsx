import React from "react";
import { motion } from "framer-motion";
import { FaRegEnvelope, FaPhone, FaLinkedin, FaWhatsapp } from "react-icons/fa";



const members = [
  {
    name: "Janet Mavisi",
    role: "Co-Founder",
    specialty:
      "A seasoned Relationship Manager and Wealth Advisor with over 15 years of experience serving high-net-worth clients across banking and insurance sectors. Known for her client-centric advisory style and commitment to long-term financial outcomes.",
    experience: "15+ years in Wealth Advisory",
    img: "/images/janet-image.png",
    linkedin: "https://www.linkedin.com/in/mavisi-janet-880ab716b/",
    email: "mailto:janet.mavisi@novawealth.co.ke",
    phone: "tel:+254721479494",
    whatsapp: "https://wa.me/254700000000"
  },
  {
    name: "Frankline Mutea",
    role: "Co-Founder",
    specialty:
      "An accomplished investment specialist with 16 years advising high-net-worth individuals and corporate institutions. Focused on disciplined investment governance and long-term capital growth.",
    experience: "16+ years in Investments & Strategy",
    img: "/images/frankline-image.png",
    linkedin: "https://www.linkedin.com/in/muteafrankline//",
    email: "mailto:frankline.mutea@novawealth.co.ke",
    phone: "tel:+254700000000",
    whatsapp: "https://wa.me/254700000000"

  },
];

const TeamGrid = () => {
  return (
    <section id="meet-our-founders" className="bg-white text-black py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-montserrat text-4xl md:text-5xl font-bold text-center"
        >
          Meet Our Founders
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
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="w-full" style={{ aspectRatio: "16 / 10" }}>
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 px-8 pb-8 pt-6 text-center">
                <h3 className="font-montserrat text-2xl font-semibold text-[#D4AF37]">
                  {m.name}
                </h3>

                <p className="text-gray-700 mt-1 font-semibold">{m.role}</p>

                <p className="text-gray-600 mt-3 leading-relaxed">{m.specialty}</p>

                <p className="text-gray-500 mt-4 italic">{m.experience}</p>

                <div className="mt-5 flex justify-center gap-4">
                  <a href={m.email} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-[#333333] hover:border-[#D4AF37] hover:text-[#D4AF37]" aria-label="Email">
                    <FaRegEnvelope size={18} />
                  </a>
                  <a href={m.phone} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-[#333333] hover:border-[#D4AF37] hover:text-[#D4AF37]" aria-label="Call">
                    <FaPhone size={18} />
                  </a>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-[#333333] hover:border-[#0A66C2] hover:text-[#0A66C2]" aria-label="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                  <a href={m.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-[#333333] hover:border-[#25D366] hover:text-[#25D366]" aria-label="WhatsApp">
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;

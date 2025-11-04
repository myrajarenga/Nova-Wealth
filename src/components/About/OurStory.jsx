import React from 'react';

// OurStory — two-column layout with milestones and gold year highlights
const OurStory = () => {
  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4 py-14">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-center mb-6">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <article className="bg-white/90 rounded-xl shadow-md p-6">
            <p className="font-opensans text-gray-700">
              Founded in <span className="text-[#D4AF37] font-semibold">2020</span> with a mission to bring transparency and
              innovation to African wealth management. We focus on evidence‑based portfolios, cross‑border planning, and
              personalized guidance that aligns with your goals.
            </p>
            <p className="font-opensans text-gray-700 mt-4">
              Our journey is shaped by a commitment to disciplined risk management, client education, and long‑term value creation.
            </p>
          </article>

          <aside className="space-y-4">
            <div className="rounded-xl bg-black/80 text-white p-5">
              <h3 className="font-montserrat text-lg">Milestones</h3>
              <ul className="font-opensans mt-3 space-y-2">
                <li>
                  <span className="text-[#D4AF37] font-semibold">2021</span> — Expansion into digital advisory and on‑boarding automation.
                </li>
                <li>
                  <span className="text-[#D4AF37] font-semibold">2022</span> — Multi‑asset research capability and global custodian partnerships.
                </li>
                <li>
                  <span className="text-[#D4AF37] font-semibold">2023</span> — 500+ clients served with enhanced planning and reporting.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
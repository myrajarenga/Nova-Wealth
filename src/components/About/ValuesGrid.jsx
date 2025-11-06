import React from 'react';

// ValuesGrid — 5 responsive cards with gold icon, title, description
const values = [
  { title: 'Innovation', desc: 'Forward‑thinking strategies and digital tools to enhance outcomes.', icon: '💡' },
  { title: 'Expertise', desc: 'Institutional‑grade research and disciplined risk management.', icon: '📈' },
  { title: 'Client Focus', desc: 'Personalized portfolios aligned with goals, values, and risk.', icon: '🎯' },
  { title: 'Integrity', desc: 'Transparent fees, clear reporting, and fiduciary responsibility.', icon: '🛡️' },
  { title: 'Collaboration', desc: 'Working with your advisors to deliver holistic solutions.', icon: '🤝' },
];

const ValuesGrid = () => {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center">Our Values</h2>
        <div className="border-b border-[#D4AF37] w-24 mx-auto my-6" aria-hidden="true" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v) => (
            <article key={v.title} className="rounded-xl border border-black/10 bg-white p-8 hover:border-[#D4AF37] hover:shadow-lg transition-shadow space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black text-xl" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="font-montserrat text-xl font-semibold">{v.title}</h3>
              <p className="font-opensans text-gray-700">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesGrid;
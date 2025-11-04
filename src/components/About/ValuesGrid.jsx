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
      <div className="container mx-auto px-4 py-14">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <article key={v.title} className="rounded-xl border border-black/10 bg-black/5 p-6 hover:border-[#D4AF37] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black text-xl mb-3" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-1">{v.title}</h3>
              <p className="font-opensans text-gray-700">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesGrid;
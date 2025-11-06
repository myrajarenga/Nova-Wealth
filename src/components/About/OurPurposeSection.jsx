import React from 'react';

// OurPurposeSection — two cards (Mission, Vision) with gold circular icons
const OurPurposeSection = () => {
  const items = [
    {
      title: 'Our Mission',
      desc:
        'To empower individuals and families to achieve financial confidence through modern, transparent, and values-based wealth management.',
      icon: '🎯',
    },
    {
      title: 'Our Vision',
      desc:
        'To redefine wealth management in Africa through innovation, integrity, and client partnership.',
      icon: '🌍',
    },
  ];

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center">Our Purpose</h2>
        <p className="font-opensans text-black text-center max-w-3xl mx-auto mt-3">
          Guided by our values and unwavering commitment to excellence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {items.map((it) => (
            <article key={it.title} className="rounded-xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-xl" aria-hidden="true">{it.icon}</div>
              <h3 className="font-montserrat text-xl font-semibold mt-4">{it.title}</h3>
              <p className="font-opensans text-black mt-2">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPurposeSection;



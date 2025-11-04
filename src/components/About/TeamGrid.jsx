import React from 'react';

// TeamGrid — responsive grid of member cards with accessible images and hover scale
const members = [
  {
    name: 'Michael Chen',
    role: 'Managing Partner & CEO',
    specialty: 'Wealth strategy and investment governance',
    img: '/images/home page image.png',
    alt: 'Portrait of Michael Chen, Managing Partner and CEO',
  },
  {
    name: 'Sarah Williams',
    role: 'Senior Partner',
    specialty: 'Estate planning and tax optimization',
    img: '/images/HNWI.png',
    alt: 'Portrait of Sarah Williams, Senior Partner',
  },
  {
    name: 'David Adebayo',
    role: 'Partner, Private Clients',
    specialty: 'Cross‑border planning and risk management',
    img: '/images/Global-reach.png',
    alt: 'Portrait of David Adebayo, Partner for Private Clients',
  },
  {
    name: 'Lina K.',
    role: 'Research Lead',
    specialty: 'Multi‑asset research and portfolio construction',
    img: '/images/Enterprise- Focus.png',
    alt: 'Portrait of Lina K., Research Lead',
  },
];

const TeamGrid = () => {
  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4 py-14">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-center">Meet Our Team</h2>
        <p className="font-opensans text-center text-gray-600 mt-2 mb-8">
          Experienced professionals dedicated to your financial success.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <article key={m.name} className="text-center p-6 rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
              <figure className="flex items-center justify-center mb-4">
                <img
                  src={m.img}
                  alt={m.alt}
                  className="w-28 h-28 rounded-full object-cover hover:scale-105 transition-transform"
                />
              </figure>
              <h3 className="font-montserrat font-semibold text-[#D4AF37]">{m.name}</h3>
              <p className="font-opensans text-sm text-gray-700">{m.role}</p>
              <p className="font-opensans text-sm text-gray-600">{m.specialty}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
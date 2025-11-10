import React from 'react';

// TeamGrid — responsive grid of member cards with accessible images and hover scale
const members = [
  //{
    //name: 'Bernard Sanya',
    //role: 'Co-Founder Nova Wealth',
    //specialty: 'Wealth strategy and investment governance',
    //img: '/images/home page image.png',
    //alt: 'Portrait ',
  //},
  {
    name: 'Janet Mavisi',
    role: 'Co- Founder',
    specialty: 'An experienced Relationship Manager and Wealth Advisor with over 15 years of expertise in managing high-net-worth clients across the banking and insurance sectors. She is skilled in delivering personalized financial solutions, fostering long-term client relationships, and helping individuals and families achieve their Financial goals.',
    img: '/images/janet-image.jpg',
    alt: 'Portrait ',
  },
  {
    name: 'Frankline Mutea',
    role: 'Co-Founder',
    specialty: 'An accomplished investment and wealth management expert with over 16 years of experience advising High- net-worth individuals and corporate institutions.',
    img: '/images/frankline-image.jpg',
    alt: 'Portrait ',
  },
  
];

const TeamGrid = () => {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center">Meet Our Team</h2>
        <p className="font-opensans text-center text-gray-600 mt-4 mb-10">
          Experienced professionals dedicated to your financial success.
        </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
          {members.map((m) => (
            <article key={m.name} className="text-center p-8 rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
              <figure className="flex items-center justify-center mb-4">
                <img
                  src={m.img}
                  alt="Team member headshot"
                  className="w-32 h-32 rounded-full object-cover object-center hover:scale-105 transition-transform"
                />
              </figure>
              <h3 className="font-montserrat text-xl font-semibold text-[#D4AF37]">{m.name}</h3>
              <p className="font-opensans text-gray-700 mt-1">{m.role}</p>
              <p className="font-opensans text-gray-600 mt-1">{m.specialty}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
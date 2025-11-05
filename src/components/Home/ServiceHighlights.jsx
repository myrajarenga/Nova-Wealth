import React from 'react';
import './ServiceHighlights.css';

const services = [
  {
    id: 1,
    title: 'Asset Protection',
    description:
      'Safeguard your wealth with comprehensive strategies designed to protect your assets from market volatility and unforeseen circumstances.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Growth Planning',
    description:
      'Develop personalized investment strategies that align with your financial goals and risk tolerance for sustainable long‑term growth.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6H21V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Expert Guidance',
    description:
      'Benefit from seasoned advisors who provide personalized guidance tailored to your unique financial situation.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7006C21.7033 16.047 20.9999 15.5866 20.2 15.3954" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const ServiceHighlights = () => {
  return (
    <section className="hl-section" aria-labelledby="highlights-title">
      <div className="container">
        <div className="hl-header">
          <h2 id="highlights-title" className="hl-title">What We Deliver</h2>
          <p className="hl-subtitle">Three pillars of value designed for clarity, growth, and protection.</p>
        </div>
        <div className="hl-grid">
          {services.map((s) => (
            <article key={s.id} className="hl-card">
              <div className="hl-icon">{s.icon}</div>
              <h3 className="hl-card-title">{s.title}</h3>
              <p className="hl-card-desc">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;



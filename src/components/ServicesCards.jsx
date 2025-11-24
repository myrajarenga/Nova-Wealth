import React from 'react';
import './ServicesCards.css';

const ServicesCards = () => {
  const services = [
    {
      id: 1,
      title: "Financial Planing",
      description: "Comprehensive financial planning to preserve and grow assets.",
      features: [
        'Personalized wealth plans',
        'Portfolio monitoring & rebalancing',
        'Tax-aware strategies'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Investment Management",
      description: "Tailored investment portfolios aligned with client objectives.",
      features: [
        'Risk-profiled asset allocation',
        'Active & passive options',
        'Regular performance reviews'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 14l4-4 4 3 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Retirement Planning",
      description: "Secure your future with income and savings strategies.",
      features: [
        'Retirement income modelling',
        'Pension & savings optimisation',
        'Estate planning & suggestions'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 4v-1M17 4v-1M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Estate Planning",
      description: "Structured legacy planning for future generations.",
      features: [
        'Wills & trusts guidance',
        'Succession planning',
        'Tax-efficient transfers'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Tax Planning",
      description: "Optimize returns through efficient tax strategies.",
      features: [
        'Tax-efficient investing',
        'Compliance & reporting support',
        'Cross-border tax guidance'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 16l4 4M16 20l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Portfolio Management",
      description: "Diversified investment oversight for consistent growth.",
      features: [
        'Diversification across asset classes',
        'Ongoing risk management',
        'Custom mandates available'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 12V3M12 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 7,
      title: "Insurance & Risk Solutions",
      description: "Protect assets and mitigate financial risks.",
      features: [
        'Life & liability reviews',
        'Business continuity cover',
        'Claims support'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8a9 5 0 0118 0H3z" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 8v9a3 3 0 006 0V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 8,
      title: "Corporate Advisory",
      description: "Strategic business planning for sustained profitability.",
      features: [
        'M&A advisory',
        'Capital raising support',
        'Operational performance reviews'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="services-cards">
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              {service.features && (
                <ul className="service-features" aria-label={`${service.title} highlights`}>
                  {service.features.map((f, idx) => (
                    <li key={idx} className="feature-item">{f}</li>
                  ))}
                </ul>
              )}
              <a href="/services" className="learn-more" aria-label={`Learn more about ${service.title}`}>
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesCards;

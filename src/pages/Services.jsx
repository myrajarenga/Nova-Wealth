import React from 'react';
import './Services.css';

const services = [
  { title: 'Wealth Management', description: 'Comprehensive financial planning to preserve and grow assets.' },
  { title: 'Investment Advisory', description: 'Tailored investment portfolios aligned with client objectives.' },
  { title: 'Retirement Planning', description: 'Secure your future with income and savings strategies.' },
  { title: 'Estate Planning', description: 'Structured legacy planning for future generations.' },
  { title: 'Tax Planning', description: 'Optimize returns through efficient tax strategies.' },
  { title: 'Portfolio Management', description: 'Diversified investment oversight for consistent growth.' },
  { title: 'Insurance & Risk Solutions', description: 'Protect assets and mitigate financial risks.' },
  { title: 'Corporate Advisory', description: 'Strategic business planning for sustained profitability.' },
];

const Icon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ServicesPage = () => {
  return (
    <div className="services-page">
      <section className="services-hero" role="banner" aria-label="Services Hero">
        <div className="services-hero-overlay" />
        <img className="services-hero-bg" src="/images/home page image.png" alt="Professional wealth management background" />
        <div className="services-hero-content container">
          <h1 className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtitle">Comprehensive wealth management solutions tailored to your unique goals and aspirations.</p>
        </div>
      </section>

      <section className="services-grid-section container" aria-labelledby="services-heading">
        <h2 id="services-heading" className="section-title">What We Offer</h2>
        <div className="services-grid">
          {services.map((s) => (
            <article key={s.title} className="service-card" aria-label={s.title}>
              <div className="service-card-icon" aria-hidden="true"><Icon /></div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-process-section" aria-labelledby="process-heading">
        <div className="container">
          <h2 id="process-heading" className="section-title">Our Process</h2>
          <p className="section-subtitle">A systematic approach to achieving your financial objectives through personalized strategies.</p>
          <div className="process-steps">
            {[
              { title: 'Discovery', desc: 'We get to know your goals, priorities, and risk profile.' },
              { title: 'Planning', desc: 'We design a tailored strategy across investments, taxes, and risk.' },
              { title: 'Execution', desc: 'We implement with disciplined portfolio management and coordination.' },
              { title: 'Review', desc: 'We monitor and refine regularly to keep you on track.' },
            ].map((step, idx) => (
              <div key={step.title} className="process-step">
                <div className="process-icon" aria-hidden="true">{idx + 1}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-band" aria-labelledby="cta-heading">
        <div className="container cta-container">
          <h2 id="cta-heading" className="cta-title">Ready to Start Your Wealth Journey?</h2>
          <p className="cta-subtext">Schedule a consultation with our wealth management experts and discover how we can help you achieve your financial goals.</p>
          <div className="cta-actions">
            <button className="btn btn-outline-light">Schedule Consultation</button>
            <button className="btn btn-light">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
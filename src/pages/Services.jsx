import React from 'react';

import './Services.css';
import ServicesCards from '../components/ServicesCards.jsx';


const ServicesPage = () => {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero" aria-labelledby="services-title">
        <img className="services-hero-bg" src="/images/home page image.png" alt="Wealth management services" />
        <div className="services-hero-overlay" />
        <div className="services-hero-content container">
          <h1 id="services-title" className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtitle">Comprehensive wealth management solutions tailored to your unique goals and aspirations.</p>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesCards />

      {/* Process */}
      <section className="services-process-section" aria-labelledby="process-heading">
        <div className="container">
          <h2 id="process-heading" className="section-title">Our Process</h2>
          <p className="section-subtitle">A systematic approach to achieving your financial objectives through personalized strategies.</p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-icon">1</div>
              <h3 className="process-title">Discovery</h3>
              <p className="process-desc">Understand goals, constraints, risk tolerance, and timeline.</p>
            </div>
            <div className="process-step">
              <div className="process-icon">2</div>
              <h3 className="process-title">Planning</h3>
              <p className="process-desc">Design integrated strategies across investments, tax, and protection.</p>
            </div>
            <div className="process-step">
              <div className="process-icon">3</div>
              <h3 className="process-title">Execution</h3>
              <p className="process-desc">Implement portfolios and plans with disciplined risk management.</p>
            </div>
            <div className="process-step">
              <div className="process-icon">4</div>
              <h3 className="process-title">Review</h3>
              <p className="process-desc">Monitor and refine to keep aligned with evolving objectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
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
import React from 'react';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-headline">Ready to Start Your Wealth Journey?</h2>
          <p className="cta-description">
            Take the first step towards securing your financial future with our expert guidance and personalized strategies.
          </p>
          <div className="cta-buttons">
            <button className="btn-outline-gold cta-btn">Schedule Consultation</button>
            <button className="btn-primary cta-btn">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
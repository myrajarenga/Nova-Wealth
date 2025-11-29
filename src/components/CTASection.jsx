import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/assessment" className="btn-outline-gold cta-btn text-center inline-flex items-center justify-center">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn-primary cta-btn text-center inline-flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
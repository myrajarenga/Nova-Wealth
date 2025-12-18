import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';

const CALENDLY_POPUP_URL = 'https://calendly.com/novawealth-info/30min';

const CTASection = () => {
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (window.Calendly && window.Calendly.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_POPUP_URL });
    } else {
      window.open(CALENDLY_POPUP_URL, '_self');
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-headline">Ready to Start Your Wealth Journey?</h2>
          <p className="cta-description">
            Take the first step towards securing your financial future with our expert guidance and personalized strategies.
          </p>
          <div className="cta-buttons">
            <a
              href={CALENDLY_POPUP_URL}
              className="btn-outline-gold cta-btn text-center inline-flex items-center justify-center"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </a>
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

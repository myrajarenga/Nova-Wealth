import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src="/images/home page image.png" alt="Wealth management meeting" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">Secure Your Financial Future</h1>
            <p className="hero-description">
              Experience personalized wealth management strategies designed to grow and protect your assets.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary hero-btn">Start Your Wealth Journey</button>
              <button className="btn-secondary hero-btn">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
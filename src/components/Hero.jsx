import React from 'react';
import { Link } from 'react-router-dom';
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
            <h1 className="hero-headline">Secure Your <span className="headline-accent">Financial Future</span></h1>
            <p className="hero-description">
              Experience personalized wealth management strategies designed to grow and protect your assets. Our expert
              advisors create tailored solutions that align with your unique financial goals and aspirations.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary hero-btn">start your wealth journey</Link>
              <Link to="/contact" className="btn-outline-gold hero-btn">Schedule Consultation</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
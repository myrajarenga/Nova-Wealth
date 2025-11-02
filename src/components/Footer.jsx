import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Tagline Column */}
          <div className="footer-column">
            <div className="footer-logo">
              <span>Logo.</span>
            </div>
            <p className="footer-tagline">Here for generations.</p>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Financial Planning</a></li>
              <li><a href="#" className="footer-link">Investment Management</a></li>
              <li><a href="#" className="footer-link">Estate Planning</a></li>
              <li><a href="#" className="footer-link">Tax Optimization</a></li>
              <li><a href="#" className="footer-link">Risk Management</a></li>
              <li><a href="#" className="footer-link">Retirement Planning</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Our Team</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Resources</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-label">Call us at:</span>
                <a href="tel:+254720000000" className="contact-value">+254 720 000 000</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email us at:</span>
                <a href="mailto:sales@novawealth.com" className="contact-value">sales@novawealth.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Visit us at:</span>
                <span className="contact-value">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 Nova Wealth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
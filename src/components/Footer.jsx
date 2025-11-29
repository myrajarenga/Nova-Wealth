import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="site-footer" className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Tagline Column */}
          <div className="footer-column">
            <img
              src="images/NOVA.png"
              alt="Nova Wealth Logo"
              className="footer-logo"
            />
            
          
            <p className="footer-tagline"><i>Here for generations.</i></p>
            <p className="footer-tagline">Building lasting wealth through personalized financial strategies and expert guidance.</p>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><Link to="/services#financial-planning" className="footer-link">Financial Planning</Link></li>
              <li><Link to="/services#investment-management" className="footer-link">Investment Management</Link></li>
              <li><Link to="/services#retirement-planning" className="footer-link">Retirement Planning</Link></li>
              <li><Link to="/services#insurance-risk-solutions" className="footer-link">Insuarance & Risk Solutions</Link></li>
              <li><Link to="/services#estate-planning" className="footer-link">Estate Planning</Link></li>
              <li><Link to="/services#tax-planning-compliance" className="footer-link">Tax Planning & Compliance</Link></li>
              <li><Link to="/services#portfolio-management" className="footer-link">Portfolio Management</Link></li>
              <li><Link to="/services#corporate-advisory" className="footer-link">Corporate Advisory</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Our Team</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="/client-center/resources" className="footer-link">Resources</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-label">Call us at:</span>
                <a href="tel:+254737648915" className="contact-value">+254 737648915</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email us at:</span>
                <a
                  href="mailto:info@novawealth.co.ke?subject=Inquiry%20from%20Nova%20Wealth%20Website&body=Hello%20Nova%20Wealth%20Team,%0D%0A%0D%0AI%20would%20like%20to%20learn%20more%20about%20your%20services.%20Please%20get%20back%20to%20me.%0D%0A%0D%0AThank%20you."
                  className="contact-value"
                >
                  info@novawealth.co.ke
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Visit us at:</span>
                <span className="contact-value">Office 47, Park Court
Ojijo Road, Parklands
Nairobi, Kenya</span>
              </div>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn" className="social-link linkedin">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5C4.98 4.60457 4.086 5.5 2.98 5.5C1.874 5.5 0.98 4.60457 0.98 3.5C0.98 2.39543 1.874 1.5 2.98 1.5C4.086 1.5 4.98 2.39543 4.98 3.5Z" fill="currentColor"/>
                  <path d="M0.5 8H5.5V22H0.5V8Z" fill="currentColor"/>
                  <path d="M9 8H14V10.5C14.7462 9.45802 16.2251 8 18.8 8C22.666 8 23.5 10.6 23.5 14.2V22H18.5V15.5C18.5 13.7 18.1 12.5 16.6 12.5C14.9 12.5 14.5 13.9 14.5 15.5V22H9.5V8H9Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter (X)" className="social-link twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 3L20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 3L4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="social-link youtube">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a2.999 2.999 0 0 0-2.116-2.12C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.382.566A3 3 0 0 0 .502 6.186C0 8.062 0 12 0 12s0 3.938.502 5.814a3 3 0 0 0 2.116 2.12C4.482 20.5 12 20.5 12 20.5s7.518 0 9.382-.566a3 3 0 0 0 2.116-2.12C24 15.938 24 12 24 12s0-3.938-.502-5.814ZM9.75 15.5v-7l6 3.5-6 3.5Z" fill="currentColor"/>
                </svg>
              </a>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" aria-label="Go to home">
              <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <Link to="/about" className="navbar-link">About</Link>

            <Link to="/services" className="navbar-link">Services</Link>

            <Link to="/who-we-serve" className="navbar-link">Who We Serve</Link>
            <div
              className="navbar-item dropdown"
              onMouseEnter={() => setIsClientOpen(true)}
              onMouseLeave={() => setIsClientOpen(false)}
            >
              <Link to="/client-center" className="navbar-link" aria-haspopup="true" aria-expanded={isClientOpen}>Client Centre</Link>
              {isClientOpen && (
                <div className="dropdown-menu">
                  <Link to="/resources" className="dropdown-item">Resources</Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="navbar-link">Contact Us</Link>
          </div>
           

          {/* CTA Buttons */}
          <div className="navbar-cta">
            <Link to="/client-center" className="navbar-link">Client Login</Link>
            <Link to="/client-center"><button className="btn-primary">get started</button></Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/about" className="mobile-menu-link">About</Link>
            <Link to="/services" className="mobile-menu-link">Services</Link>
            <Link to="/who-we-serve" className="mobile-menu-link">Who We Serve</Link>
            <div className="mobile-menu-item">
              <Link to="/client-center" className="mobile-menu-link">Client Centre</Link>
              <div className="mobile-submenu">
                <Link to="/resources" className="mobile-submenu-item">Resources</Link>
              </div>
            </div>
            <Link to="/contact" className="mobile-menu-link">Contact Us</Link>
            <Link to="/client-center" className="mobile-menu-link">Client Login</Link>
            <button className="btn-primary mobile-cta">Get Started</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
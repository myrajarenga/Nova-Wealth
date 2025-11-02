import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <span>Logo.</span>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <div 
              className="navbar-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <span className="navbar-link">Services</span>
              {isServicesOpen && (
                <div className="dropdown-menu">
                  <a href="#" className="dropdown-item">Who We Serve</a>
                </div>
              )}
            </div>
            <a href="#" className="navbar-link">About Us</a>
            <a href="#" className="navbar-link">Insights</a>
            <a href="#" className="navbar-link">Contact Us</a>
          </div>

          {/* CTA Buttons */}
          <div className="navbar-cta">
            <a href="#" className="navbar-link">Client Login</a>
            <button className="btn-primary">Get Started</button>
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
            <div className="mobile-menu-item">
              <span className="mobile-menu-link">Services</span>
              <div className="mobile-submenu">
                <a href="#" className="mobile-submenu-item">Who We Serve</a>
              </div>
            </div>
            <a href="#" className="mobile-menu-link">About Us</a>
            <a href="#" className="mobile-menu-link">Insights</a>
            <a href="#" className="mobile-menu-link">Contact Us</a>
            <a href="#" className="mobile-menu-link">Client Login</a>
            <button className="btn-primary mobile-cta">Get Started</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
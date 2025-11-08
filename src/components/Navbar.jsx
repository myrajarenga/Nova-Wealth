import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/" aria-label="Go to home">
              <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <div 
              className="navbar-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <a href="/services" className="navbar-link">Services</a>
              {isServicesOpen && (
                <div className="dropdown-menu">
                  <Link to="/who-we-serve" className="dropdown-item">Who We Serve</Link>
                </div>
              )}
            </div>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/client-center" className="navbar-link">Client Center</Link>
            
            <a href="#" className="navbar-link">Resources</a>
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
            <div className="mobile-menu-item">
              <a href="/services" className="mobile-menu-link">Services</a>
              <div className="mobile-submenu">
                <Link to="/who-we-serve" className="mobile-submenu-item">Who We Serve</Link>
              </div>
            </div>
            <a href="#" className="mobile-menu-link">About Us</a>
            <a href="#" className="mobile-menu-link">Insights</a>
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
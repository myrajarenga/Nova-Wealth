import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../services/authService';
import './Navbar.css';

const Navbar = () => {
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServeOpen, setIsServeOpen] = useState(false);
  const location = useLocation(); // Force re-render on route change
  const isLoggedIn = !!getToken();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" aria-label="Go to home">
              <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">Home</Link>

            <div
              className="navbar-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link to="/services" className="navbar-link" aria-haspopup="true" aria-expanded={isServicesOpen}>Services</Link>
              {isServicesOpen && (
                <div className="dropdown-menu">
                  <Link to="/services#financial-planning" className="dropdown-item">Financial Planning</Link>
                  <Link to="/services#investment-management" className="dropdown-item">Investment Management</Link>
                  <Link to="/services#retirement-planning" className="dropdown-item">Retirement Planning</Link>
                  <Link to="/services#insurance-risk-solutions" className="dropdown-item">Insuarance & Risk Solutions</Link>
                  <Link to="/services#estate-planning" className="dropdown-item">Estate Planning</Link>
                  <Link to="/services#tax-planning-compliance" className="dropdown-item">Tax Planning & Compliance</Link>
                  <Link to="/services#portfolio-management" className="dropdown-item">Portfolio Management</Link>
                  <Link to="/services#corporate-advisory" className="dropdown-item">Corporate Advisory</Link>
                </div>
              )}
            </div>

            <div
              className="navbar-item dropdown"
              onMouseEnter={() => setIsServeOpen(true)}
              onMouseLeave={() => setIsServeOpen(false)}
            >
              <Link to="/who-we-serve" className="navbar-link" aria-haspopup="true" aria-expanded={isServeOpen}>Who We Serve</Link>
              {isServeOpen && (
                <div className="dropdown-menu">
                  <Link to="/who-we-serve#hni" className="dropdown-item">High‑Net‑Worth Individuals (HNWI)</Link>
                  <Link to="/who-we-serve#growing-professionals" className="dropdown-item">Growing Professionals</Link>
                  <Link to="/who-we-serve#diaspora-clients" className="dropdown-item">Diaspora Clients</Link>
                  <Link to="/who-we-serve#business-owners" className="dropdown-item">Business Owners</Link>
                  <Link to="/who-we-serve#families-multi-generationl-wealth" className="dropdown-item">Families & Multi‑Generationl-Wealth</Link>
                </div>
              )}
            </div>
            <div
              className="navbar-item dropdown"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <Link to="/about" className="navbar-link" aria-haspopup="true" aria-expanded={isAboutOpen}>About Us</Link>
              {isAboutOpen && (
                <div className="dropdown-menu">
                  <Link to="/about#about-nova-wealth" className="dropdown-item">About Nova Wealth</Link>
                  <Link to="/about#our-story" className="dropdown-item">Our Story</Link>
                  <Link to="/about#our-values" className="dropdown-item">Our Values</Link>
                  <Link to="/about#why-nova-wealth" className="dropdown-item">Why Nova Wealth</Link>
                  <Link to="/about#our-process" className="dropdown-item">Our Process</Link>
                  <Link to="/about#meet-our-founders" className="dropdown-item">Meet Our Founders</Link>
                </div>
              )}
            </div>
            
            {isLoggedIn ? (
              <div
                className="navbar-item dropdown"
                onMouseEnter={() => setIsClientOpen(true)}
                onMouseLeave={() => setIsClientOpen(false)}
              >
                <Link to="/client-center" className="navbar-link" aria-haspopup="true" aria-expanded={isClientOpen}>Client Centre</Link>
                {isClientOpen && (
                  <div className="dropdown-menu">
                    <Link to="/client-center/Resources" className="dropdown-item">Resources</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/client-center/resources" className="navbar-link">Resources & Insights</Link>
            )}

            <Link to="/faq" className="navbar-link">FAQ's</Link>
            <Link to="/contact" className="navbar-link">Contact Us</Link>
          </div>
           

          {/* CTA Buttons */}
          <div className="navbar-cta">
            {isLoggedIn ? (
               <Link to="/client-center"><button className="btn-primary">Client Portal</button></Link>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/assessment"><button className="btn-primary">Get Started</button></Link>
              </>
            )}
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
            <Link to="/" className="mobile-menu-link">Home</Link>
            <Link to="/services" className="mobile-menu-link">Services</Link>
            <Link to="/who-we-serve" className="mobile-menu-link">Who We Serve</Link>
            <Link to="/about" className="mobile-menu-link">About Us</Link>
            {isLoggedIn ? (
               <>
                <Link to="/client-center" className="mobile-menu-link">Client Centre</Link>
                <Link to="/client-center/resources" className="mobile-menu-link">Resources</Link>
               </>
            ) : (
                <Link to="/client-center/resources" className="mobile-menu-link">Resources & Insights</Link>
            )}
            <Link to="/contact" className="mobile-menu-link">Contact Us</Link>
            {!isLoggedIn && <Link to="/login" className="mobile-menu-link">Client Login</Link>}
            <Link to={isLoggedIn ? "/client-center" : "/assessment"} className="mobile-cta btn-primary">{isLoggedIn ? 'Client Portal' : 'Get Started'}</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

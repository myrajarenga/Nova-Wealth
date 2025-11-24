import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServeOpen, setIsServeOpen] = useState(false);

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
            <div
              className="navbar-item dropdown"
              onMouseEnter={() => setIsClientOpen(true)}
              onMouseLeave={() => setIsClientOpen(false)}
            >
              <Link to="/client-center" className="navbar-link" aria-haspopup="true" aria-expanded={isClientOpen}>Client Centre</Link>
              {isClientOpen && (
                <div className="dropdown-menu">
                  <Link to="/client-center/resources" className="dropdown-item">Resources</Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="navbar-link">Contact Us</Link>
          </div>
           

          {/* CTA Buttons */}
          <div className="navbar-cta">
            <Link to="/login" className="navbar-link">Client Login</Link>
            <Link to="/login"><button className="btn-primary">get started</button></Link>
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
            <div className="mobile-menu-item">
              <Link to="/services" className="mobile-menu-link">Services</Link>
              <div className="mobile-submenu">
                <Link to="/services#financial-planning" className="mobile-submenu-item">Financial Planning</Link>
                <Link to="/services#investment-management" className="mobile-submenu-item">Investment Management</Link>
                <Link to="/services#retirement-planning" className="mobile-submenu-item">Retirement Planning</Link>
                <Link to="/services#insurance-risk-solutions" className="mobile-submenu-item">Insuarance & Risk Solutions</Link>
                <Link to="/services#estate-planning" className="mobile-submenu-item">Estate Planning</Link>
                <Link to="/services#tax-planning-compliance" className="mobile-submenu-item">Tax Planning & Compliance</Link>
                <Link to="/services#portfolio-management" className="mobile-submenu-item">Portfolio Management</Link>
                <Link to="/services#corporate-advisory" className="mobile-submenu-item">Corporate Advisory</Link>
              </div>
            </div>
            <div className="mobile-menu-item">
              <Link to="/who-we-serve" className="mobile-menu-link">Who We Serve</Link>
              <div className="mobile-submenu">
                <Link to="/who-we-serve#hni" className="mobile-submenu-item">High‑Net‑Worth Individuals (HNWI)</Link>
                <Link to="/who-we-serve#growing-professionals" className="mobile-submenu-item">Growing Professionals</Link>
                <Link to="/who-we-serve#diaspora-clients" className="mobile-submenu-item">Diaspora Clients</Link>
                <Link to="/who-we-serve#business-owners" className="mobile-submenu-item">Business Owners</Link>
                <Link to="/who-we-serve#families-multi-generationl-wealth" className="mobile-submenu-item">Families & Multi‑Generationl-Wealth</Link>
              </div>
            </div>
            <div className="mobile-menu-item">
              <Link to="/about" className="mobile-menu-link">About Us</Link>
              <div className="mobile-submenu">
                <Link to="/about#about-nova-wealth" className="mobile-submenu-item">About Nova Wealth</Link>
                <Link to="/about#our-story" className="mobile-submenu-item">Our Story</Link>
                <Link to="/about#our-values" className="mobile-submenu-item">Our Values</Link>
                <Link to="/about#why-nova-wealth" className="mobile-submenu-item">Why Nova Wealth</Link>
                <Link to="/about#our-process" className="mobile-submenu-item">Our Process</Link>
                <Link to="/about#meet-our-founders" className="mobile-submenu-item">Meet Our Founders</Link>
              </div>
            </div>
            <div className="mobile-menu-item">
              <Link to="/client-center" className="mobile-menu-link">Client Centre</Link>
              <div className="mobile-submenu">
                <Link to="/client-center/resources" className="mobile-submenu-item">Resources</Link>
              </div>
            </div>
            <Link to="/contact" className="mobile-menu-link">Contact Us</Link>
            <Link to="/login" className="mobile-menu-link">Client Login</Link>
            <Link to="/login" className="mobile-cta btn-primary">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

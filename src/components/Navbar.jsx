import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getToken } from '../services/authService';
import './Navbar.css';

const CALENDLY_POPUP_URL = 'https://calendly.com/novawealth-info/30min';

const Navbar = () => {
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServeOpen, setIsServeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Force re-render on route change
  const isLoggedIn = !!getToken();

  const transparentPages = ['/', '/client-center/resources', '/contact'];
  const isTransparentPage = transparentPages.includes(location.pathname);

  const handleNavbarBookAppointment = (e) => {
    e.preventDefault();

    if (window.Calendly && window.Calendly.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_POPUP_URL });
    } else {
      window.open(CALENDLY_POPUP_URL, '_self');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Framer Motion variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <nav className={`navbar ${isTransparentPage ? 'fixed' : ''} ${isScrolled || !isTransparentPage ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/?hero=restart" aria-label="Go to home">
              <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <Link to="/?hero=restart" className="navbar-link">Home</Link>

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
                  <Link to="/services#insurance-risk-solutions" className="dropdown-item">Insurance & Risk Solutions</Link>
                  <Link to="/services#estate-planning" className="dropdown-item">Estate Planning</Link>
                  <Link to="/services#tax-planning-compliance" className="dropdown-item">Tax Planning & Compliance</Link>
                  <Link to="/services#portfolio-management" className="dropdown-item">Portfolio Management</Link>
                  <Link to="/services#corporate-advisory" className="dropdown-item">SME and Corporate Advisory</Link>
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
                  <Link to="/who-we-serve#business-owners" className="dropdown-item">Entrepreneurs</Link>
                  <Link to="/who-we-serve#families-multi-generationl-wealth" className="dropdown-item">Families & Multi‑Generationl-Wealth</Link>
                  <Link to="/who-we-serve#sme-corporates" className="dropdown-item">SME & Corporates</Link>
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
                  <Link to="/about#our-purpose" className="dropdown-item">Our Purpose</Link>
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
                    <Link to="/client-center/resources" className="dropdown-item">Resources</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/client-center/resources" className="navbar-link">Resources</Link>
            )}

            <Link to="/faq" className="navbar-link">FAQ's</Link>
            <Link to="/contact" className="navbar-link">Contact Us</Link>
          </div>


          {/* CTA Buttons */}
          <div className="navbar-cta">
            {!isLoggedIn && (
              <Link to="/login" className="navbar-link">Sign Up</Link>
            )}
            <a
              href={CALENDLY_POPUP_URL}
              className="btn-primary"
              onClick={handleNavbarBookAppointment}
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button - Animates state */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            style={{ zIndex: 1001 }} // Ensure button stays above menu
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="mobile-menu-overlay"
              id="mobile-menu"
            >
              <div className="mobile-menu-scrollable">
                <Link to="/?hero=restart" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                    Services
                    <span>{isServicesOpen ? '−' : '+'}</span>
                  </div>
                  {isServicesOpen && (
                    <div className="mobile-dropdown-content">
                      <Link to="/services#financial-planning" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Financial Planning</Link>
                      <Link to="/services#investment-management" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Investment Management</Link>
                      <Link to="/services#retirement-planning" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Retirement Planning</Link>
                      <Link to="/services#insurance-risk-solutions" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Insurance & Risk Solutions</Link>
                      <Link to="/services#estate-planning" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Estate Planning</Link>
                      <Link to="/services#tax-planning-compliance" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Tax Planning & Compliance</Link>
                      <Link to="/services#portfolio-management" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Portfolio Management</Link>
                      <Link to="/services#corporate-advisory" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>SME and Corporate Advisory</Link>
                      <Link to="/services" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>View All Services</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header" onClick={() => setIsServeOpen(!isServeOpen)}>
                    Who We Serve
                    <span>{isServeOpen ? '−' : '+'}</span>
                  </div>
                  {isServeOpen && (
                    <div className="mobile-dropdown-content">
                      <Link to="/who-we-serve#hni" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>High‑Net‑Worth Individuals</Link>
                      <Link to="/who-we-serve#growing-professionals" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Growing Professionals</Link>
                      <Link to="/who-we-serve#diaspora-clients" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Diaspora Clients</Link>
                      <Link to="/who-we-serve#business-owners" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Entrepreneurs</Link>
                      <Link to="/who-we-serve#families-multi-generationl-wealth" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Families & Multi‑Gen Wealth</Link>
                      <Link to="/who-we-serve#sme-corporates" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>SME & Corporates</Link>
                      <Link to="/who-we-serve" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>View All</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header" onClick={() => setIsAboutOpen(!isAboutOpen)}>
                    About Us
                    <span>{isAboutOpen ? '−' : '+'}</span>
                  </div>
                  {isAboutOpen && (
                    <div className="mobile-dropdown-content">
                      <Link to="/about#about-nova-wealth" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>About Nova Wealth</Link>
                      <Link to="/about#our-story" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                      <Link to="/about#our-purpose" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Our Purpose</Link>
                      <Link to="/about#our-values" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Our Values</Link>
                      <Link to="/about#why-nova-wealth" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Why Nova Wealth</Link>
                      <Link to="/about#our-process" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Our Process</Link>
                      <Link to="/about#meet-our-founders" className="mobile-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Meet Our Founders</Link>
                    </div>
                  )}
                </div>

                {isLoggedIn ? (
                  <>
                    <Link to="/client-center" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Client Centre</Link>
                    <Link to="/client-center/resources" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                  </>
                ) : (
                  <Link to="/client-center/resources" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                )}
                <Link to="/contact" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                {!isLoggedIn && <Link to="/login" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>}
                <Link to={isLoggedIn ? "/client-center" : "/contact"} className="mobile-cta btn-primary" onClick={() => setIsMobileMenuOpen(false)}>{isLoggedIn ? 'Client Portal' : 'Talk to an Advisor'}</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

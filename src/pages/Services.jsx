import React, { useEffect, useState } from 'react';

import './Services.css';
import './WhoWeServe.css';
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";


const ServicesPage = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const ShieldIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ChartUpIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 14l4-4 4 3 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 4v-1M17 4v-1M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  const UmbrellaIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3a9 9 0 019 9H3a9 9 0 019-9zm0 9v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const FileIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const PercentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
  const BookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 19V5a2 2 0 012-2h12v16H6a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/> 
      <path d="M6 5h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  const BriefcaseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
  const ServiceIcon = ({ type }) => {
    switch (type) {
      case 'planning': return <ShieldIcon/>;
      case 'investment': return <ChartUpIcon/>;
      case 'retirement': return <CalendarIcon/>;
      case 'insurance': return <UmbrellaIcon/>;
      case 'estate': return <FileIcon/>;
      case 'tax': return <PercentIcon/>;
      case 'portfolio': return <ChartUpIcon/>;
      case 'corporate': return <BriefcaseIcon/>;
      default: return <ShieldIcon/>;
    }
  };

  const services = [
    {
      tag: 'Financial Planning & Advisory',
      //title: 'Financial Planning',
      id: 'financial-planning',
      desc: 'Comprehensive planning across budgeting, tax, retirement and protection.Comprehensive financial planning to preserve and grow assets.',
      bullets: ['Personalized wealth plans',' Portfolio monitoring & rebalancing','Tax-aware strategies'],
      type: 'planning',
      video: '/videos/Financial-Planning-and-Advisory.mp4',
      // caption: 'Financial Planning',
      btnText: 'Start Your Financial Planning'
    },
    {
      tag: 'Investment Management',
      //title: 'Investment Management',
      id: 'investment-management',
      desc: 'Tailored investment portfolios aligned with client objectives.',
      bullets: ['Risk-profiled asset allocation','Active & passive options','Regular performance reviews'],
      type: 'investment',
      video: '/videos/Investment-Management.mp4',
      // caption: 'Investment Management',
      btnText: 'Start Your Investment Management'
    },
    {
      tag: 'Retirement & Planning',
      //title: 'Retirement Planning',
      id: 'retirement-planning',
      desc: 'Secure your future with income and savings strategies.',
      bullets: ['Retirement income modelling','Pension & savings optimisation','Estate planning & suggestions'],
      type: 'retirement',
      video: '/videos/Retirement-and-Pension-Solutions.mp4',
      // caption: 'Retirement Planning',
      btnText: 'Start Your Retirement Plan'
    },
    {
      tag: 'Insurance & Risk Solutions',
      //title: 'Insuarance & Risk Solutions',
      id: 'insurance-risk-solutions',
      desc: 'Protect assets through risk assessment, coverage planning and optimization.',
      bullets: ['Asset protection', 'Risk assessment', 'Coverage planning', 'Premium optimization'],
      type: 'insurance',
      video: '/videos/Insurance-and-Risk-Management.mp4',
      // caption: 'Insurance & Risk',
      btnText: 'Start Your Risk Solutions'
    },
    {
      tag: 'Estate Planning',
      //title: 'Estate Planning',
      id: 'estate-planning',
      desc: 'Structured legacy planning for future generations.',
      bullets: ['Wills & trusts guidance','Succession planning','Tax-efficient transfers'],
      type: 'estate',
      video: '/videos/Estate-Planning-and-Trusts.mp4',
      // caption: 'Estate Panning',
      btnText: 'Start Your Estate Plan'
    },
    {
      tag: 'Tax Planning & Compliance',
      //title: 'Tax Planning & Compliance',
      id: 'tax-planning-compliance',
      desc: 'Optimize returns through efficient tax strategies.',
      bullets: ['Tax-efficient investing','Compliance & reporting support','Cross-border tax guidance'],
      type: 'tax',
      video: '/videos/Tax-Planning-and-Compliance.mp4',
      // caption: 'Tax Planning',
      btnText: 'Start Your Tax Planning'
    },
    {
      tag: 'Portfolio Management',
      //title: 'Portfolio Management',
      id: 'portfolio-management',
      desc: 'Diversified investment oversight for consistent growth.',
      bullets: ['Diversification across asset classes','Ongoing risk management','Custom mandates available' ],
      type: 'portfolio',
      video: '/videos/Portfolio-Management.mp4',
      // caption: 'Portfolio management',
      btnText: 'Start Your Portfolio Management'
    },
    {
      tag: 'Corporate Advisory',
      //title: 'Corporate Advisory',
      id: 'corporate-advisory',
      desc: 'Optimize SME planning, cashflow, restructuring and capital management.',
      bullets: ['SME planning', 'Cashflow strategy', 'Business restructuring', 'Capital management'],
      type: 'corporate',
      video: '/videos/Corporate-Advisory.mp4',
      // caption: 'Corporate Advisory',
      btnText: 'Start Your Corporate Advisory'
    }
  ];
  function scrollToId(id) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset
    const offset = 90
    window.scrollTo({ top: y - offset, behavior: 'smooth' })
    setOpen(false)
  }
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset
        const offset = 90
        window.scrollTo({ top: y - offset, behavior: 'smooth' })
      }
    }
  }, [location.hash])
  return (
    <div className="services-page">
      <div className="page-mobile-dropdown">
        <button type="button" className="dropdown-toggle" onClick={() => setOpen(v => !v)}>
          <span>Services</span>
          <span>{open ? '▴' : '▾'}</span>
        </button>
        {open && (
          <div className="dropdown-panel">
            {services.map(s => (
              <button key={s.id} className="dropdown-link" onClick={() => scrollToId(s.id)}>
                {s.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hero */}
      <section className="services-hero" aria-labelledby="services-title">
        <img className="services-hero-bg" src="/images/home page image.png" alt="Wealth management services" />
        <div className="services-hero-overlay" />
        <div className="services-hero-content container">
          <h1 id="services-title" className="services-hero-title">
            <span className="services-title-our">Our</span> <span className="services-title-services">Services</span>
          </h1>
          <p className="services-hero-subtitle">Comprehensive wealth management solutions tailored to your unique goals and aspirations.</p>
        </div>
      </section>

      <section className="services-rows-section" aria-label="Services">
        <div className="container">
          <div className="services-rows">
            {services.map((s, idx) => (
              <article id={s.id} key={s.title || s.tag} className={`wws-row ${idx % 2 === 1 ? 'reverse' : ''}`} aria-label={s.title || s.tag}>
                <div className="wws-text">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="wws-tag"
                    aria-label="Service category"
                  >
                    <ServiceIcon type={s.type} />
                    {String(s.tag).toUpperCase()}
                  </motion.span>
                  <h3 className="wws-title-3">{s.title}</h3>
                  <p className="wws-desc">{s.desc}</p>
                  <ul className="wws-bullets" aria-label={`${s.title} highlights`}>
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <span className="wws-bullet-icon" aria-hidden="true">•</span>
                        <span className="wws-bullet-text">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="service-action-area" style={{ marginTop: '1.5rem' }}>
                    <Link to="/assessment" className="service-cta-btn">
                      {s.btnText || 'Start Your Wealth Journey'}
                    </Link>
                  </div>
                </div>
                <figure className="wws-media">
                  <div className="wws-image-card">
                    {s.video ? (
                      <video src={s.video} autoPlay muted loop playsInline aria-label={`${s.title} video`} />
                    ) : (
                      <img src={s.image} alt={`${s.title} illustration`} />
                    )}
                  </div>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA band */}
      <section className="services-cta-band" aria-labelledby="cta-heading">
        <div className="container cta-container">
          <h2 id="cta-heading" className="cta-title">Ready to Start Your Wealth Journey?</h2>
          <p className="cta-subtext">Book an appointment with our wealth management experts and discover how we can help you achieve your financial goals.</p>
          <div className="cta-actions">
            <Link to="/assessment" className="btn btn-outline-light">Book Appointment</Link>
            
            <Link to="/contact" className="btn btn-light">
              Contact Us
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

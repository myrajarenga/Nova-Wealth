import React from 'react';
import './WhoWeServe.css';

const audiences = [
  {
    key: 'uhnwi',
    title: 'Ultra High Net Worth Individuals',
    blurb:
      'We provide sophisticated asset management with disciplined risk control, tax‑aware strategies, and access to private markets. Each mandate is tailored to your objectives, governance preferences, and family priorities, with transparent reporting and a dedicated advisory team working in concert with your existing professionals.',
    features: ['Multi‑asset allocation', 'Tax‑efficient structures', 'Private market access', 'Dedicated advisory team'],
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    key: 'professionals',
    title: 'Ambitious Professionals & Entrepreneurs',
    blurb:
      'We help founders and rising leaders convert momentum into durable wealth. From liquidity events and equity diversification to legacy and philanthropy planning, we coordinate investments, taxes, and risk so growth is intentional and aligned with the life you want to build.',
    features: ['Liquidity planning', 'Equity diversification', 'Legacy & philanthropy', 'Tax strategy alignment'],
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    key: 'global',
    title: 'Global Citizens & International Clients',
    blurb:
      'For cross‑border families and professionals, we design compliant, resilient portfolios across jurisdictions. We manage currency exposure, coordinate international tax considerations, and provide global custody solutions so your capital works seamlessly wherever life and opportunity take you.',
    features: ['Cross‑border compliance', 'Multi‑currency portfolios', 'International tax coordination', 'Global custody'],
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764ff8?q=80&w=1600&auto=format&fit=crop',
  },
  {
    key: 'owners',
    title: 'Business Owners & Executives',
    blurb:
      'We align personal and enterprise finances through integrated planning. From succession and liquidity strategy to executive compensation optimization and risk management, we create a clear framework that supports growth today and the outcomes you want beyond the business.',
    features: ['Integrated wealth & business planning', 'Succession strategies', 'Executive compensation optimization', 'Risk management'],
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhoWeServe = () => {
  return (
    <div className="wws-page">
      {/* Intro Header */}
      <section className="wws-hero" aria-labelledby="wws-title">
        <div className="wws-hero-overlay" />
        <div className="container wws-hero-content">
          <h1 id="wws-title" className="wws-title">Who We Serve</h1>
          <p className="wws-subtitle">
            Nova Wealth partners with diverse clients — from founders and global families to executives and multi‑generational estates — delivering advanced, personalized wealth management built around your ambitions, values, and complexity.
          </p>
        </div>
      </section>

      {/* Audience Tiles */}
      <section className="wws-audiences container" aria-labelledby="audiences-heading">
        <h2 id="audiences-heading" className="section-title">Tailored Expertise for Every Client</h2>
        <div className="audiences-grid">
          {audiences.map((a) => (
            <article key={a.key} className="audience-card">
              <div className="audience-image-wrap">
                <img src={a.image} alt={`${a.title} representative`} className="audience-image" />
                <div className="image-gradient" />
              </div>
              <div className="audience-content">
                <h3 className="audience-title">{a.title}</h3>
                <ul className="audience-features" aria-label="Key features">
                  {a.features.map((f) => (
                    <li key={f}>
                      <span className="feature-icon" aria-hidden="true"><CheckIcon /></span>
                      <span className="feature-text">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="audience-blurb">{a.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="wws-cta-band" aria-labelledby="wws-cta-title">
        <div className="container cta-container">
          <h2 id="wws-cta-title" className="cta-title">Ready to Start Your Wealth Journey?</h2>
          <p className="cta-subtext">Schedule a consultation with our wealth management experts and discover how we can help you achieve your financial goals.</p>
          <div className="cta-actions">
            <button className="btn btn-outline-light">Schedule Consultation</button>
            <button className="btn btn-light">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeServe;
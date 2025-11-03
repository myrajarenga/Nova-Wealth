import React from 'react';
import './WhoWeServe.css';

/*
  Modular page structure based on the provided brief:
  - <IntroSection />: Title + subtitle
  - <AudienceCard />: 5 audience types with icon, subtitle, and bullets
  - <CTASection />: Strong call-to-action banner
*/

// Inline SVG icons using currentColor for glyphs
const ShieldIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChartUpIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 14l4-4 4 3 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 12h18M12 3c3 3 3 18 0 18-3-3-3-18 0-18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const FamilyIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 21v-2a5 5 0 015-5h8a5 5 0 015 5v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Map segment key to icon component
const SegmentIcon = ({ type }) => {
  switch (type) {
    case 'hni': return <ShieldIcon />;
    case 'pro': return <ChartUpIcon />;
    case 'diaspora': return <GlobeIcon />;
    case 'owners': return <BriefcaseIcon />;
    case 'families': return <FamilyIcon />;
    default: return <ShieldIcon />;
  }
};

// Intro section
const IntroSection = () => (
  <section className="wws-hero" aria-labelledby="wws-title">
    <div className="wws-hero-overlay" />
    <div className="container wws-hero-content">
      <h1 id="wws-title" className="wws-title">Who We Serve</h1>
      <p className="wws-subtitle">
        Nova Wealth delivers personalized, expert wealth management for diverse clients — integrating advanced portfolio design, cross‑border planning, and multi‑generational solutions with your goals and values.
      </p>
    </div>
  </section>
);

// Audience card component
const AudienceCard = ({ title, subtitle, bullets, type }) => (
  <article className="audience-card" aria-label={title}>
    <div className="audience-content">
      <div className="audience-icon-badge" aria-hidden="true">
        <SegmentIcon type={type} />
      </div>
      <h3 className="audience-title">{title}</h3>
      <p className="audience-subtitle">{subtitle}</p>
      <ul className="audience-bullets" aria-label="Key services tailored for this segment">
        {bullets.map((b) => (
          <li key={b}>
            <span className="feature-icon" aria-hidden="true"><CheckIcon /></span>
            <span className="feature-text">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

// CTA section
const CTASection = () => (
  <section className="wws-cta-band" aria-labelledby="wws-cta-title">
    <div className="container cta-container">
      <h2 id="wws-cta-title" className="cta-title">Ready to take the next step?</h2>
      <p className="cta-subtext">Schedule a consultation with Nova Wealth to explore a strategy tailored to you.</p>
      <div className="cta-actions">
        <button className="btn btn-outline-light" aria-label="Schedule Consultation">Schedule Consultation</button>
        <button className="btn btn-light" aria-label="Contact Nova Wealth">Contact Us</button>
      </div>
    </div>
  </section>
);

// Page data for 5 audience types
const segments = [
  {
    key: 'hni',
    title: 'High‑Net‑Worth Individuals',
    subtitle: 'Sophisticated, discretionary management with tax‑aware structures and risk governance.',
    bullets: [
      'Advanced portfolio construction',
      'Tax‑efficient vehicles and structures',
      'Access to private investments',
      'Institutional‑grade risk management',
      'Discreet reporting and governance',
    ],
  },
  {
    key: 'pro',
    title: 'Growing Professionals',
    subtitle: 'Turn career momentum into durable wealth through integrated planning.',
    bullets: [
      'Equity compensation and liquidity planning',
      'Goal‑based portfolios and automation',
      'Tax optimization and cash‑flow design',
      'Protection planning (insurance, contingencies)',
    ],
  },
  {
    key: 'diaspora',
    title: 'Diaspora Clients',
    subtitle: 'Cross‑border wealth architecture with compliant, multi‑currency portfolios.',
    bullets: [
      'Cross‑border tax planning',
      'Multi‑currency, multi‑jurisdiction portfolios',
      'Global custody and consolidated reporting',
      'Residency and relocation considerations',
      'Local and offshore compliance coordination',
    ],
  },
  {
    key: 'owners',
    title: 'Business Owners',
    subtitle: 'Integrate enterprise and personal finances with succession and liquidity strategy.',
    bullets: [
      'Succession and exit planning',
      'Executive compensation optimization',
      'Cash management and credit solutions',
      'Risk management across business and personal balance sheets',
    ],
  },
  {
    key: 'families',
    title: 'Families',
    subtitle: 'Multi‑generational planning for legacy, governance, and impact.',
    bullets: [
      'Trust and estate planning',
      'Family governance and education',
      'Intergenerational tax strategy',
      'Philanthropy and impact frameworks',
    ],
  },
];

const WhoWeServe = () => {
  return (
    <div className="wws-page">
      <IntroSection />

      {/* Audience grid */}
      <section className="wws-audiences container" aria-labelledby="audiences-heading">
        <h2 id="audiences-heading" className="section-title">Tailored Expertise for Every Client</h2>
        <div className="audiences-grid">
          {segments.map((s) => (
            <AudienceCard key={s.key} title={s.title} subtitle={s.subtitle} bullets={s.bullets} type={s.key} />
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default WhoWeServe;
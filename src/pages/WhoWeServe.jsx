import React, { useEffect, useState } from 'react';
import './WhoWeServe.css';
import { motion } from "framer-motion";
import { useLocation, Link } from 'react-router-dom';


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
      <h1 id="wws-title" className="wws-title">
        <span className="title-black">Who We</span> <span className="title-gold">Serve</span>
      </h1>
      <p className="wws-subtitle">
        Nova Wealth delivers personalized, expert wealth management for diverse clients — integrating advanced portfolio design, cross‑border planning, and multi‑generational solutions with your goals and values.
      </p>
    </div>
  </section>
);

// Alternating row component (text + image card)
const AudienceRow = ({ id, tag, title, desc, bullets, type, image, caption, reverse }) => (
  <article id={id} className={`wws-row ${reverse ? 'reverse' : ''}`} aria-label={title}>
    <div className="wws-text">
      
      <motion.span
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       viewport={{ once: true, amount: 0.3 }}
       className="wws-tag font-bold text-xl tracking-wide text-black flex items-center gap-2 uppercase"
       aria-label="Audience category"
>
     <SegmentIcon type={type} />
     {tag}
     </motion.span>


      <h3 className="wws-title-3">{title}</h3>
      <p className="wws-desc">{desc}</p>
      <ul className="wws-bullets" aria-label="Tailored services">
        {bullets.map((b) => (
          <li key={b}>
            <span className="wws-bullet-icon" aria-hidden="true"><CheckIcon /></span>
            <span className="wws-bullet-text">{b}</span>
          </li>
        ))}
      </ul>
    </div>
    <figure className="wws-media">
      <div className="wws-image-card">
        <img src={image} alt={`${tag} illustration`} />
      </div>
      <figcaption className="wws-image-caption">{caption}</figcaption>
    </figure>
  </article>
);

// CTA section
const CTASection = () => (
  <section className="wws-cta-band" aria-labelledby="wws-cta-title">
    <div className="container cta-container">
      <h2 id="wws-cta-title" className="cta-title">See How We Can Help You</h2>
      <p className="cta-subtext">Book an appointment with Nova Wealth to explore a strategy tailored to you.</p>
      <div className="cta-actions">
        <Link to="/assessment" className="btn btn-outline-light" aria-label="Book Appointment">Book Appointment</Link>
        <Link to="/contact" className="btn btn-light" aria-label="Contact Nova Wealth">Contact Us</Link>
      </div>
    </div>
  </section>
);

// Page data with images and captions for alternating layout
const segments = [
  {
    key: 'hni',
    id: 'hni',
    tag: 'High‑Net‑Worth Individuals     (HNWI)',
    //title: 'Sophisticated Wealth Management for Discerning Clients',
    desc: 'You’ve worked hard to build substantial wealth, and now you need sophisticated strategies to preserve and grow it. Our HNWI‑focused approach combines institutional‑grade risk governance with tax‑efficient structures and access to alternative investments and philanthropy.',
    bullets: [
      'Advanced portfolio construction & risk management',
      'Tax‑efficient wealth strategies',
      'Access to exclusive investment opportunities',
    ],
    image: '/images/HNWI.png',
    caption: 'Ksh.1M+ Assets',
  },
  {
    key: 'pro',
    id: 'growing-professionals',
    tag: 'Growing Professionals',
    //title: 'Building Your Financial Foundation for Tomorrow',
    desc: 'You’re in the prime of your career, earning well and ready to make smart financial decisions. We help ambitious professionals like you create durable, growing portfolios aligned with goals and risk — with automation to keep your strategy consistent.',
    bullets: [
      'Strategic investing, retirement & 401(k) optimization',
      'Goal‑based portfolios & disciplined planning',
      'Insurance & protection planning',
    ],
    image: '/images/Career-Growth.png',
    caption: 'Career Growth',
  },
  {
    key: 'diaspora',
    id: 'diaspora-clients',
    tag: 'Diaspora Clients',
    //title: 'Bridging Borders, Building Wealth Across Continents',
    desc: 'Living and working across different countries brings unique financial challenges and opportunities. We specialize in helping diaspora clients navigate complex cross‑border wealth management and multi‑currency portfolios.',
    bullets: [
      'Cross‑border tax planning & compliance',
      'Multi‑country portfolio management',
      'International remittance optimization',
    ],
    image: '/images/Global-reach.png',
    caption: 'Global Reach',
  },
  {
    key: 'owners',
    id: 'business-owners',
    tag: 'Business Owners',
    //title: 'Aligning Business Success with Personal Wealth',
    desc: 'As a business owner, your personal and business finances are intricately connected. We help you optimize both sides of the equation, from business succession planning to personal wealth extraction strategies that maximize your financial potential.',
    bullets: [
      'Business succession & exit planning',
      'Cash flow optimization strategies',
      'Key person insurance & risk management',
    ],
    image: '/images/Enterprise- Focus.png',
    caption: 'Enterprise Focus',
  },
  {
    key: 'families',
    id: 'families-multi-generationl-wealth',
    tag: 'Families & Multi‑Generationl-Wealth',
    //title: 'Preserving Legacy, Empowering Future Generations',
    desc: 'Building wealth across generations requires thoughtful planning and expert guidance. We help families create multi‑generational strategies that preserve values, align decisions, and empower the next generation to be responsible stewards of their family wealth.',
    bullets: [
      'Estate planning & wealth transfer strategies',
      'Family governance & education',
      'Philanthropy & impact frameworks',
    ],
    image: '/images/Multi-Generationl-Wealth.png',
    caption: 'Legacy Planning',
  },
];

const WhoWeServe = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
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
  function scrollToId(id) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset
    const offset = 90
    window.scrollTo({ top: y - offset, behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <div className="wws-page">
      <div className="page-mobile-dropdown">
        <button type="button" className="dropdown-toggle" onClick={() => setOpen(v => !v)}>
          <span>Segments</span>
          <span>{open ? '▴' : '▾'}</span>
        </button>
        {open && (
          <div className="dropdown-panel">
            {segments.map(s => (
              <button key={s.id} className="dropdown-link" onClick={() => scrollToId(s.id)}>
                {s.tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <IntroSection />

      {/* Alternating rows */}
      <section className="wws-rows-section" aria-label="Audiences">
        <div className="container">
          <div className="wws-rows">
            {segments.map((s, idx) => (
              <AudienceRow
                key={s.key}
                id={s.id}
                tag={s.tag}
                title={s.title}
                desc={s.desc}
                bullets={s.bullets}
                type={s.key}
                image={s.image}
                caption={s.caption}
                reverse={idx % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default WhoWeServe;

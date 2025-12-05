import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IntroSection from '../components/About/IntroSection';
import OurStory from '../components/About/OurStory';
import OurProcess from '../components/About/OurProcess';
import OurPurposeSection from '../components/About/OurPurposeSection';
import ValuesGrid from '../components/About/ValuesGrid';
import TeamGrid from '../components/About/TeamGrid';
import CTASection from '../components/About/CTASection';
import WhyNovaWealth from '../components/About/WhyNovaWealth';

// About page composition: header/footer provided elsewhere; render sections only
const About = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const anchors = [
    { label: 'About Nova Wealth', id: 'about-nova-wealth' },
    { label: 'Our Story', id: 'our-story' },
    { label: 'Our Purpose', id: 'our-purpose' },
    { label: 'Our Values', id: 'our-values' },
    { label: 'Why Nova Wealth', id: 'why-nova-wealth' },
    { label: 'Our Process', id: 'our-process' },
    { label: 'Meet Our Founders', id: 'meet-our-founders' },
  ]

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
    <main className="w-full bg-white">
      <div className="page-mobile-dropdown">
        <button type="button" className="dropdown-toggle" onClick={() => setOpen(v => !v)}>
          <span>Sections</span>
          <span>{open ? '▴' : '▾'}</span>
        </button>
        {open && (
          <div className="dropdown-panel">
            {anchors.map(a => (
              <button key={a.id} className="dropdown-link" onClick={() => scrollToId(a.id)}>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-20 md:space-y-24">
        <IntroSection />
      <OurStory />
      <OurPurposeSection />
      <ValuesGrid />
      <WhyNovaWealth />
      <OurProcess />
      <TeamGrid />
      <CTASection />
      </div>
    </main>
  );
};

export default About;

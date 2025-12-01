import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IntroSection from '../components/About/IntroSection';
import OurStory from '../components/About/OurStory';
import OurProcess from '../components/About/OurProcess';
import OurPurposeSection from '../components/About/OurPurposeSection';
import ValuesGrid from '../components/About/ValuesGrid';
import TeamGrid from '../components/About/TeamGrid';
import CTASection from '../components/About/CTASection';

// About page composition: header/footer provided elsewhere; render sections only
const About = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const anchors = [
    { label: 'About Nova Wealth', id: 'about-nova-wealth' },
    { label: 'Our Story', id: 'our-story' },
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
    <main className="w-full space-y-20 md:space-y-24 bg-white">
      <IntroSection />
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
      <OurStory />
      <OurPurposeSection />
      <ValuesGrid />
      <section id="why-nova-wealth" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#000000] text-center">Why Nova Wealth?</h2>
          
          <div className="border-b border-[#FFD700] w-24 mx-auto my-5" aria-hidden="true"/>
          <p className="font-opensans text-[#333333] text-lg md:text-xl text-center max-w-3xl mx-auto mt-3">There are thousands of financial advisors globally. Why should you work with us?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <h3 className="font-montserrat text-xl font-semibold text-[#333333]">Fiduciary Responsibility </h3>
              <p className="font-opensans text-gray-700 mt-2">As a Registered Investment Advisor, we have a legal fiduciary responsibility to act solely with our client’s investment goals and interests in mind, free from direct or indirect conflicts of interest.</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <h3 className="font-montserrat text-xl font-semibold text-[#333333]">Independent </h3>
              <p className="font-opensans text-gray-700 mt-2">We are not owned or receive compensation from any other financial services company, we offer no proprietary products, have no conflict of interest to sell any financial firm's products, and are free of investment banking and proprietary trading conflicts. We have no product quotas or sales goals; we work for our clients, not sales managers.</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <h3 className="font-montserrat text-xl font-semibold text-[#333333]">Accountability </h3>
              <p className="font-opensans text-gray-700 mt-2">We are here to help you keep what’s best for you and your family in mind at all times.
If you’re spending too much or not saving enough to stay on track for your goals, we will make sure you know it – and we’ll make sure it gets set right.
</p>
            </div>
          </div>
        </div>
      </section>
      <OurProcess />
      <TeamGrid />
      <CTASection />
    </main>
  );
};

export default About;

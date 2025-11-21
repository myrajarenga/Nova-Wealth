import React, { useState } from 'react';
import IntroSection from '../components/About/IntroSection';
import OurStory from '../components/About/OurStory';
import OurPurposeSection from '../components/About/OurPurposeSection';
import ValuesGrid from '../components/About/ValuesGrid';
import TeamGrid from '../components/About/TeamGrid';
import CTASection from '../components/About/CTASection';

// About page composition: header/footer provided elsewhere; render sections only
const About = () => {
  const [open, setOpen] = useState(false)
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

  return (
    <main className="w-full space-y-20 md:space-y-24 bg-white">
      <IntroSection />
      <OurStory />
      <OurPurposeSection />
      <ValuesGrid />
      <section id="why-nova-wealth" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#000000] text-center">Why Nova Wealth?</h2>
          <p className="font-opensans text-[#333333] text-lg md:text-xl text-center max-w-3xl mx-auto mt-3">There are thousands of financial advisors globally. Why should you work with us?</p>
          <div className="border-b border-[#FFD700] w-24 mx-auto my-5" aria-hidden="true"/>
          
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
      <section id="our-process" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#000000] text-center">Our Process</h2>
          <div className="border-b border-[#FFD700] w-24 mx-auto my-5" aria-hidden="true"/>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="text-[#FFD700] font-montserrat font-bold">01</div>
              <h3 className="font-montserrat text-xl font-semibold text-[#333333] mt-1">Discover</h3>
              <p className="font-opensans text-gray-700 mt-2">Understand goals, values, timelines, and constraints.</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="text-[#FFD700] font-montserrat font-bold">02</div>
              <h3 className="font-montserrat text-xl font-semibold text-[#333333] mt-1">Design</h3>
              <p className="font-opensans text-gray-700 mt-2">Build tailored strategies across planning and investment.</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="text-[#FFD700] font-montserrat font-bold">03</div>
              <h3 className="font-montserrat text-xl font-semibold text-[#333333] mt-1">Deploy</h3>
              <p className="font-opensans text-gray-700 mt-2">Implement portfolios and action plans with clear steps.</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="text-[#FFD700] font-montserrat font-bold">04</div>
              <h3 className="font-montserrat text-xl font-semibold text-[#333333] mt-1">Review</h3>
              <p className="font-opensans text-gray-700 mt-2">Monitor, report, and adapt as life and markets evolve.</p>
            </div>
          </div>
        </div>
      </section>
      <TeamGrid />
      <CTASection />
    </main>
  );
};

export default About;
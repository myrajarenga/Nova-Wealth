import React from 'react';
import './WhyNovaWealth.css';

const WhyNovaWealth = () => {
  const cards = [
    {
      title: 'Fiduciary Responsibility',
      desc: 'At Nova Wealth, we act as true stewards of your wealth. We are committed to protecting your interests with transparency, integrity, and care. Every piece of advice, every investment selected, and every strategy crafted must be driven by your goals, values, and risk profile, not by commissions, or external incentives. Our success is intrinsically tied to the growth and protection of your wealth, not the sale of a proprietary product. With Nova Wealth, you never have to wonder if our counsel is shaded by a hidden incentive. Your financial well-being is our only agenda.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: 'Independence',
      desc: 'We are proudly independent. This allows us to offer objective, unbiased advice and access a wide range of local and global investment opportunities without being tied to any single institution or product provider. Our independence gives us the freedom to construct solutions that are truly tailored, flexible, and aligned with your evolving needs, whether personal, family, or corporate. Our independence ensures that the voice you hear is yours, echoed back with clarity and purpose, never diluted by corporate allegiance. We are not beholden to anyone but you.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: 'Accountability',
      desc: 'We believe trust is earned through transparency and consistency. At Nova Wealth, we demystify wealth management with crystalline clarity. You will understand our fees, our process, and the rationale behind every decision. Accountability means clear communication, disciplined execution, and ongoing review of your financial strategy. We don\'t just set up a plan; we take ownership of our advice, provide regular reporting, and remain actively engaged as your circumstances and markets change. We are not just responsible for your wealth; we are answerable to you for its management.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    }
  ];

  return (
    <section id="why-nova-wealth" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#000000] text-center">Why Nova Wealth?</h2>

        <div className="border-b border-[#FFD700] w-24 mx-auto my-5" aria-hidden="true" />
        <p className="font-opensans text-[#333333] text-lg md:text-xl text-center max-w-3xl mx-auto mt-3 mb-12">
          At Nova Wealth, we understand that choosing a wealth advisory partner is one of the most important decisions you will make. That's why we are built on three uncompromising principles that ensure your interests always come first:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flip-grid">
          {cards.map((card, index) => (
            <div className="flip-card-container" key={index}>
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="flip-icon-wrapper">
                    {card.icon}
                  </div>
                  <h3 className="flip-title">{card.title}</h3>
                  <div className="flip-indicator">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <h3 className="flip-title">{card.title}</h3>
                  <p className="flip-desc">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-opensans text-[#333333] text-lg md:text-xl text-center max-w-4xl mx-auto mt-12">
          Together, these three principles form the foundation of our promise, to deliver wealth advisory that is ethical, transparent, and tailored to your journey. Nova Wealth is not just an advisor, we are a steward of your wealth, committed to protecting today's decisions and securing tomorrow's legacy.
        </p>
      </div>
    </section>
  );
};

export default WhyNovaWealth;

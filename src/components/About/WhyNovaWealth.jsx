import React from 'react';
import './WhyNovaWealth.css';

const WhyNovaWealth = () => {
  const cards = [
    {
      title: 'Fiduciary Responsibility',
      desc: 'As a Registered Investment Advisor, we have a legal fiduciary responsibility to act solely with our client’s investment goals and interests in mind, free from direct or indirect conflicts of interest.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: 'Independent',
      desc: 'We are not owned or receive compensation from any other financial services company, we offer no proprietary products, have no conflict of interest to sell any financial firm\'s products, and are free of investment banking and proprietary trading conflicts. We have no product quotas or sales goals; we work for our clients, not sales managers.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: 'Accountability',
      desc: 'We are here to help you keep what’s best for you and your family in mind at all times. If you’re spending too much or not saving enough to stay on track for your goals, we will make sure you know it – and we’ll make sure it gets set right.',
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
        
        <div className="border-b border-[#FFD700] w-24 mx-auto my-5" aria-hidden="true"/>
        <p className="font-opensans text-[#333333] text-lg md:text-xl text-center max-w-3xl mx-auto mt-3 mb-12">
          There are thousands of financial advisors globally. Why should you work with us?
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
      </div>
    </section>
  );
};

export default WhyNovaWealth;

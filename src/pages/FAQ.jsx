import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// FAQ Data
const faqData = [
  {
    category: "About Nova Wealth & Services",
    questions: [
      {
        q: "What services does Nova Wealth offer?",
        a: "Nova Wealth provides end-to-end wealth management services, including financial planning, investment management, portfolio construction and management, retirement planning, risk management, legacy and estate planning, and tax-efficient wealth strategies. Our approach combines global best practices with deep local market expertise."
      },
      {
        q: "What makes Nova Wealth different from other wealth management firms?",
        a: "Nova Wealth is a boutique by design—meaning we provide highly personalized, relationship-driven advisory services. Our team blends global investment insights with a deep understanding of the Kenyan and East African financial landscape. Our difference lies in our deep, relationship-based approach, sophisticated investment research, and a firm-wide commitment to acting as your dedicated fiduciary—meaning your best interests are always our first priority."
      }
    ]
  },
  {
    category: "Who We Serve",
    questions: [
      {
        q: "Who does Nova Wealth work with?",
        a: "We primarily serve high-net-worth individuals (HNWIs), working professionals, business owners, and expatriates/diaspora clients seeking structured wealth solutions. Whether you are building wealth, preserving it, or planning your financial legacy, our services are tailored to your unique life stage and goals."
      },
      {
        q: "I'm a successful professional, but I'm not sure if I have enough assets to need a wealth manager. When is the right time to start?",
        a: "The right time to build wealth is now. Proactive financial planning is the key to transitioning from being a high earner to being truly wealthy. We help working professionals like you structure your finances from the ground up—managing debt, maximizing investments, saving for retirement, and protecting your income. Starting early allows the power of compounding to work in your favor, setting up a strong foundation for future wealth."
      },
      {
        q: "As a high-net-worth individual, my financial situation is complex. How can you help me?",
        a: "We specialize in navigating complexity. Our integrated approach brings together all aspects of your financial life—investments, business holdings, real estate, and legacy structures—into a single, coherent strategy. We provide sophisticated solutions for concentrated stock positions, succession planning for family businesses, and advanced tax-efficient strategies to preserve and grow your wealth across generations."
      }
    ]
  },
  {
    category: "Investment Philosophy & Process",
    questions: [
      {
        q: "How does Nova Wealth develop a personalized financial plan?",
        a: "We begin with a comprehensive financial discovery session to understand your goals, current financial situation, risk profile, and long-term aspirations. Using this information, we design a customized financial plan that aligns with your objectives and continually adjust it as your circumstances evolve."
      },
      {
        q: "What does the financial planning process at Nova Wealth look like?",
        a: "Our process is collaborative and comprehensive. It begins with a deep discovery session to understand your complete financial picture and life goals. We then analyze your current situation, develop a customized plan, and present our recommendations. Once you approve, we implement the strategy and provide ongoing monitoring and reviews to ensure we stay on track as your life and the markets evolve."
      },
      {
        q: "What investment philosophy does Nova Wealth follow?",
        a: "Our investment philosophy is grounded in principles of long-term value, strategic asset allocation, and evidence-based investing. We believe in constructing well-diversified, resilient portfolios tailored to your specific risk tolerance and time horizon. We avoid chasing short-term trends, focusing instead on high-quality assets and disciplined rebalancing to help you achieve your lifelong financial objectives. Whether investing locally or globally, our aim is to balance risk and return while protecting your capital."
      },
      {
        q: "Do you provide specific investment products, or is your advice independent?",
        a: "Our advice is entirely independent and conflict-free. We do not have any proprietary products to sell. This objectivity allows us to select from the best available local and international investment vehicles—including equities, bonds, unit trusts, and alternative assets—to construct a portfolio that is purely in your best interest. Our fee structure is transparent and aligned with your success."
      }
    ]
  },
  {
    category: "Specialized Needs",
    questions: [
      {
        q: "Can Nova Wealth manage international or multi-currency investments?",
        a: "Yes. We support multi-currency portfolios and global investment access, allowing clients—especially expatriates and diaspora investors—to hold, grow, and diversify wealth across regional and international markets."
      },
      {
        q: "We are expatriates living in Kenya / part of the diaspora abroad. Can you manage our cross-border financial complexities?",
        a: "Absolutely. This is a core specialty at Nova Wealth. We understand the unique challenges of international mobility, including tax implications in multiple jurisdictions, currency risk (forex), and navigating diverse regulatory environments. We design portfolios and financial plans that are globally aware, helping you make sound financial decisions whether you are planning to return to Kenya, invest from abroad, or manage assets across borders."
      },
      {
        q: "I'm a busy business owner. How can you help me separate my personal wealth from my business?",
        a: "This is a critical step for long-term security. We work with you to create a clear demarcation between your corporate and personal finances. This includes strategies for extracting wealth from your business efficiently, building a diversified personal investment portfolio that isn't reliant on the company's performance, and integrating your business exit or succession plan with your personal retirement and legacy goals."
      }
    ]
  },
  {
    category: "Retirement & Legacy Planning",
    questions: [
      {
        q: "How does Nova Wealth help clients plan for retirement?",
        a: "We develop personalised retirement strategies that incorporate income needs, longevity risk, inflation, healthcare costs, and diverse retirement income streams. Our solutions help you accumulate, protect, and distribute retirement assets in a tax-efficient and sustainable way."
      },
      {
        q: "How do you approach risk management beyond investments?",
        a: "True wealth preservation extends beyond the portfolio. Our risk management approach is holistic. We analyze risks to your income, health, and assets, and advise on appropriate structures and insurance solutions. For business owners, this includes key-person insurance and succession planning. For families, it involves legacy planning and ensuring your wealth is protected and transferred according to your wishes."
      },
      {
        q: "Do you help with estate planning, legacy planning, and wealth transfer?",
        a: "Yes. Nova Wealth guides clients through creating structured legacy plans, including wills, trusts, succession frameworks for business owners, and inter-generational wealth transfer strategies. We collaborate with legal and tax professionals to ensure your legacy is preserved and efficiently passed on."
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do you charge for your services?",
        a: "We believe in complete transparency. Nova Wealth operates primarily on a fee-based model. This aligns our success directly with the growth of your wealth. For specific planning projects, we may offer a fixed fee arrangement. All fees are discussed and agreed upon upfront, with no hidden charges or commissions."
      },
      {
        q: "What is the minimum investment required to work with Nova Wealth?",
        a: "Nova Wealth offers tailored solutions, and the minimum investment amount depends on the service level selected. Typically, our advisory and investment management services start at a threshold suitable for high-net-worth and affluent clients. We provide clarity on these thresholds during the initial consultation."
      },
      {
        q: "How do I get started with Nova Wealth?",
        a: "You can begin by scheduling a consultation through our website or contacting us directly. In the initial conversation, we’ll understand your financial goals, discuss your needs, and recommend the most suitable wealth management pathway. This session also helps us determine whether we are a good fit for each other."
      }
    ]
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg md:text-xl font-semibold font-montserrat transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-[#0B1215] group-hover:text-[#D4AF37]'}`}>
          {question}
        </span>
        <span className="ml-4 flex-shrink-0">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-gray-400 text-gray-400 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-gray-600 font-opensans leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Scroll to category
  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    const element = document.getElementById(cat.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      const offset = 100; // Navbar height + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-[#D4AF37]">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B1215' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-[#0B1215] mb-0 leading-tight">
              FAQ's
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Categories (Sticky on Desktop) */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 space-y-2">
                <h3 className="text-[#D4AF37] font-bold mb-4 uppercase tracking-wider text-sm font-montserrat">Categories</h3>
                {faqData.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCategory(cat.category)}
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 text-sm font-semibold font-montserrat
                      ${activeCategory === cat.category 
                        ? 'bg-[#D4AF37] text-[#0B1215] shadow-lg transform translate-x-2' 
                        : 'text-gray-500 hover:text-[#0B1215] hover:bg-gray-100'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Category Filter (Horizontal Scroll) */}
            <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-3 min-w-max">
                {faqData.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCategory(cat.category)}
                    className={`py-2 px-4 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300 font-montserrat
                      ${activeCategory === cat.category 
                        ? 'bg-[#D4AF37] text-[#0B1215]' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Lists */}
            <div className="lg:w-3/4 space-y-16">
              {faqData.map((cat, catIdx) => (
                <div 
                  key={catIdx} 
                  id={cat.category.replace(/\s+/g, '-').toLowerCase()}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B1215] mb-8 pb-4 border-b border-gray-200 font-montserrat">
                    {cat.category}
                  </h2>
                  {/* White Container for FAQs */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
                    {cat.questions.map((q, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        question={q.q}
                        answer={q.a}
                        isOpen={openItems[`${catIdx}-${qIdx}`]}
                        onClick={() => toggleItem(catIdx, qIdx)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1215] mb-6 font-montserrat">
            Still have questions?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 font-opensans">
            Your financial future is too important to leave to chance. Schedule a complimentary discovery call with our team today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0B1215] text-white font-bold rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 font-montserrat"
            >
              Contact Us
            </Link>
            <button 
              onClick={() => {
                  if (window.Calendly) {
                      window.Calendly.initPopupWidget({
                          url: 'https://calendly.com/novawealth-info/30min'
                      });
                  }
              }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0B1215] text-[#0B1215] font-bold rounded-lg hover:bg-[#0B1215] hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 font-montserrat"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

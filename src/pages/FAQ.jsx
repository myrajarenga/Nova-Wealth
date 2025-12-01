import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// FAQ Data
const faqData = [
  {
    category: "About Nova Wealth",
    questions: [
      {
        q: "What is Nova Wealth?",
        a: "Nova Wealth is a boutique wealth management firm dedicated to helping individuals, families, and business owners build, preserve, and transfer wealth. We act as your fiduciary partner, providing personalized financial planning and investment strategies tailored to your unique goals."
      },
      {
        q: "Are you a fiduciary?",
        a: "Yes. As a fiduciary, we are legally and ethically bound to act in your best interest at all times. We do not sell proprietary products or earn commissions on investment recommendations, ensuring our advice is objective and unbiased."
      },
      {
        q: "Where are you located?",
        a: "We are based in Nairobi, serving clients locally and across the diaspora. However, we operate as a digital-first firm, allowing us to work seamlessly with clients regardless of their physical location."
      }
    ]
  },
  {
    category: "Investment Philosophy & Strategy",
    questions: [
      {
        q: "What is your investment philosophy?",
        a: "We believe in a goal-based, long-term investment approach. We focus on asset allocation, diversification, and cost efficiency to maximize returns while managing risk. Our strategies are data-driven and disciplined, avoiding short-term market speculation."
      },
      {
        q: "How do you manage risk?",
        a: "Risk management is at the core of our process. We assess your personal risk tolerance and time horizon to construct a portfolio that balances growth potential with preservation. We continuously monitor and rebalance portfolios to ensure they stay aligned with your objectives."
      },
      {
        q: "Do you use proprietary investment products?",
        a: "No. We are an independent firm with an open architecture platform. This means we have the freedom to select the best-in-class investment vehicles from the entire market, without any pressure to sell specific products."
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I become a client?",
        a: "Starting is simple. You can book a complimentary Discovery Call through our website. During this session, we'll discuss your financial situation and goals to determine if we are the right fit for each other."
      },
      {
        q: "What is the minimum investment tailored for?",
        a: "We work with a diverse range of clients. While we specialize in high-net-worth individuals, we also have tailored programs for growing professionals. We recommend booking a consultation to discuss which service tier best suits your current financial standing."
      },
      {
        q: "What documents do I need for the initial meeting?",
        a: "For the initial Discovery Call, you don't need to prepare formal documents. Just bring a general idea of your assets, liabilities, income, and—most importantly—your financial goals and questions."
      }
    ]
  },
  {
    category: "Retirement, Risk & Legacy Planning",
    questions: [
      {
        q: "Do you help with estate planning?",
        a: "Yes. We work closely with you to structure your estate plan, ensuring your assets are transferred efficiently and according to your wishes. We often collaborate with your legal advisors to draft wills, trusts, and beneficiary designations."
      },
      {
        q: "Can you help me plan for early retirement?",
        a: "Absolutely. We specialize in modeling various retirement scenarios. We help you understand how much you need to save, how to invest for growth, and how to structure withdrawals to sustain your lifestyle throughout retirement."
      }
    ]
  },
  {
    category: "Specialized Needs",
    questions: [
      {
        q: "Do you work with business owners?",
        a: "Yes. We understand the unique challenges business owners face, from cash flow management to succession planning and exit strategies. We help integrate your business finances with your personal wealth plan."
      },
      {
        q: "I live abroad. Can you help with cross-border wealth management?",
        a: "Yes. We have extensive experience working with diaspora clients. We understand the complexities of cross-border investing, tax compliance, and managing assets across different jurisdictions."
      }
    ]
  },
  {
    category: "Fees & Independence",
    questions: [
      {
        q: "How are you compensated?",
        a: "We operate on a transparent fee-only or fee-based structure, typically a percentage of assets under management or a flat planning fee. We will fully disclose all fees in writing before we begin our engagement."
      },
      {
        q: "Are there any hidden fees?",
        a: "No. Transparency is one of our core values. You will always know exactly what you are paying for our services. We do not receive kickbacks or hidden commissions from third parties."
      }
    ]
  },
  {
    category: "For Working Professionals",
    questions: [
      {
        q: "I'm just starting to build wealth. Can you help?",
        a: "Yes. Our 'Growing Professionals' service is designed for high-earners who are in the accumulation phase of their wealth journey. We help you establish strong financial habits, optimize your savings, and build a robust investment portfolio."
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
      <section className="relative py-24 px-4 overflow-hidden bg-[#D4AF37]">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-[#0B1215] mb-8 leading-tight">
              Still got questions?<br />
              We've got answers
            </h1>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-[#0B1215] font-medium max-w-3xl mx-auto font-opensans leading-relaxed">
                Find all the information you need about our services, investments, and financial planning in one place.
              </p>
              <p className="text-lg md:text-xl text-[#0B1215] font-medium max-w-3xl mx-auto font-opensans leading-relaxed">
                Can't find what you're looking for? We're just a message away.
              </p>
            </div>
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

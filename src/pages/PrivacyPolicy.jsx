import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const privacyData = [
  {
    id: "info-collect",
    title: "1. Information We Collect",
    content: (
      <div className="space-y-6 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>
          <strong>1.1 Personal Information</strong><br />
          Full name, contact details, nationality, date of birth. Employment and income information. Identification documents (ID, passport for KYC compliance).
        </p>
        <p>
          <strong>1.2 Financial Information</strong><br />
          Investment objectives, risk profile, time horizon. Asset details (local and global), investment history. Bank details necessary for account setup or transactions. Business ownership, real estate holdings, trusts, or estate documents.
        </p>
        <p>
          <strong>1.3 Digital Information</strong><br />
          IP address, browser type, device information. Website usage data, cookies, analytics. Communication history (emails, chats, forms).
        </p>
        <p>
          <strong>1.4 Regulatory & Compliance Information</strong><br />
          AML documentation. KYC verification data. Tax residency and reporting (FATCA/CRS).
        </p>
      </div>
    )
  },
  {
    id: "why-collect",
    title: "2. Why We Collect Your Information",
    content: (
      <div className="space-y-4 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>We collect your personal and financial information for the following key purposes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>To provide personalized financial planning and wealth management services tailored to your unique goals.</li>
          <li>To execute investment transactions and manage your portfolio effectively.</li>
          <li>To comply with legal and regulatory obligations, including Anti-Money Laundering (AML) and Know Your Customer (KYC) laws.</li>
          <li>To communicate with you regarding your account, market updates, and service enhancements.</li>
          <li>To verify your identity and protect against fraud or unauthorized access.</li>
        </ul>
      </div>
    )
  },
  {
    id: "how-use",
    title: "3. How We Use Your Information",
    content: (
      <div className="space-y-4 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>Your information is used strictly for professional and operational purposes, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Service Delivery:</strong> Onboarding you as a client, creating investment strategies, and managing assets.</li>
          <li><strong>Communication:</strong> Sending statements, reports, and responding to your inquiries.</li>
          <li><strong>Compliance:</strong> Meeting reporting requirements for tax authorities and financial regulators.</li>
          <li><strong>Improvement:</strong> Analyzing usage trends to enhance our website and digital services.</li>
        </ul>
      </div>
    )
  },
  {
    id: "how-protect",
    title: "4. How We Protect Your Information",
    content: (
      <div className="space-y-6 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <div>
          <h4 className="font-bold text-[#0B1215] mb-2">4.1 Technical Safeguards</h4>
          <p>We employ advanced encryption standards (AES) for data at rest and in transit. Our systems are protected by robust firewalls, intrusion detection systems, and regular security audits to prevent unauthorized access.</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0B1215] mb-2">4.2 Organizational Safeguards</h4>
          <p>Access to your personal information is restricted to authorized personnel only. All employees undergo strict data privacy training and are bound by confidentiality agreements.</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0B1215] mb-2">4.3 Client Safeguards</h4>
          <p>We implement multi-factor authentication (MFA) and strict verification procedures for all account instructions to ensure that only you can authorize transactions.</p>
        </div>
      </div>
    )
  },
  {
    id: "sharing",
    title: "5. Sharing Your Information",
    content: (
      <div className="space-y-4 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>We do not sell, rent, or trade your personal information. We may share your data only with:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Custodians & Partners:</strong> Trusted third-party financial institutions that hold your assets or facilitate transactions.</li>
          <li><strong>Regulators:</strong> Government authorities and regulatory bodies as required by law (e.g., CMA, KRA).</li>
          <li><strong>Service Providers:</strong> Vetted technology and professional service providers (auditors, legal advisors) who assist our operations, under strict confidentiality agreements.</li>
        </ul>
      </div>
    )
  },
  {
    id: "international",
    title: "6. International Data Transfers",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>As a firm with global investment capabilities, some of your data may be processed or stored outside of Kenya. In such cases, we ensure that these cross-border transfers comply with applicable data protection laws and that your information remains protected by adequate safeguards.</p>
      </div>
    )
  },
  {
    id: "cookies",
    title: "7. Cookies and Website Tracking",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control or disable cookies through your browser settings, though this may affect some website functionalities.</p>
      </div>
    )
  },
  {
    id: "rights",
    title: "8. Your Rights",
    content: (
      <div className="space-y-4 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> Request deletion of your data, subject to legal retention requirements.</li>
          <li><strong>Objection:</strong> Object to the processing of your data for specific purposes.</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service provider.</li>
        </ul>
      </div>
    )
  },
  {
    id: "retention",
    title: "9. Data Retention",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements. Once the retention period expires, your data is securely deleted or anonymized.</p>
      </div>
    )
  },
  {
    id: "links",
    title: "10. Third-Party Links",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any website you visit.</p>
      </div>
    )
  },
  {
    id: "children",
    title: "11. Children’s Privacy",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.</p>
      </div>
    )
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: (
      <div className="text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The "Last Updated" date at the top of this page indicates when the latest revisions were made. Continued use of our services implies acceptance of the updated policy.</p>
      </div>
    )
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: (
      <div className="space-y-4 text-[#0B1215] [&_p]:text-[#0B1215] [&_li]:text-[#0B1215] font-opensans leading-relaxed">
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
        <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
          <p className="font-bold text-[#0B1215] text-lg mb-2">Nova Wealth</p>
          <p>Email: <a href="mailto:info@novawealth.co.ke" className="text-[#D4AF37] hover:underline">info@novawealth.co.ke</a></p>
          <p>Phone: <a href="tel:+254737648915" className="text-[#D4AF37] hover:underline">+254 737 648 915</a></p>
          <p>Website: <a href="https://www.novawealth.co.ke" className="text-[#D4AF37] hover:underline">www.novawealth.co.ke</a></p>
        </div>
      </div>
    )
  }
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(privacyData[0].id);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of privacyData) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
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
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-[#0B1215] mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-[#0B1215] font-medium max-w-2xl mx-auto font-opensans leading-relaxed">
              We are committed to protecting your privacy and safeguarding your personal and financial information with the highest ethical standards.
            </p>
            <p className="mt-4 text-sm text-[#0B1215] opacity-80 font-montserrat font-semibold">
              Last Updated: 2 Dec 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation (Sticky on Desktop) */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28">
                <h3 className="text-[#D4AF37] font-bold mb-6 uppercase tracking-wider text-sm font-montserrat">Table of Contents</h3>
                <nav className="space-y-1 border-l-2 border-gray-200">
                  {privacyData.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left py-2 px-4 transition-all duration-300 text-sm font-semibold font-montserrat border-l-2 -ml-[2px]
                        ${activeSection === section.id 
                          ? 'border-[#D4AF37] text-[#0B1215]' 
                          : 'border-transparent text-gray-500 hover:text-[#0B1215]'
                        }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Navigation (Horizontal Scroll) */}
            <div className="lg:hidden mb-8 sticky top-20 z-20 bg-gray-50 py-2 -mx-4 px-4 shadow-sm">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-3 min-w-max">
                  {privacyData.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-300 font-montserrat
                        ${activeSection === section.id 
                          ? 'bg-[#0B1215] text-[#D4AF37]' 
                          : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                    >
                      {section.title.split('.')[0] + '.'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4 space-y-12">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="mb-10 border-b border-gray-100 pb-8">
                  <p className="text-[#0B1215] font-opensans leading-relaxed text-lg">
                    Nova Wealth (“we,” “our,” or “us”) is committed to protecting your privacy, safeguarding your personal information, and maintaining the highest ethical standards in data confidentiality. As a fiduciary wealth management firm serving clients locally and globally, we treat your personal and financial data with the utmost care, responsibility, and transparency.
                  </p>
                  <p className="mt-4 text-[#0B1215] font-opensans leading-relaxed text-lg">
                    This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, our advisory team, or any of our services.
                  </p>
                </div>

                {privacyData.map((section) => (
                  <div 
                    key={section.id} 
                    id={section.id}
                    className="scroll-mt-32 mb-12 last:mb-0"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0B1215] mb-6 font-montserrat">
                      {section.title}
                    </h2>
                    {section.content}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

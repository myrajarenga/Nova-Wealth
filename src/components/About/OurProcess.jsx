import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const processSteps = [
  {
    id: 1,
    title: "Discovery & Visioning",
    description: "We help you discover where your life and financial goals intersect, getting to know your unique situation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Data Gathering & Case Planning",
    description: "We take a holistic approach to wealth planning by understanding your life goals and risk tolerance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Personalized Proposal",
    description: "We create a personalized wealth plan—a road map toward your goals, presenting clear steps to achieve your vision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Plan Implementation",
    description: "Once approved, we set your plan into motion—opening accounts, purchasing investments, and coordinating with professionals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Review",
    description: "We meet regularly to assess progress, evaluate your plan, and ensure your money works in your best interest.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  }
];

const ProcessCard = ({ step }) => (
  <div className="flex-shrink-0 w-80 mx-4 relative group">
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
        {step.icon}
      </div>
      <h3 className="text-xl font-bold text-[#0B1215] mb-2 font-montserrat">{step.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-opensans line-clamp-3 flex-grow">{step.description}</p>
    </div>
    {/* Arrow indicator pointing to the next card */}
    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 hidden md:block text-gray-300">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </div>
  </div>
);

const OurProcess = () => {
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/novawealth-info/30min' // Replace with actual Calendly URL if different
      });
    }
  };

  return (
    <section id="our-process" className="py-20 bg-gray-50 overflow-hidden">
       <style>{`
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
          }
          .animate-marquee {
              animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
              animation-play-state: paused;
          }
        `}</style>

      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1215] mb-4 font-montserrat">
            The Nova Way - Our Process
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-opensans">
            Effectively planning for all aspects of your financial life requires more than cookie-cutter financial advice. 
            At Nova Wealth, we utilize a simple five-step process that allows us to assess your individual needs, 
            develop a customized financial strategy, and provide continued service to keep that plan on track.
          </p>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Carousel */}
      <div className="relative w-full mb-16">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee py-4">
            {/* First set of cards */}
            {processSteps.map((step) => (
              <ProcessCard key={`set1-${step.id}`} step={step} />
            ))}
             {/* Duplicate set for seamless loop */}
            {processSteps.map((step) => (
              <ProcessCard key={`set2-${step.id}`} step={step} />
            ))}
             {/* Triplicate set just in case screen is very wide */}
             {processSteps.map((step) => (
              <ProcessCard key={`set3-${step.id}`} step={step} />
            ))}
          </div>
        </div>
         {/* Right fade effect */}
         <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
         {/* Left fade effect */}
         <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
         
         {/* Carousel Indicator Arrow (Visual Only) */}
         <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg text-[#D4AF37] hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
         </div>
      </div>

      <div className="bg-[#0B1215] py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-montserrat">
            Take the First Step
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg font-opensans">
            Your financial goals are within reach. Let us help you chart the course to get there. 
            Contact Nova Wealth today to take the first step towards a more confident, secure future.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/assessment" 
              className="inline-block bg-white text-[#0B1215] font-bold py-4 px-8 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
            >
              Let's Get Started
            </Link>
            <button 
              onClick={handleBookAppointment}
              className="inline-flex items-center justify-center border-2 border-[#D4AF37] text-[#D4AF37] font-bold py-3.5 px-8 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              Request an Appointment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;

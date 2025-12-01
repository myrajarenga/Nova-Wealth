import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const personas = {
  "Starter": {
    title: "The Aspiring Builder",
    description: "You are at the beginning of your wealth journey. Your focus should be on establishing a strong financial foundation, managing debt, and starting consistent investment habits.",
    recommendations: [
      "Create a monthly budget and emergency fund.",
      "Maximize employer-matched retirement contributions.",
      "Start a low-cost diversified investment portfolio."
    ]
  },
  "Planner": {
    title: "The Strategic Planner",
    description: "You have some assets and are looking to grow them systematically. You value stability but understand that growth requires some risk.",
    recommendations: [
      "Review your asset allocation to ensure it matches your timeline.",
      "Consider tax-advantaged investment accounts.",
      "Start planning for specific goals (e.g., home purchase, education)."
    ]
  },
  "Builder": {
    title: "The Wealth Accumulator",
    description: "You are in your peak earning years with significant assets. Your focus is shifting towards optimization, tax efficiency, and diversification.",
    recommendations: [
      "Optimize your portfolio for tax efficiency.",
      "Explore alternative investments for diversification.",
      "Review your insurance coverage and risk management."
    ]
  },
  "Wealth Accelerator": {
    title: "The Legacy Architect",
    description: "You have achieved significant financial success. Your focus is now on preservation, legacy planning, and sophisticated investment strategies.",
    recommendations: [
      "Implement comprehensive estate planning strategies.",
      "Explore private equity and structured products.",
      "Consider philanthropic giving and multi-generational wealth transfer."
    ]
  }
};

const AssessmentResults = () => {
  const location = useLocation();
  const result = location.state?.result || { persona: "Planner", fullName: "Guest" }; // Fallback
  const personaData = personas[result.persona] || personas["Planner"];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/novawealth-info/30min' });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
            Your Wealth Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Prepared for <span className="text-[#D4AF37]">{result.fullName}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Persona Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border-t-4 border-[#D4AF37] mb-12">
          <div className="p-8 md:p-12 text-center">
            <span className="inline-block px-4 py-1 bg-[#FFFDF5] text-[#D4AF37] text-sm font-bold tracking-wider uppercase mb-6 rounded-full border border-[#D4AF37]">
              Your Persona
            </span>
            <h2 className="font-montserrat text-4xl font-bold text-gray-900 mb-6">
              {personaData.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {personaData.description}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-black text-[#D4AF37] rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Key Recommendations
            </h3>
            <ul className="space-y-4">
              {personaData.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="h-6 w-6 text-[#D4AF37] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">
              Unlock Your Full Plan
            </h3>
            <p className="text-gray-600 mb-6">
              This is just the beginning. Create your account to access detailed financial tools, track your progress, and connect with an advisor.
            </p>
            <div className="space-y-4">
               {/* In a real app, these would link to specific dashboard actions */}
               <button className="w-full bg-[#D4AF37] text-black font-bold py-3 px-4 rounded hover:bg-[#B99A2F] transition-colors">
                 Access Client Centre
               </button>
               <button className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded hover:bg-gray-50 transition-colors">
                 Book a Strategy Call
               </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center border-t border-gray-200 pt-12">
          <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-4">
            Next Steps
          </h3>
          <p className="text-gray-600 mb-8">
            Check your email ({result.email}) for a copy of this report and login instructions.
          </p>
          <Link to="/" className="text-[#D4AF37] font-bold hover:underline">
            Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AssessmentResults;

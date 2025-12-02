import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const AssessmentResults = () => {
  const location = useLocation();
  // Safety check: If no state, redirect back to assessment
  if (!location.state?.result) {
    return <Navigate to="/assessment" replace />;
  }

  const result = location.state.result;
  
  // Helper to safely get score from answer object or default to 0
  const answers = result.answers || {};
  const getScore = (qId) => answers[qId]?.score || 0;
  const getMaxScore = (qId) => (qId === 10 ? 4 : 3); // Q10 has 4 options

  // Category Logic Configuration with Expert Insights
  const categories = [
    {
      id: 'health',
      title: 'Health Protection',
      maxPoints: 35,
      questionIds: [9], // Insurance
      description: "Coverage for medical and critical illness risks.",
      insights: {
        low: "Your health protection coverage appears minimal. In the event of a critical illness or major medical event, your wealth could be significantly eroded by out-of-pocket costs.",
        medium: "You have a baseline of health protection, but gaps may exist for specialized treatments or long-term care. A review is recommended.",
        high: "Excellent. You have prioritized health risk management, safeguarding your assets from medical-related depletion."
      }
    },
    {
      id: 'emergency',
      title: 'Emergency Readiness',
      maxPoints: 15,
      questionIds: [3], // Market volatility reaction (proxy for emotional/financial readiness)
      description: "Ability to handle financial shocks.",
      insights: {
        low: "Your approach to volatility suggests a need for a stronger liquidity buffer. Selling during downturns can permanently damage your long-term wealth.",
        medium: "You show some resilience, but may need a clearer strategy to navigate severe market or life shocks without stress.",
        high: "You demonstrate strong financial and emotional readiness for emergencies, treating volatility as an opportunity rather than a threat."
      }
    },
    {
      id: 'income',
      title: 'Income Security',
      maxPoints: 35,
      questionIds: [1, 6], // Priority, Tax (proxy for optimizing income)
      description: "Stability and optimization of earnings.",
      insights: {
        low: "Your income strategy may be leaking value through tax inefficiencies or lack of aggressive growth planning.",
        medium: "You are building well, but there is room to optimize your tax structures and income streams for greater efficiency.",
        high: "Your income and tax strategies are well-aligned with wealth accumulation goals. You are maximizing what you keep."
      }
    },
    {
      id: 'stability',
      title: 'Financial Stability',
      maxPoints: 10,
      questionIds: [5, 8, 10], // Estate, Advisor, Assets
      description: "Asset base and professional guidance.",
      insights: {
        low: "Without a comprehensive estate plan or professional guidance, your hard-earned stability is at risk of fragmentation.",
        medium: "You have the basics in place, but as your wealth grows, the complexity of your stability needs will require more sophisticated structuring.",
        high: "You have built a fortress of stability with strong professional backing and legacy planning."
      }
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      maxPoints: 10,
      questionIds: [2, 4, 7], // Horizon, Stage, Source
      description: "Preparation for post-work life.",
      insights: {
        low: "Relying heavily on standard pension schemes may not sustain your current lifestyle in retirement. Diversification is urgent.",
        medium: "You are on track, but should stress-test your portfolio against inflation and longevity risks.",
        high: "Your multi-pillar approach to retirement funding positions you for a lifestyle of freedom and choice."
      }
    }
  ];

  // Calculate Scores
  let totalPoints = 0;
  const maxTotalPoints = 105; // Sum of category maxPoints

  const categoryScores = categories.map(cat => {
    let rawScore = 0;
    let rawMax = 0;

    cat.questionIds.forEach(qId => {
      rawScore += getScore(qId);
      rawMax += getMaxScore(qId);
    });

    // Normalize to category maxPoints
    const percentage = rawMax > 0 ? rawScore / rawMax : 0;
    const points = Math.round(percentage * cat.maxPoints);
    
    totalPoints += points;
    
    // Determine insight level
    let insightLevel = 'low';
    if (percentage >= 0.7) insightLevel = 'high';
    else if (percentage >= 0.4) insightLevel = 'medium';

    return {
      ...cat,
      points,
      percentage: Math.round(percentage * 100),
      insight: cat.insights[insightLevel]
    };
  });

  // Determine Status based on total points
  const getStatus = (points) => {
    if (points >= 90) return "Excellent Protection";
    if (points >= 70) return "Good Protection";
    if (points >= 50) return "Moderate Protection";
    return "Needs Attention";
  };

  // Recommendations based on lowest scoring category
  const sortedCategories = [...categoryScores].sort((a, b) => a.percentage - b.percentage);
  const focusArea = sortedCategories[0] || categoryScores[0];
  
  // Secondary focus area (second lowest)
  const secondaryFocus = sortedCategories[1] || sortedCategories[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#0B1215] font-montserrat">
            Your Financial Protection Results
          </h1>
          <p className="text-gray-600 text-lg">
            Hi <span className="font-bold text-[#0B1215]">{result.fullName}</span>, here's your personalized assessment
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-[#0B1215] rounded-2xl shadow-xl p-8 text-center text-white relative overflow-hidden">
          {/* Background Pattern (Subtle) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
               style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>
          
          <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4 relative z-10">
            Your Financial Protection Score
          </h2>
          <div className="text-6xl md:text-7xl font-bold text-white mb-2 font-montserrat relative z-10">
            <span className="text-[#D4AF37]">{totalPoints}</span>
            <span className="text-3xl text-gray-400 font-normal">/{maxTotalPoints}</span>
          </div>
          <div className="inline-block px-6 py-2 bg-[#D4AF37] text-[#0B1215] font-bold rounded-full text-lg relative z-10 mt-4">
            {getStatus(totalPoints)}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#0B1215] mb-8 font-montserrat">
            Protection Assessment by Category
          </h3>
          
          <div className="space-y-10">
            {categoryScores.map((cat) => (
              <div key={cat.id} className="relative">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-lg font-bold text-[#0B1215]">{cat.title}</h4>
                  <span className="text-sm font-medium text-gray-500">
                    {cat.points}/{cat.maxPoints} points
                  </span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${cat.percentage < 50 ? 'bg-red-500' : cat.percentage < 80 ? 'bg-yellow-500' : 'bg-[#D4AF37]'}`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium text-[#0B1215] mb-2 block">
                    {cat.percentage}% protected
                  </span>
                </div>
                
                {/* Expert Insight Bubble */}
                <div className="bg-[#FFFDF5] border-l-4 border-[#D4AF37] p-4 rounded-r-lg text-sm text-gray-700 italic">
                   <span className="font-bold text-[#0B1215] not-italic block mb-1">Expert Insight:</span>
                   "{cat.insight}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#0B1215] mb-6 font-montserrat">
            Recommendations Based on Profile
          </h3>
          
          <div className="space-y-6">
            {/* Primary Recommendation */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFFDF5] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                1
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-[#0B1215]">Immediate Priority: {focusArea.title}</h4>
                <p className="text-gray-600 mt-1">
                  Your score in this area ({focusArea.percentage}%) suggests potential vulnerability. {focusArea.insights.low === focusArea.insight ? "This requires urgent attention to prevent wealth erosion." : "Optimization here could yield significant long-term benefits."}
                </p>
              </div>
            </div>

            {/* Secondary Recommendation */}
            {secondaryFocus.id !== focusArea.id && (
                <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFFDF5] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                    2
                </div>
                <div className="ml-4">
                    <h4 className="text-lg font-bold text-[#0B1215]">Secondary Focus: {secondaryFocus.title}</h4>
                    <p className="text-gray-600 mt-1">
                    While stronger, your {secondaryFocus.title.toLowerCase()} strategy ({secondaryFocus.percentage}%) can be further refined to better support your overall financial architecture.
                    </p>
                </div>
                </div>
            )}

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFFDF5] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                {secondaryFocus.id !== focusArea.id ? 3 : 2}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-[#0B1215]">Schedule a Wealth Review</h4>
                <p className="text-gray-600 mt-1">
                  Your score of {totalPoints} indicates you have a {totalPoints > 80 ? "strong foundation" : "solid start"}, but there are gaps. A 30-minute strategy call can help optimize your protection.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
             <button 
               onClick={() => {
                 if (window.Calendly) {
                   window.Calendly.initPopupWidget({
                     url: 'https://calendly.com/novawealth-info/30min'
                   });
                 }
               }}
               className="w-full bg-[#D4AF37] text-[#0B1215] border-2 border-[#0B1215] font-bold py-4 px-6 rounded-lg hover:bg-[#c5a028] transition-colors shadow-lg flex items-center justify-center group"
             >
               <span>Book Your Free Strategy Session</span>
               <svg className="w-5 h-5 ml-2 text-[#0B1215] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </button>
          </div>
        </div>

        <div className="text-center pt-4">
           <Link to="/" className="text-[#0B1215] font-medium hover:text-[#D4AF37] transition-colors">
             Return to Home
           </Link>
        </div>

      </div>
    </div>
  );
};

export default AssessmentResults;

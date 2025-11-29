import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitAssessment } from '../services/assessmentService';

const questions = [
  {
    id: 1,
    question: "What is your primary financial priority right now?",
    options: [
      { text: "Aggressive Growth & Wealth Accumulation", score: 3 },
      { text: "Balanced Growth & Stability", score: 2 },
      { text: "Wealth Preservation & Legacy", score: 1 }
    ]
  },
  {
    id: 2,
    question: "How long do you plan to invest before withdrawing significant funds?",
    options: [
      { text: "Less than 5 years", score: 1 },
      { text: "5 - 10 years", score: 2 },
      { text: "10+ years", score: 3 }
    ]
  },
  {
    id: 3,
    question: "How do you react to market volatility?",
    options: [
      { text: "I sell to prevent further losses", score: 1 },
      { text: "I hold and wait for recovery", score: 2 },
      { text: "I view it as an opportunity to buy more", score: 3 }
    ]
  },
  {
    id: 4,
    question: "Which best describes your current life stage?",
    options: [
      { text: "Starting Career / Building Foundation", score: 1 },
      { text: "Peak Earning Years / Accumulating", score: 2 },
      { text: "Pre-Retirement / Retired", score: 3 }
    ]
  },
  {
    id: 5,
    question: "Do you have a comprehensive estate plan in place?",
    options: [
      { text: "No, I haven't started yet", score: 1 },
      { text: "I have a basic will", score: 2 },
      { text: "Yes, I have a detailed trust/estate plan", score: 3 }
    ]
  },
  {
    id: 6,
    question: "How confident are you that your current tax strategy is fully optimized?",
    options: [
      { text: "Not confident - I likely pay too much", score: 1 },
      { text: "Somewhat confident - I do the basics", score: 2 },
      { text: "Very confident - I use advanced strategies", score: 3 }
    ]
  },
  {
    id: 7,
    question: "What is your primary source of retirement funding?",
    options: [
      { text: "State pension / Social Security only", score: 1 },
      { text: "Employer pension & personal savings", score: 2 },
      { text: "Diversified portfolio (Real Estate, Stocks, Business Income)", score: 3 }
    ]
  },
  {
    id: 8,
    question: "Do you currently work with a financial advisor?",
    options: [
      { text: "No, I manage everything myself", score: 1 },
      { text: "Yes, but I'm not sure they are proactive enough", score: 2 },
      { text: "Yes, and I am very satisfied", score: 3 }
    ]
  },
  {
    id: 9,
    question: "How structured is your approach to insurance and risk management?",
    options: [
      { text: "I have minimal or mandatory coverage only", score: 1 },
      { text: "I have standard life and health coverage", score: 2 },
      { text: "Comprehensive (Life, Critical Illness, Income Protection, Key Person)", score: 3 }
    ]
  },
  {
    id: 10,
    question: "What is the approximate value of your investable assets?",
    options: [
      { text: "Under KSH 5,000,000", score: 1, type: "Starter" },
      { text: "KSH 5,000,000 - KSH 20,000,000", score: 2, type: "Planner" },
      { text: "KSH 20,000,000 - KSH 100,000,000", score: 3, type: "Builder" },
      { text: "Over KSH 100,000,000", score: 4, type: "Wealth Accelerator" }
    ]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionClick = (option) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Calculate score and persona
      let totalScore = 0;
      let persona = "Planner";
      
      Object.values(answers).forEach(ans => {
        totalScore += ans.score;
        if (ans.type) persona = ans.type;
      });

      // Prepare payload
      const payload = {
        ...formData,
        answers,
        score: totalScore,
        persona
      };

      // Call API (Mocking the service call if backend isn't ready, but we'll assume service exists)
      const response = await submitAssessment(payload);
      
      // Redirect to results with data
      navigate('/assessment-results', { state: { result: response || payload } });
      
    } catch (error) {
      console.error("Assessment submission failed", error);
      // Fallback for demo purposes if backend fails
      navigate('/assessment-results', { 
        state: { 
          result: {
            ...formData,
            persona: Object.values(answers).find(a => a.type)?.type || "Planner",
            score: Object.values(answers).reduce((a, b) => a + b.score, 0)
          } 
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-montserrat">
          Wealth Health Assessment
        </h2>
        <p className="mt-4 text-center text-lg text-red-600 font-bold px-4">
           Most professionals lose millions in potential growth by using outdated strategies. Are you one of them?
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Discover your financial persona in 60 seconds.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
            <div 
              className="h-full bg-[#D4AF37] transition-all duration-500 ease-out"
              style={{ width: `${showLeadForm ? 100 : progress}%` }}
            ></div>
          </div>

          {!showLeadForm ? (
            <div className="mt-6 space-y-8">
              <div className="text-center">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <h3 className="text-xl font-medium text-gray-900 mt-2">
                  {currentQuestion.question}
                </h3>
              </div>

              <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left px-6 py-4 border border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#FFFDF5] transition-all duration-200 group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-black">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FFFDF5] border border-[#D4AF37] mb-4">
                  <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-montserrat">Assessment Complete!</h3>
                <p className="text-gray-500 mt-2">
                  Enter your details to unlock your personalized wealth report.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-[#B99A2F] rounded-md shadow-sm placeholder-black/60 focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#D4AF37] text-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-[#B99A2F] rounded-md shadow-sm placeholder-black/60 focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#D4AF37] text-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number (for secure access)
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-[#B99A2F] rounded-md shadow-sm placeholder-black/60 focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#D4AF37] text-black"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#D4AF37] hover:bg-[#B99A2F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Analyzing...' : 'See My Results'}
                  </button>
                </div>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  By clicking "See My Results", you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;

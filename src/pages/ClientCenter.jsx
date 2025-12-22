import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logout, me } from '../services/authService';
import SupportSection from '../components/ClientCenter/SupportSection';
import CallToActionBar from '../components/ClientCenter/CallToActionBar';

const NOVA_GOLD = '#D4AF37';
const CALENDLY_URL = 'https://calendly.com/novawealth-info/30min';

const ClientCenter = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    let mounted = true;
    me()
      .then((data) => {
        if (!mounted || !data || !data.name) return;
        const first = String(data.name).trim().split(' ')[0];
        setUserName(first);
      })
      .catch(() => { });
    return () => { mounted = false; };
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleBookMeeting() {
    if (window.Calendly && window.Calendly.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_self');
    }
  }

  function handleAskAdvisor() {
    navigate('/contact');
  }

  function handleCompleteRiskProfile() {
    navigate('/assessment');
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    // If mobile, close sidebar after clicking (optional, but keep it open for now as requested for app-style)
  }

  function handleProfileImageChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f9] text-black">
      {/* Sidebar */}
      <aside className={`bg-black text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : '-ml-64'} border-r border-white/5 fixed md:static h-full z-50`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-center">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <img src="/images/NOVA.png" alt="Nova Wealth" className="h-[80px] w-auto object-contain" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pt-4">
          <SidebarItem icon="📊" label="Dashboard" onClick={() => scrollToSection('account-overview')} />
          <SidebarItem icon="🛠" label="Wealth Tools" onClick={() => scrollToSection('wealth-tools-heading')} />
          <SidebarItem icon="🎓" label="Learning Hub" onClick={() => scrollToSection('learning-hub-heading')} />
          <SidebarItem icon="🚀" label="Financial Journey" onClick={() => scrollToSection('journey-heading')} />
          <SidebarItem icon="🔒" label="Privacy & Security" onClick={() => scrollToSection('trust-heading')} />
          <div className="mt-8 px-4 py-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">Actions</div>
          <SidebarItem icon="📅" label="Book Session" onClick={handleBookMeeting} />
          <SidebarItem icon="📧" label="Ask Advisor" onClick={handleAskAdvisor} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon="⚙️" label="Settings" onClick={() => setIsProfileOpen(true)} />
          <SidebarItem icon="🌐" label="Go to Website" onClick={() => navigate('/')} />
          <SidebarItem icon="🚪" label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Secure Top Header */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-6 flex-shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl mr-2">☰</button>
            <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
              <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth" className={`h-6 transition-opacity duration-300 ${!isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`} />
            </button>
            <h1 className="font-montserrat text-sm font-bold tracking-tight text-black/40 uppercase hidden sm:block border-l border-black/10 pl-4 ml-2">Secure Client Portal</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-black">{userName || 'Client'}</p>
                <p className="text-[10px] text-[#4a5568] font-bold mt-0.5">Wealth Client</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-black text-[#D4AF37] flex items-center justify-center font-montserrat text-xs font-bold border border-white/10 shadow-sm">
                {profileImage ? <img src={profileImage} className="w-full h-full object-cover rounded-full" /> : (userName ? userName.charAt(0).toUpperCase() : 'N')}
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-white">
          <div className="max-w-6xl mx-auto p-6 md:p-10">
            {/* Dashboard Area - Refined Black Theme */}
            <section id="account-overview" className="mb-12">
              <div className="bg-black border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 text-white">
                <div className="max-w-2xl">
                  <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                    {userName ? `${getGreeting()}, ${userName}` : getGreeting()}
                  </h2>
                  <p className="font-opensans text-sm md:text-base text-white/70 leading-relaxed mb-8">
                    Welcome to your private dashboard. This is your personal space to manage goals, explore interactive tools, and review your financial highlights with Nova Wealth.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                      onClick={handleBookMeeting}
                      className="bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c4a030] transition-all shadow-lg shadow-black/20"
                    >
                      BOOK A STRATEGY MEETING
                    </button>
                    <button
                      onClick={handleAskAdvisor}
                      className="text-white hover:text-[#D4AF37] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group"
                    >
                      Ask an Advisor
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
                <div className="bg-[#111111] border border-white/5 p-7 rounded-xl shadow-xl md:max-w-xs w-full">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3">YOUR JOURNEY</h4>
                  <p className="font-montserrat text-base font-bold mb-3 text-white leading-tight">Start your wealth journey in four calm steps.</p>
                  <p className="text-xs text-white/50 leading-relaxed">Watch a short intro, understand your risk profile, book a strategy session, and receive a tailored plan from Nova Wealth.</p>
                </div>
              </div>
            </section>

            {/* Existing Sections Wrap */}
            <section id="wealth-tools-heading" className="scroll-mt-20 mb-16">
              <div className="mb-8">
                <h3 className="font-montserrat text-xl font-bold mb-2">Wealth Management Tools</h3>
                <p className="font-opensans text-sm text-black/50">Interactive planning tools for your financial journey.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ToolCard
                  title="Investment Growth"
                  icon="📈"
                  description="Compound returns projection."
                  isActive={activeTool === 'growth'}
                  onToggle={() => setActiveTool(activeTool === 'growth' ? null : 'growth')}
                >
                  <InvestmentGrowthCalculator />
                </ToolCard>
                <ToolCard
                  title="Goal Planning"
                  icon="🎯"
                  description="Step-by-step milestone mapping."
                  isActive={activeTool === 'goals'}
                  onToggle={() => setActiveTool(activeTool === 'goals' ? null : 'goals')}
                >
                  <GoalPlanningTool />
                </ToolCard>
                <ToolCard
                  title="Risk Assessment"
                  icon="🧩"
                  description="Identify your appetite for growth."
                  isActive={false}
                  onToggle={() => navigate('/assessment')}
                />
              </div>
            </section>

            <section id="learning-hub-heading" className="scroll-mt-20 mb-16">
              <div className="mb-8">
                <h3 className="font-montserrat text-xl font-bold mb-2">Learning Hub</h3>
                <p className="font-opensans text-sm text-black/50">Curated insights to support informed decision making.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <LearningCard title="Wealth Mgmt 101" category="Foundations" href="/client-center/resources" icon="🏛">Professional management basics.</LearningCard>
                <LearningCard title="Investment Basics" category="Growth" href="/client-center/resources" icon="📚">Core concepts & risk.</LearningCard>
                <LearningCard title="Planning Strategy" category="Planning" href="/client-center/resources" icon="🗺">Life objective milestones.</LearningCard>
                <LearningCard title="Nova Partnership" category="Services" href="/client-center/resources" icon="✨">How we work for you.</LearningCard>
              </div>
            </section>

            <section id="journey-heading" className="scroll-mt-20 mb-16">
              <div className="mb-8">
                <h3 className="font-montserrat text-xl font-bold mb-2">Your Financial Wellness Journey</h3>
                <p className="font-opensans text-sm text-black/50">Path to service activation and tailored strategies.</p>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <li><ProgressStep index={1} label="Watch Intro" status="current" onClick={() => setIsIntroOpen(true)} /></li>
                <li><ProgressStep index={2} label="Risk Profile" status="upcoming" onClick={handleCompleteRiskProfile} /></li>
                <li><ProgressStep index={3} label="Book Session" status="upcoming" onClick={handleBookMeeting} /></li>
                <li><ProgressStep index={4} label="Receive Plan" status="upcoming" /></li>
              </ol>
            </section>

            <section id="trust-heading" className="scroll-mt-20 mb-16">
              <div className="bg-[#f8f5ef] border border-[#efe3cf] rounded-2xl p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-xl mb-4 shadow-xl shadow-[#D4AF37]/20">
                      <span style={{ color: NOVA_GOLD }}>🔒</span>
                    </div>
                    <h3 className="font-montserrat text-xl font-bold mb-2">Trust & Security</h3>
                    <p className="font-opensans text-sm text-black/60 leading-relaxed">
                      Your privacy is paramount. This environment is designed for guidance and support without storing sensitive identifiers.
                    </p>
                  </div>
                  <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TrustItem title="Non-Custodial Data">We do not store your physical documents here.</TrustItem>
                    <TrustItem title="Minimal Collection">No sensitive ID or banking logins required.</TrustItem>
                    <TrustItem title="Private Sessions">All conversations are strictly confidential.</TrustItem>
                    <TrustItem title="Privacy First">Data is strictly for your financial planning.</TrustItem>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <SupportSection />
        </main>
      </div>

      {/* Intro Modal */}
      <AnimatePresence>
        {isIntroOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl"
            >
              <button onClick={() => setIsIntroOpen(false)} className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors">✕</button>
              <iframe
                src="https://www.youtube-nocookie.com/embed/_gRtrZ1Tj0g?autoplay=1&mute=1"
                title="Nova Wealth Intro"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Sidebar/Dropdown */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 h-full bg-white shadow-2xl relative flex flex-col"
            >
              <div className="p-8 border-b border-black/5">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="w-20 h-20 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-gray-50 flex items-center justify-center"
                  >
                    {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <span className="text-2xl font-bold">{userName?.charAt(0) || 'N'}</span>}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  <div>
                    <h3 className="font-montserrat font-bold">{userName || 'Member'}</h3>
                    <p className="text-xs text-black/40 font-medium tracking-tight">Private Access</p>
                  </div>
                </div>
                <p className="text-[10px] text-black/50 font-medium">Click image to update photo</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <h4 className="px-4 text-[10px] uppercase font-bold text-black/30 tracking-widest mt-4">Settings</h4>
                <button className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg">Personal Information</button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg">Security Settings</button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg">Notification Preferences</button>
              </div>

              <div className="p-4 border-t border-black/5">
                <button onClick={handleLogout} className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-black/90 transition-all">Sign Out</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all group border-l-2 border-transparent hover:border-[#D4AF37]"
  >
    <span className="text-base grayscale group-hover:grayscale-0 transition-all">{icon}</span>
    <span className="font-montserrat tracking-tight">{label}</span>
  </button>
);

const ToolCard = ({ title, icon, description, isActive, onToggle, highlight, children }) => {
  return (
    <article
      className={`bg-white rounded-2xl border ${highlight ? 'border-[#D4AF37]' : 'border-black/5'
        } shadow-sm flex flex-col p-5 md:p-6`}
    >
      <div className="flex gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[1.1rem]" aria-hidden="true">
          <span className="text-[1.1rem]" style={{ color: NOVA_GOLD }}>
            {icon}
          </span>
        </div>
        <div>
          <h3 className="font-montserrat text-base font-semibold text-black">{title}</h3>
          <p className="font-opensans text-xs text-black/70 mt-1">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`self-start rounded-full px-4 py-1.5 text-xs font-montserrat tracking-[0.08em] uppercase border ${isActive
          ? 'bg-black text-white border-black'
          : 'bg-[#D4AF37] text-black border-[#D4AF37]'
          }`}
      >
        {isActive ? 'Hide Tool' : 'Launch Tool'}
      </button>
      {isActive && <div className="mt-3 pt-3 border-t border-black/5 text-xs">{children}</div>}
    </article>
  );
};

const InvestmentGrowthCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);

  const rateDecimal = rate / 100;
  const futureValue = amount * Math.pow(1 + rateDecimal, years || 0);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-3 gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-opensans text-[0.7rem] text-black/80">Initial amount</span>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-opensans text-[0.7rem] text-black/80">Years</span>
            <input
              type="number"
              min={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-opensans text-[0.7rem] text-black/80">Annual return %</span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
            />
          </label>
        </div>
      </div>
      <div className="mt-1 rounded-md bg-[#f9f7f3] px-3 py-2">
        <div className="font-opensans text-[0.7rem] text-black/70">Estimated future value</div>
        <div className="font-montserrat text-sm font-semibold">
          {futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
};

const GoalPlanningTool = () => {
  const [goal, setGoal] = useState('Retirement');
  const [targetAmount, setTargetAmount] = useState(2000000);
  const [targetYears, setTargetYears] = useState(15);

  const monthly = targetYears > 0 ? targetAmount / (targetYears * 12) : 0;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          <span className="font-opensans text-[0.7rem] text-black/80">Goal</span>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Example: Education, property, legacy"
            className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-opensans text-[0.7rem] text-black/80">Timeframe (years)</span>
          <input
            type="number"
            min={1}
            value={targetYears}
            onChange={(e) => setTargetYears(Number(e.target.value) || 0)}
            className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 max-w-xs">
        <span className="font-opensans text-[0.7rem] text-black/80">Target amount</span>
        <input
          type="number"
          min={0}
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
          className="border border-black/10 rounded-md px-2 py-1 text-[0.75rem] bg-white text-black"
        />
      </label>
      <div className="mt-1 rounded-md bg-[#f9f7f3] px-3 py-2">
        <div className="font-opensans text-[0.7rem] text-black/70">
          Approximate monthly amount to reach your goal
        </div>
        <div className="font-montserrat text-sm font-semibold">
          {monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <p className="font-opensans text-[0.7rem] text-black/70 mt-1">
          This is a simple illustration. A Nova Wealth advisor can refine this using detailed financial planning
          assumptions.
        </p>
      </div>
    </div>
  );
};

const RiskProfileQuiz = () => {
  const [answers, setAnswers] = useState({
    horizon: 'medium',
    comfort: 'balanced',
    reaction: 'stay',
  });

  const score =
    (answers.horizon === 'short' ? 1 : answers.horizon === 'medium' ? 2 : 3) +
    (answers.comfort === 'cautious' ? 1 : answers.comfort === 'balanced' ? 2 : 3) +
    (answers.reaction === 'sell' ? 1 : answers.reaction === 'review' ? 2 : 3);

  let profile = 'Balanced';
  if (score <= 4) profile = 'Conservative';
  else if (score >= 8) profile = 'Growth‑oriented';

  return (
    <div className="space-y-3">
      <QuestionGroup
        label="How long before you expect to use most of this money?"
        name="horizon"
        value={answers.horizon}
        onChange={(value) => setAnswers((prev) => ({ ...prev, horizon: value }))}
        options={[
          { value: 'short', label: '0–3 years' },
          { value: 'medium', label: '3–7 years' },
          { value: 'long', label: '7+ years' },
        ]}
      />
      <QuestionGroup
        label="How do you feel about investment ups and downs?"
        name="comfort"
        value={answers.comfort}
        onChange={(value) => setAnswers((prev) => ({ ...prev, comfort: value }))}
        options={[
          { value: 'cautious', label: 'I prefer stability over growth' },
          { value: 'balanced', label: 'Comfortable with some fluctuations' },
          { value: 'adventurous', label: 'Can accept higher swings for growth' },
        ]}
      />
      <QuestionGroup
        label="If markets fall by 15% in a few months, you are most likely to:"
        name="reaction"
        value={answers.reaction}
        onChange={(value) => setAnswers((prev) => ({ ...prev, reaction: value }))}
        options={[
          { value: 'sell', label: 'Sell quickly to avoid further loss' },
          { value: 'review', label: 'Review and adjust with an advisor' },
          { value: 'stay', label: 'Stay invested and stay the course' },
        ]}
      />
      <div className="mt-1 rounded-md bg-[#f9f7f3] px-3 py-2">
        <div className="font-opensans text-[0.7rem] text-black/70">Indicative risk profile</div>
        <div className="font-montserrat text-sm font-semibold">{profile}</div>
        <p className="font-opensans text-[0.7rem] text-black/70 mt-1">
          This quick quiz is for guidance only. Your official risk profile is completed together with a Nova Wealth
          advisor.
        </p>
      </div>
    </div>
  );
};

const QuestionGroup = ({ label, name, value, options, onChange }) => {
  return (
    <fieldset className="border-0 p-0 m-0 space-y-1">
      <legend className="font-opensans text-[0.75rem] font-medium text-black/90">{label}</legend>
      <div className="space-y-1.5 mt-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-[0.75rem] font-opensans text-black/80 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-3 w-3"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

const LearningCard = ({ title, category, href, icon, children }) => {
  return (
    <article className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center" aria-hidden="true">
          <span className="text-[1.1rem]" style={{ color: NOVA_GOLD }}>
            {icon}
          </span>
        </div>
        <div>
          <div className="font-opensans text-[0.7rem] uppercase tracking-[0.16em] text-black/60">
            {category}
          </div>
          <h3 className="font-montserrat text-sm font-semibold text-black mt-0.5">{title}</h3>
        </div>
      </div>
      <p className="font-opensans text-xs text-black/70 flex-1">{children}</p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-[0.75rem] font-montserrat text-black hover:underline"
      >
        <span>Open guide</span>
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
};

const ProgressStep = ({ index, label, status, onClick }) => {
  const isCurrent = status === 'current';
  const isClickable = typeof onClick === 'function';

  const handleKeyDown = (event) => {
    if (!isClickable) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-full px-3 py-2 bg-[#f6f6f6] text-black ${isClickable ? 'cursor-pointer hover:bg-black hover:text-white hover:shadow-md transition-colors group' : ''
        }`}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-montserrat font-semibold bg-white text-black ${isClickable ? 'group-hover:bg-[#D4AF37] group-hover:text-black' : ''
          }`}
        aria-hidden="true"
      >
        {index}
      </div>
      <div>
        <div className="font-montserrat text-[0.78rem] font-medium">{label}</div>
        <div className="font-opensans text-[0.7rem] opacity-75">{isCurrent ? 'Start here' : 'Next step'}</div>
      </div>
    </div>
  );
};

const TrustItem = ({ title, children }) => {
  return (
    <div>
      <dt className="font-montserrat text-[0.85rem] font-semibold text-black mb-1">{title}</dt>
      <dd className="font-opensans text-[0.75rem] text-black/75 m-0">{children}</dd>
    </div>
  );
};

export default ClientCenter;

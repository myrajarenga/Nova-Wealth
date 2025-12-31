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
  const [activeSettingsSection, setActiveSettingsSection] = useState(null); // 'personal', 'security', 'notifications'
  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    occupation: '',
    investmentGoals: '',
    emailNotifications: true,
    smsNotifications: false,
    marketUpdates: true,
    educationalContent: true,
    twoFactorEnabled: false,
  });

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
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`bg-black text-white w-64 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out border-r border-white/5 fixed lg:static h-full z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-center">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <img src="/images/NOVA.png" alt="Nova Wealth" className="h-[60px] sm:h-[80px] w-auto object-contain" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pt-4">
          <SidebarItem icon="📊" label="Dashboard" onClick={() => { scrollToSection('account-overview'); setIsSidebarOpen(false); }} />
          <SidebarItem icon="🛠" label="Wealth Tools" onClick={() => { scrollToSection('wealth-tools-heading'); setIsSidebarOpen(false); }} />
          <SidebarItem icon="🎓" label="Learning Hub" onClick={() => { scrollToSection('learning-hub-heading'); setIsSidebarOpen(false); }} />
          <SidebarItem icon="🚀" label="Financial Journey" onClick={() => { scrollToSection('journey-heading'); setIsSidebarOpen(false); }} />
          <SidebarItem icon="🔒" label="Privacy & Security" onClick={() => { scrollToSection('trust-heading'); setIsSidebarOpen(false); }} />
          <div className="mt-8 px-4 py-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">Actions</div>
          <SidebarItem icon="📅" label="Book Session" onClick={() => { handleBookMeeting(); setIsSidebarOpen(false); }} />
          <SidebarItem icon="📧" label="Ask Advisor" onClick={() => { handleAskAdvisor(); setIsSidebarOpen(false); }} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon="⚙️" label="Settings" onClick={() => { setIsProfileOpen(true); setIsSidebarOpen(false); }} />
          <SidebarItem icon="🌐" label="Go to Website" onClick={() => navigate('/')} />
          <SidebarItem icon="🚪" label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative lg:ml-0">
        {/* Secure Top Header */}
        <header className="h-14 sm:h-16 bg-black border-b border-white/5 flex items-center justify-between px-3 sm:px-6 flex-shrink-0 z-40">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-xl sm:text-2xl p-2 text-white hover:text-[#D4AF37] transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity lg:hidden">
              <img src="/images/NOVA.png" alt="Nova Wealth" className="h-8 sm:h-10" />
            </button>
            <h1 className="font-montserrat text-xs sm:text-sm font-bold tracking-tight text-white/60 uppercase hidden md:block border-l border-white/10 pl-3 sm:pl-4 ml-2">Secure Client Portal</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 hover:bg-white/10 px-1.5 sm:px-2 py-1 rounded-lg transition-colors min-h-[44px]"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-white">{userName || 'Client'}</p>
                <p className="text-[10px] text-white/60 font-bold mt-0.5">Wealth Client</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-montserrat text-xs sm:text-sm font-bold border border-white/10 shadow-sm">
                {profileImage ? <img src={profileImage} className="w-full h-full object-cover rounded-full" alt="Profile" /> : (userName ? userName.charAt(0).toUpperCase() : 'N')}
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:p-10">
            {/* Dashboard Area - Refined Black Theme */}
            <section id="account-overview" className="mb-8 sm:mb-12">
              <div className="bg-black border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 text-white">
                <div className="max-w-2xl">
                  <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    {userName ? `${getGreeting()}, ${userName}` : getGreeting()}
                  </h2>
                  <p className="font-opensans text-sm sm:text-base text-white/70 leading-relaxed mb-6 sm:mb-8">
                    Welcome to your private dashboard. This is your personal space to manage goals, explore interactive tools, and review your financial highlights with Nova Wealth.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
                    <button
                      onClick={handleBookMeeting}
                      className="bg-[#D4AF37] text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c4a030] transition-all shadow-lg shadow-black/20 w-full sm:w-auto min-h-[44px] touch-manipulation"
                    >
                      BOOK A STRATEGY MEETING
                    </button>
                    <button
                      onClick={handleAskAdvisor}
                      className="text-white hover:text-[#D4AF37] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group min-h-[44px] touch-manipulation"
                    >
                      Ask an Advisor
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
                <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 lg:p-7 rounded-xl shadow-xl lg:max-w-xs w-full">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3">YOUR JOURNEY</h4>
                  <p className="font-montserrat text-sm sm:text-base font-bold mb-3 text-white leading-tight">Start your wealth journey in four calm steps.</p>
                  <p className="text-xs text-white/50 leading-relaxed">Watch a short intro, understand your risk profile, book a strategy session, and receive a tailored plan from Nova Wealth.</p>
                </div>
              </div>
            </section>

            {/* Existing Sections Wrap */}
            <section id="wealth-tools-heading" className="scroll-mt-20 mb-10 sm:mb-12 lg:mb-16">
              <div className="mb-6 sm:mb-8">
                <h3 className="font-montserrat text-lg sm:text-xl font-bold mb-2">Wealth Management Tools</h3>
                <p className="font-opensans text-sm text-black/50">Interactive planning tools for your financial journey.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

            <section id="learning-hub-heading" className="scroll-mt-20 mb-10 sm:mb-12 lg:mb-16">
              <div className="mb-6 sm:mb-8">
                <h3 className="font-montserrat text-lg sm:text-xl font-bold mb-2">Learning Hub</h3>
                <p className="font-opensans text-sm text-black/50">Curated insights to support informed decision making.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <LearningCard title="Wealth Mgmt 101" category="Foundations" href="/client-center/resources" icon="🏛">Professional management basics.</LearningCard>
                <LearningCard title="Investment Basics" category="Growth" href="/client-center/resources" icon="📚">Core concepts & risk.</LearningCard>
                <LearningCard title="Planning Strategy" category="Planning" href="/client-center/resources" icon="🗺">Life objective milestones.</LearningCard>
                <LearningCard title="Nova Partnership" category="Services" href="/client-center/resources" icon="✨">How we work for you.</LearningCard>
              </div>
            </section>

            <section id="journey-heading" className="scroll-mt-20 mb-10 sm:mb-12 lg:mb-16">
              <div className="mb-6 sm:mb-8">
                <h3 className="font-montserrat text-lg sm:text-xl font-bold mb-2">Your Financial Wellness Journey</h3>
                <p className="font-opensans text-sm text-black/50">Path to service activation and tailored strategies.</p>
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <li><ProgressStep index={1} label="Watch Intro" status="current" onClick={() => setIsIntroOpen(true)} /></li>
                <li><ProgressStep index={2} label="Risk Profile" status="upcoming" onClick={handleCompleteRiskProfile} /></li>
                <li><ProgressStep index={3} label="Book Session" status="upcoming" onClick={handleBookMeeting} /></li>
                <li><ProgressStep index={4} label="Receive Plan" status="upcoming" /></li>
              </ol>
            </section>

            <section id="trust-heading" className="scroll-mt-20 mb-10 sm:mb-12 lg:mb-16">
              <div className="bg-[#f8f5ef] border border-[#efe3cf] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  <div className="lg:w-1/3">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-xl mb-4 shadow-xl shadow-[#D4AF37]/20">
                      <span style={{ color: NOVA_GOLD }}>🔒</span>
                    </div>
                    <h3 className="font-montserrat text-lg sm:text-xl font-bold mb-2">Trust & Security</h3>
                    <p className="font-opensans text-sm text-black/60 leading-relaxed">
                      Your privacy is paramount. This environment is designed for guidance and support without storing sensitive identifiers.
                    </p>
                  </div>
                  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-lg sm:rounded-2xl overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setIsIntroOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 sm:p-2.5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Close video"
              >
                ✕
              </button>
              <iframe
                src="https://www.youtube.com/embed/zKGRYLKMzVQ?autoplay=1&mute=1"
                title="Nova Wealth Intro"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/70 text-white p-6 rounded-lg text-center max-w-md pointer-events-auto">
                  <p className="text-sm mb-4">If the video doesn't appear, it may have embedding restrictions.</p>
                  <a
                    href="https://www.youtube.com/watch?v=zKGRYLKMzVQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#c4a030] transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
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
              className="w-full sm:w-96 max-w-full h-full bg-white shadow-2xl relative flex flex-col"
            >
              <div className="p-5 sm:p-8 border-b border-black/5">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-gray-50 flex items-center justify-center touch-manipulation"
                    >
                      {profileImage ? <img src={profileImage} className="w-full h-full object-cover" alt="Profile" /> : <span className="text-xl sm:text-2xl font-bold">{userName?.charAt(0) || 'N'}</span>}
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                    <div>
                      <h3 className="font-montserrat font-bold text-base sm:text-lg">{userName || 'Member'}</h3>
                      <p className="text-xs text-black/40 font-medium tracking-tight">Private Access</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation text-xl"
                    aria-label="Close profile"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[10px] text-black/50 font-medium">Click image to update photo</p>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                <h4 className="px-3 sm:px-4 text-[10px] uppercase font-bold text-black/30 tracking-widest mt-4">Settings</h4>

                {/* Personal Information Section */}
                <div className="border border-black/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveSettingsSection(activeSettingsSection === 'personal' ? null : 'personal')}
                    className="w-full text-left px-3 sm:px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between min-h-[44px] touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      👤 <span>Personal Information</span>
                    </span>
                    <span className="text-xs text-black/40">{activeSettingsSection === 'personal' ? '▼' : '▶'}</span>
                  </button>
                  {activeSettingsSection === 'personal' && (
                    <div className="px-3 sm:px-4 pb-4 space-y-3 bg-gray-50/50">
                      {/* Profile Completeness */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-black/60">Profile Completeness</span>
                          <span className="text-xs font-bold text-[#D4AF37]">
                            {Math.round(((userName ? 1 : 0) + (profileData.email ? 1 : 0) + (profileData.phone ? 1 : 0) + (profileData.occupation ? 1 : 0) + (profileData.investmentGoals ? 1 : 0)) / 5 * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((userName ? 1 : 0) + (profileData.email ? 1 : 0) + (profileData.phone ? 1 : 0) + (profileData.occupation ? 1 : 0) + (profileData.investmentGoals ? 1 : 0)) / 5 * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-black/50 mt-2">Complete your profile to get personalized recommendations</p>
                      </div>

                      {/* Editable Fields */}
                      <div className="space-y-2">
                        <label className="block">
                          <span className="text-xs font-medium text-black/70 mb-1 block">Full Name</span>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-white min-h-[44px]"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-medium text-black/70 mb-1 block">Email Address</span>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            placeholder="your.email@example.com"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-white min-h-[44px]"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-medium text-black/70 mb-1 block">Phone Number</span>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-white min-h-[44px]"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-medium text-black/70 mb-1 block">Occupation</span>
                          <input
                            type="text"
                            value={profileData.occupation}
                            onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                            placeholder="e.g., Business Owner, Professional"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-white min-h-[44px]"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-medium text-black/70 mb-1 block">Investment Goals</span>
                          <textarea
                            value={profileData.investmentGoals}
                            onChange={(e) => setProfileData({ ...profileData, investmentGoals: e.target.value })}
                            placeholder="Describe your financial goals..."
                            rows="3"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-white resize-none"
                          />
                        </label>
                      </div>
                      <button className="w-full bg-[#D4AF37] text-black font-bold py-2.5 rounded-lg hover:bg-[#c4a030] transition-all text-sm min-h-[44px]">
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {/* Security Settings Section */}
                <div className="border border-black/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveSettingsSection(activeSettingsSection === 'security' ? null : 'security')}
                    className="w-full text-left px-3 sm:px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between min-h-[44px] touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      🔒 <span>Security Settings</span>
                    </span>
                    <span className="text-xs text-black/40">{activeSettingsSection === 'security' ? '▼' : '▶'}</span>
                  </button>
                  {activeSettingsSection === 'security' && (
                    <div className="px-3 sm:px-4 pb-4 space-y-3 bg-gray-50/50">
                      {/* Security Score */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-black/60">Security Score</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-green-600">Strong</span>
                            <span className="text-xs">🛡️</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-black/50">Your account is well protected</p>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-black">Two-Factor Authentication</h5>
                            <p className="text-xs text-black/60 mt-0.5">Add an extra layer of security</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={profileData.twoFactorEnabled}
                              onChange={(e) => setProfileData({ ...profileData, twoFactorEnabled: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                          </label>
                        </div>
                      </div>

                      {/* Change Password */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <h5 className="text-sm font-semibold text-black mb-2">Change Password</h5>
                        <div className="space-y-2">
                          <input
                            type="password"
                            placeholder="Current password"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-gray-50 min-h-[44px]"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg bg-gray-50 min-h-[44px]"
                          />
                          <button className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-black/90 transition-all text-sm min-h-[44px]">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Login Activity */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <h5 className="text-sm font-semibold text-black mb-2">Recent Activity</h5>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-black/70">Windows PC - Chrome</span>
                            <span className="text-black/40">Now</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-black/70">iPhone - Safari</span>
                            <span className="text-black/40">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notification Preferences Section */}
                <div className="border border-black/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveSettingsSection(activeSettingsSection === 'notifications' ? null : 'notifications')}
                    className="w-full text-left px-3 sm:px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between min-h-[44px] touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      🔔 <span>Notification Preferences</span>
                    </span>
                    <span className="text-xs text-black/40">{activeSettingsSection === 'notifications' ? '▼' : '▶'}</span>
                  </button>
                  {activeSettingsSection === 'notifications' && (
                    <div className="px-3 sm:px-4 pb-4 space-y-3 bg-gray-50/50">
                      {/* Communication Channels */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <h5 className="text-sm font-semibold text-black mb-3">Communication Channels</h5>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">Email Notifications</p>
                              <p className="text-xs text-black/60">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={profileData.emailNotifications}
                                onChange={(e) => setProfileData({ ...profileData, emailNotifications: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">SMS Notifications</p>
                              <p className="text-xs text-black/60">Text message alerts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={profileData.smsNotifications}
                                onChange={(e) => setProfileData({ ...profileData, smsNotifications: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Content Preferences */}
                      <div className="bg-white rounded-lg p-3 border border-black/5">
                        <h5 className="text-sm font-semibold text-black mb-3">Content Preferences</h5>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">Market Updates</p>
                              <p className="text-xs text-black/60">Weekly market insights</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={profileData.marketUpdates}
                                onChange={(e) => setProfileData({ ...profileData, marketUpdates: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">Educational Content</p>
                              <p className="text-xs text-black/60">Financial tips & guides</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={profileData.educationalContent}
                                onChange={(e) => setProfileData({ ...profileData, educationalContent: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">Meeting Reminders</p>
                              <p className="text-xs text-black/60">Upcoming session alerts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Newsletter Subscription */}
                      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-lg p-3 border border-[#D4AF37]/20">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">✨</span>
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-black">Nova Wealth Insights</h5>
                            <p className="text-xs text-black/70 mt-1">Subscribe to our monthly newsletter for exclusive wealth management tips</p>
                            <button className="mt-2 text-xs font-bold text-[#D4AF37] hover:text-[#c4a030] transition-colors">
                              Subscribe Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 sm:p-4 border-t border-black/5">
                <button onClick={handleLogout} className="w-full bg-black text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-black/90 transition-all min-h-[44px] touch-manipulation">Sign Out</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div >
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all group border-l-2 border-transparent hover:border-[#D4AF37] min-h-[44px] touch-manipulation"
  >
    <span className="text-base grayscale group-hover:grayscale-0 transition-all">{icon}</span>
    <span className="font-montserrat tracking-tight">{label}</span>
  </button>
);

const ToolCard = ({ title, icon, description, isActive, onToggle, highlight, children }) => {
  return (
    <article
      className={`bg-white rounded-xl sm:rounded-2xl border ${highlight ? 'border-[#D4AF37]' : 'border-black/5'
        } shadow-sm flex flex-col p-4 sm:p-5 lg:p-6`}
    >
      <div className="flex gap-3 mb-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-base sm:text-[1.1rem]" style={{ color: NOVA_GOLD }}>
            {icon}
          </span>
        </div>
        <div>
          <h3 className="font-montserrat text-sm sm:text-base font-semibold text-black">{title}</h3>
          <p className="font-opensans text-xs text-black/70 mt-1">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`self-start rounded-full px-4 sm:px-5 py-2 text-xs font-montserrat tracking-[0.08em] uppercase border ${isActive
          ? 'bg-black text-white border-black'
          : 'bg-[#D4AF37] text-black border-[#D4AF37]'
          } min-h-[44px] touch-manipulation`}
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
              className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-opensans text-[0.7rem] text-black/80">Years</span>
            <input
              type="number"
              min={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
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
              className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
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
            className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-opensans text-[0.7rem] text-black/80">Timeframe (years)</span>
          <input
            type="number"
            min={1}
            value={targetYears}
            onChange={(e) => setTargetYears(Number(e.target.value) || 0)}
            className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
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
          className="border border-black/10 rounded-md px-2 py-1.5 text-[0.75rem] bg-white text-black min-h-[44px]"
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
            className="flex items-center gap-2 text-[0.75rem] font-opensans text-black/80 cursor-pointer min-h-[44px] py-1"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4"
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
    <article className="bg-white rounded-xl sm:rounded-2xl border border-black/5 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-base sm:text-[1.1rem]" style={{ color: NOVA_GOLD }}>
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
        className="inline-flex items-center gap-1 text-[0.75rem] font-montserrat text-black hover:underline min-h-[44px] py-2 touch-manipulation"
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
      className={`flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-3 bg-[#f6f6f6] text-black ${isClickable ? 'cursor-pointer hover:bg-black hover:text-white hover:shadow-md transition-colors group' : ''
        } min-h-[56px] touch-manipulation`}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-[0.75rem] font-montserrat font-semibold bg-white text-black flex-shrink-0 ${isClickable ? 'group-hover:bg-[#D4AF37] group-hover:text-black' : ''
          }`}
        aria-hidden="true"
      >
        {index}
      </div>
      <div className="flex-1">
        <div className="font-montserrat text-xs sm:text-[0.78rem] font-medium">{label}</div>
        <div className="font-opensans text-[0.65rem] sm:text-[0.7rem] opacity-75">{isCurrent ? 'Start here' : 'Next step'}</div>
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

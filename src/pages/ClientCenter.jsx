import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, me } from '../services/authService';
import SupportSection from '../components/ClientCenter/SupportSection';
import CallToActionBar from '../components/ClientCenter/CallToActionBar';

const NOVA_GOLD = '#D4AF37';
const CALENDLY_URL = 'https://calendly.com/novawealth-info/30min';

const ClientCenter = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    me()
      .then((data) => {
        if (!mounted || !data || !data.name) return;
        const first = String(data.name).trim().split(' ')[0];
        setUserName(first);
      })
      .catch(() => {
      });
    return () => {
      mounted = false;
    };
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleBookMeeting() {
    if (window.Calendly && window.Calendly.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }

  function handleAskAdvisor() {
    navigate('/contact');
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset;
    const offset = 90;
    window.scrollTo({ top: y - offset, behavior: 'smooth' });
  }

  return (
    <main className="bg-white text-black">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="sr-only">
          Nova Wealth Client Dashboard u0014 Wealth Management Tools, Financial Planning, Investment Guidance
        </h1>
        <div className="flex justify-start mb-4">
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#efe3cf] bg-[#f8f5ef] px-3 py-1.5 text-xs font-opensans shadow-sm hover:bg-black hover:text-white hover:border-black hover:text-white transition-colors"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[0.7rem] font-montserrat text-white">
              {userName ? userName.charAt(0).toUpperCase() : 'N'}
            </span>
            <span className="hidden sm:flex flex-col text-left">
              <span className="text-[0.6rem] uppercase tracking-[0.14em] text-black/60">Profile</span>
              <span className="text-[0.8rem] font-montserrat">Wealth client</span>
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <section id="account-overview" className="mb-10 md:mb-12">
              <div className="bg-black text-white rounded-3xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="font-montserrat text-3xl md:text-4xl font-semibold mb-3">
                    {userName ? `Welcome ${userName} to Your Nova Wealth Dashboard` : 'Welcome to Your Nova Wealth Dashboard'}
                  </h2>
                  <p className="font-opensans text-sm md:text-base text-white/80 mb-5">
                    A calm, secure space to explore your wealth, set clear financial goals, and connect with your
                    dedicated advisor. Simple tools, private conversations, and guidance designed around you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleBookMeeting}
                      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-montserrat font-semibold tracking-[0.08em] uppercase bg-[#D4AF37] text-black shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
                    >
                      Book a Strategy Meeting
                    </button>
                    <button
                      type="button"
                      onClick={handleAskAdvisor}
                      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-montserrat border border-[#D4AF37] text-white bg-transparent hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      Ask an Advisor
                    </button>
                  </div>
                </div>
                <div className="md:max-w-xs w-full">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                    <p className="text-[0.7rem] tracking-[0.16em] uppercase text-white/60 mb-2">Your journey</p>
                    <p className="font-montserrat text-lg font-semibold mb-2">
                      Start your wealth journey in four calm steps.
                    </p>
                    <p className="font-opensans text-[0.8rem] text-white/75">
                      Watch a short intro, understand your risk profile, book a strategy session, and receive a
                      tailored plan from Nova Wealth.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="wealth-tools-heading" className="mb-10 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                <div>
                  <h2 id="wealth-tools-heading" className="font-montserrat text-2xl md:text-3xl font-semibold text-black">
                    Wealth Management Tools
                  </h2>
                  <p className="font-opensans text-sm text-black/70 max-w-xl mt-1">
                    Explore simple, interactive tools for investment guidance and financial planning. These
                    illustrations are a starting point to support your conversations with an advisor.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <ToolCard
                  title="Investment Growth Calculator"
                  icon="📈"
                  description="Estimate how your investments could grow over time with compound returns."
                  isActive={activeTool === 'growth'}
                  onToggle={() => setActiveTool(activeTool === 'growth' ? null : 'growth')}
                  highlight
                >
                  <InvestmentGrowthCalculator />
                </ToolCard>

                <ToolCard
                  title="Goal Planning Tool"
                  icon="🎯"
                  description="Map out a clear, step-by-step path towards your key financial goals."
                  isActive={activeTool === 'goals'}
                  onToggle={() => setActiveTool(activeTool === 'goals' ? null : 'goals')}
                >
                  <GoalPlanningTool />
                </ToolCard>

                <ToolCard
                  title="Risk Profile Quick Quiz"
                  icon="🧩"
                  description="Discover your comfort level with investment risk in a few quick questions."
                  isActive={activeTool === 'risk'}
                  onToggle={() => setActiveTool(activeTool === 'risk' ? null : 'risk')}
                >
                  <RiskProfileQuiz />
                </ToolCard>
              </div>
            </section>

            <section aria-labelledby="learning-hub-heading" className="mb-10 md:mb-12">
              <h2
                id="learning-hub-heading"
                className="font-montserrat text-2xl md:text-3xl font-semibold text-black mb-2"
              >
                Learning Hub: Investment Guidance & Financial Planning
              </h2>
              <p className="font-opensans text-sm text-black/70 max-w-2xl mb-5">
                Short, beginner-friendly guides to help you understand wealth management, investments, and how Nova
                Wealth works alongside you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <LearningCard
                  title="Understanding Wealth Management"
                  category="Wealth Management"
                  href="/client-center/resources"
                  icon="🏛"
                >
                  Learn how professional wealth management can organise, protect, and grow your assets over time.
                </LearningCard>

                <LearningCard
                  title="Investment Basics for Beginners"
                  category="Investment Guidance"
                  href="/client-center/resources"
                  icon="📚"
                >
                  Discover the core concepts of investing, risk, and diversification in clear, simple language.
                </LearningCard>

                <LearningCard
                  title="How to Plan for Long-Term Goals"
                  category="Financial Planning"
                  href="/client-center/resources"
                  icon="🗺"
                >
                  Turn big life objectives into practical, achievable financial milestones.
                </LearningCard>

                <LearningCard
                  title="How Nova Wealth Works"
                  category="Nova Wealth Services"
                  href="/client-center/resources"
                  icon="✨"
                >
                  See how Nova Wealth partners with you from first conversation to personalised wealth strategy.
                </LearningCard>
              </div>
            </section>

            <section aria-labelledby="journey-heading" className="mb-10 md:mb-12">
              <h2 id="journey-heading" className="font-montserrat text-2xl md:text-3xl font-semibold text-black mb-2">
                Your Financial Wellness Journey
              </h2>
              <p className="font-opensans text-sm text-black/70 max-w-2xl mb-5">
                Follow these simple steps to move from first insight to a clear, tailored wealth plan.
              </p>

              <ol
                aria-label="Financial wellness progress"
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <li>
                  <ProgressStep index={1} label="Watch Intro" status="current" />
                </li>
                <li>
                  <ProgressStep index={2} label="Complete Risk Profile" status="upcoming" />
                </li>
                <li>
                  <ProgressStep index={3} label="Book Session" status="upcoming" />
                </li>
                <li>
                  <ProgressStep index={4} label="Receive Plan" status="upcoming" />
                </li>
              </ol>
            </section>

            <section aria-labelledby="trust-heading" className="mb-10 md:mb-12">
              <div className="rounded-2xl bg-[#f8f5ef] border border-[#efe3cf] p-6 md:p-7 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0 flex items-start justify-start">
                  <div className="w-10 h-10 rounded-full bg-black text-[1.4rem] flex items-center justify-center shadow-[0_10px_22px_rgba(0,0,0,0.3)]">
                    <span role="img" aria-hidden="true" className="text-[1.3rem]" style={{ color: NOVA_GOLD }}>
                      🔒
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 id="trust-heading" className="font-montserrat text-2xl md:text-3xl font-semibold text-black mb-2">
                    Trust, Privacy and Security
                  </h2>
                  <p className="font-opensans text-sm text-black/75 max-w-2xl mb-4">
                    Your privacy and peace of mind sit at the centre of Nova Wealth&apos;s client experience. This
                    dashboard is intentionally light, secure, and free from sensitive data.
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TrustItem title="No document storage">
                      Nova Wealth does not store client documents inside this dashboard.
                    </TrustItem>
                    <TrustItem title="No sensitive data collected">
                      We avoid asking for identity numbers, passwords, or banking logins here.
                    </TrustItem>
                    <TrustItem title="Private advisory sessions">
                      Every strategy session is confidential and conducted in a secure, professional environment.
                    </TrustItem>
                    <TrustItem title="Data privacy first">
                      Your personal information is handled carefully and only used to support your agreed financial
                      plan.
                    </TrustItem>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <SupportSection />
      <CallToActionBar />

      {isProfileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-80 max-w-full h-full bg-[#f8f5ef] border-r border-[#efe3cf] text-black p-5 shadow-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-montserrat">
                {userName ? userName.charAt(0).toUpperCase() : 'N'}
              </div>
              <div>
                <p className="text-xs font-opensans tracking-[0.16em] uppercase text-black/60">Profile</p>
                <p className="text-sm font-montserrat font-semibold">Your Nova Wealth Profile</p>
                <p className="text-[0.7rem] font-opensans text-black/70">Wealth management client</p>
              </div>
            </div>

            <div className="border-t border-black/10 pt-4 mt-2 space-y-1 text-sm font-opensans">
              <button
                type="button"
                onClick={() => scrollToSection('account-overview')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5"
              >
                Account overview
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('wealth-tools-heading')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5"
              >
                Wealth management tools
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('journey-heading')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5"
              >
                Financial wellness journey
              </button>
            </div>

            <div className="border-t border-black/10 pt-4 mt-4 space-y-1 text-sm font-opensans">
              <button
                type="button"
                onClick={() => scrollToSection('learning-hub-heading')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5"
              >
                Learning hub & insights
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('trust-heading')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5"
              >
                Trust, privacy & security
              </button>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full rounded-full px-4 py-2 text-xs font-montserrat border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              Logout
            </button>
          </div>

          <button
            type="button"
            className="flex-1 bg-black/40"
            aria-label="Close profile menu"
            onClick={() => setIsProfileOpen(false)}
          />
        </div>
      )}
    </main>
  );
};

const ToolCard = ({ title, icon, description, isActive, onToggle, highlight, children }) => {
  return (
    <article
      className={`bg-white rounded-2xl border ${
        highlight ? 'border-[#D4AF37]' : 'border-black/5'
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
        className={`self-start rounded-full px-4 py-1.5 text-xs font-montserrat tracking-[0.08em] uppercase border ${
          isActive
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

const ProgressStep = ({ index, label, status }) => {
  const isCurrent = status === 'current';

  return (
    <div
      className={`flex items-center gap-3 rounded-full px-3 py-2 ${
        isCurrent ? 'bg-black text-white' : 'bg-[#f6f6f6] text-black'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-montserrat font-semibold ${
          isCurrent ? 'bg-[#D4AF37] text-black' : 'bg-white text-black'
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

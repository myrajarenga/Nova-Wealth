import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const sequence = [
    { type: 'video', src: '/videos/wrong-wealth-advise.mp4', duration: 8000, variant: 'first' },
    { type: 'video', src: '/videos/hero-sec-video1.mp4', duration: 13000, variant: 'second' },
    { type: 'image', src: '/images/about us page background image.png', duration: 9000, variant: 'third' }
  ]
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
    const current = sequence[index]
    let t1
    const t2 = setTimeout(() => setIndex((i) => (i + 1) % sequence.length), current.duration)
    if (current.variant === 'first') t1 = setTimeout(() => setStep(1), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [index])

  

  return (
    <section className="hero">
      <div className="hero-background">
        {sequence[index].type === 'video' ? (
          <video key={index} className="hero-bg-video" src={sequence[index].src} autoPlay muted loop playsInline />
        ) : (
          <img key={index} src={sequence[index].src} alt="Background" className="hero-bg-image" />
        )}
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="sequence-overlay">
              {sequence[index].variant === 'first' && (
                <>
                  <div className={`overlay-line gold ${step >= 0 ? 'show' : ''}`}>Are you tired of confusing financial advice</div>
                  <div className={`overlay-line ${step >= 1 ? 'show' : ''}`}>that leaves your wealth at risk?</div>
                </>
              )}
              {sequence[index].variant === 'second' && (
                <div className="overlay-longtext"><span className="gold">Nova Wealth</span> delivers expert wealth management in Kenya with clear strategies to grow, protect, and plan your financial future. Our advisors provide tailored investment and financial planning solutions designed for professionals and businesses who demand results.</div>
              )}
              {sequence[index].variant === 'third' && (
                <div className="logo-center">
                  <div className="logo-stack">
                    <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth" className="logo-zoom" />
                    <div className="logo-tagline">Securing Tomorrow’s Legacy, Today</div>
                  </div>
                </div>
              )}
            </div>
            <div className="hero-buttons">
              <Link to="/assessment" className="btn-primary hero-btn">Start Your Wealth Journey Today</Link>
              <Link to="/assessment" className="btn-outline-gold hero-btn">Book Appointment</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
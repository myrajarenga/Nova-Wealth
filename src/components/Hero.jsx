import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const sequence = [
    { type: 'video', src: '/videos/wrong-wealth-advise.mp4', duration: 8000, variant: 'first' },
    { type: 'text', src: '', duration: 11000, variant: 'text-intro' },
    { type: 'video', src: '/videos/wealth-management.mp4', duration: 9000, variant: 'second-video' },
    { type: 'image', src: '/images/home page image.png', duration: 13000, variant: 'third' }
  ]
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [taglineText, setTaglineText] = useState('')

  useEffect(() => {
    setStep(0)
    setDisplayedText('') // Reset second slide text
    setTaglineText('') // Reset third slide text
    const current = sequence[index]
    let t1
    let typeInterval
    const t2 = setTimeout(() => setIndex((i) => (i + 1) % sequence.length), current.duration)
    
    if (current.variant === 'first') {
      t1 = setTimeout(() => setStep(1), 2800)
    } else if (current.variant === 'text-intro') {
      // Typewriter effect for text intro
      const fullText = "NOVA WEALTH PROVIDES EXPERT WEALTH MANAGEMENT IN KENYA WITH CLEAR, STRATEGIC SOLUTIONS TO GROW AND PROTECT YOUR FINANCIAL FUTURE."
      
      // Delay before typing starts
      const startDelay = 500
      
      t1 = setTimeout(() => {
        let charIndex = 0
        typeInterval = setInterval(() => {
          if (charIndex < fullText.length) {
            setDisplayedText(fullText.substring(0, charIndex + 1))
            charIndex++
          } else {
            clearInterval(typeInterval)
          }
        }, 80) // Speed of typing
      }, startDelay)
    } else if (current.variant === 'third') {
      // Typewriter effect for tagline on third slide
      // Wait for zoom animation (approx 2-3 seconds into the slide)
      const zoomDelay = 3000 
      const fullTagline = "SECURING TOMORROW’S LEGACY, TODAY"
      
      t1 = setTimeout(() => {
        let charIndex = 0
        typeInterval = setInterval(() => {
          if (charIndex < fullTagline.length) {
            setTaglineText(fullTagline.substring(0, charIndex + 1))
            charIndex++
          } else {
            clearInterval(typeInterval)
          }
        }, 50) // Slightly slower typing for elegance
      }, zoomDelay)
    }

    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2);
      if (typeInterval) clearInterval(typeInterval);
    }
  }, [index])

  

  return (
    <section className="hero">
      <div className="hero-background">
        {sequence[index].type === 'video' ? (
          <video key={index} className="hero-bg-video" src={sequence[index].src} autoPlay muted loop playsInline />
        ) : sequence[index].type === 'text' ? (
          <div key={index} className="hero-bg-color" style={{backgroundColor: '#000000', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -2}}></div>
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
                  <div className={`overlay-line gold ${step >= 0 ? 'show' : ''}`}>EXPERIENCE WEALTH MANAGEMENT</div>
                  <div className={`overlay-line ${step >= 1 ? 'show' : ''}`}>WITHOUT UNCERTAINTY</div>
                </>
              )}
              {sequence[index].variant === 'text-intro' && (
                <div className="overlay-longtext">
                  <span className="gold">{displayedText.slice(0, 11)}</span>
                  {displayedText.slice(11)}
                </div>
              )}
              {sequence[index].variant === 'third' && (
                <div className="logo-center">
                  <div className="logo-stack">
                    <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth" className="logo-zoom" />
                    <div className="logo-tagline">{taglineText}</div>
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
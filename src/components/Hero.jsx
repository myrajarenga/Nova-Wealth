import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const location = useLocation()
  const sequence = [
    {
      type: 'video',
      src: '/videos/problemo1.mp4',
      duration: 6000,
      variant: 'problem-1',
      headline: 'TOO BUSY TO THINK ABOUT YOUR FINANCES.',
    },
    {
      type: 'video',
      src: '/videos/problem22.mp4',
      duration: 6000,
      variant: 'problem-2',
      headline: 'UNSURE WHICH FINANCIAL DECISIONS ARE RIGHT FOR YOU?',
    },
    {
      type: 'video',
      src: '/videos/problemo3.mp4',
      duration: 6000,
      variant: 'problem-3',
      headline: 'NO STRUCTURED PLAN FOR YOUR RETIREMENT?',
    },
    {
      type: 'video',
      src: '/videos/problem-4.mp4',
      duration: 6000,
      variant: 'problem-4',
      headline: 'CONCERNED ABOUT YOUR FAMILY’S FUTURE LEGACY?',
    },
    {
      type: 'text',
      duration: 8000,
      variant: 'welcome-typing',
    },
    {
      type: 'video',
      src: '/videos/solution-1.mp4',
      duration: 6000,
      variant: 'solution-1',
      headline: 'CONFIDENCE THAT YOUR WEALTH IS PROTECTED.',
    },
    {
      type: 'video',
      src: '/videos/solution2.mp4',
      duration: 6000,
      variant: 'solution-2',
      headline: 'LONG-TERM PLAN FOR STABILITY AND GROWTH.',
    },
    {
      type: 'video',
      src: '/videos/solution-3.mp4',
      duration: 6000,
      variant: 'solution-3',
      headline: 'INVESTMENTS SHAPED AROUND YOUR VALUES.',
    },
    {
      type: 'video',
      src: '/videos/solutionii4.mp4',
      duration: 6000,
      variant: 'solutioni4',
      headline: 'MORE TIME TO ENJOY WHAT TRULY MATTERS.',
    },
    {
      type: 'video',
      src: '/videos/solution6.mp4',
      duration: 6000,
      variant: 'solutioni5',
      headline: 'A LEGACY DESIGNED TO LAST FOR GENERATIONS.',
    },
    {
      type: 'image',
      src: '/images/home page image.png',
      duration: 13000,
      variant: 'final-logo',
    },
  ]

  const [index, setIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [headlineVisible, setHeadlineVisible] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('hero') === 'restart') {
      setIndex(0)
    }
  }, [location.search])

  useEffect(() => {
    setDisplayedText('')
    setHeadlineVisible(false)
    const current = sequence[index]
    let t1
    let typeInterval
    let headlineTimeout
    const t2 = setTimeout(() => setIndex((i) => (i + 1) % sequence.length), current.duration)

    if (current.variant === 'welcome-typing') {
      const fullText = 'WELCOME TO NOVA WEALTH WHERE WE SECURE TOMORROWS LEGACY TODAY.'

      t1 = setTimeout(() => {
        let charIndex = 0
        typeInterval = setInterval(() => {
          if (charIndex < fullText.length) {
            setDisplayedText(fullText.substring(0, charIndex + 1))
            charIndex++
          } else {
            clearInterval(typeInterval)
          }
        }, 90)
      }, 0)
    } else if (current.variant !== 'final-logo') {
      headlineTimeout = setTimeout(() => {
        setHeadlineVisible(true)
      }, 900)
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      if (typeInterval) clearInterval(typeInterval)
      clearTimeout(headlineTimeout)
    }
  }, [index])



  return (
    <section className="hero">
      <div className="hero-background">
        {sequence[index].type === 'text' && (
          sequence[index].variant === 'welcome-typing' ? (
            <>
              <img
                key={index}
                src="/images/home page image.png"
                alt="Background"
                className="hero-bg-image"
              />
              <div className="hero-bg-overlay" />
            </>
          ) : (
            <div
              key={index}
              className="hero-bg-color"
              style={{
                backgroundColor: '#000000',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -2,
              }}
            />
          )
        )}

        {sequence[index].type === 'image' && (
          <img
            key={index}
            src={sequence[index].src}
            alt="Background"
            className="hero-bg-image"
          />
        )}

        {sequence[index].type === 'video' && (
          <video
            key={index}
            src={sequence[index].src}
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="sequence-overlay">
              {sequence[index].variant === 'welcome-typing' && (
                <div className="overlay-longtext">
                  {(() => {
                    const text = displayedText
                    const brand = 'NOVA WEALTH'
                    const idx = text.indexOf(brand)
                    if (idx === -1) return text
                    return (
                      <>
                        {text.slice(0, idx)}
                        <span className="gold">{brand}</span>
                        {text.slice(idx + brand.length)}
                      </>
                    )
                  })()}
                </div>
              )}

              {sequence[index].variant !== 'welcome-typing' &&
                sequence[index].variant !== 'final-logo' &&
                headlineVisible && (
                  <div className="overlay-longtext">
                    {sequence[index].headline}
                  </div>
                )}

              {sequence[index].variant === 'final-logo' && (
                <div className="logo-center">
                  <div className="logo-stack">
                    <img
                      src="/images/Logo for Nova Wealth - SVG.svg"
                      alt="Nova Wealth"
                      className="logo-zoom"
                    />
                    <div className="logo-tagline logo-tagline-main">INVEST WISELY WITH US</div>
                    <div className="logo-tagline logo-tagline-sub">
                      SECURE  TOMORROW'S LEGACY, TODAY.
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary hero-btn">Talk to an Advisor</Link>
              <a
                href="https://calendly.com/novawealth"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold hero-btn"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

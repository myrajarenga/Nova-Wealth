import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const titleFull = 'Secure Your Financial Future'
  const descFull = 'Experience personalized wealth management strategies designed to grow and protect your assets. Our expert advisors create tailored solutions that align with your unique financial goals and aspirations.'
  const accentStart = titleFull.indexOf('Financial Future')
  const [titleText, setTitleText] = useState('')
  const [descText, setDescText] = useState('')

  useEffect(() => {
    let ti = 0
    let di = 0
    let alive = true
    function typeTitle() {
      if (!alive) return
      if (ti < titleFull.length) {
        setTitleText(titleFull.slice(0, ti + 1))
        const delay = Math.floor(120 + Math.random() * 80)
        ti += 1
        setTimeout(typeTitle, delay)
      } else {
        setTimeout(() => { ti = 0; setTitleText(''); typeTitle() }, 3500)
      }
    }
    function typeDesc() {
      if (!alive) return
      if (di < descFull.length) {
        setDescText(descFull.slice(0, di + 1))
        const delay = Math.floor(60 + Math.random() * 20)
        di += 1
        setTimeout(typeDesc, delay)
      } else {
        setTimeout(() => { di = 0; setDescText(''); typeDesc() }, 5000)
      }
    }
    typeTitle()
    typeDesc()
    return () => { alive = false }
  }, [])

  const baseLen = Math.min(titleText.length, accentStart)
  const accentLen = Math.max(0, titleText.length - accentStart)
  const baseText = titleFull.slice(0, baseLen)
  const accentText = titleFull.slice(accentStart, accentStart + accentLen)

  return (
    <section className="hero">
      <div className="hero-background">
        <video className="hero-bg-video" src="/videos/hero-section-video.mp4" autoPlay muted loop playsInline />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="typed-area">
              <h1 className="hero-headline">
                <span>{baseText}</span>
                <span className="headline-accent">{accentText}</span>
              </h1>
              <p className="hero-description">{descText}</p>
            </div>
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary hero-btn">start your wealth journey</Link>
              <Link to="/contact" className="btn-outline-gold hero-btn">Schedule Consultation</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
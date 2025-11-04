import React from 'react';
import IntroSection from '../components/About/IntroSection';
import OurStory from '../components/About/OurStory';
import ValuesGrid from '../components/About/ValuesGrid';
import VisionSection from '../components/About/VisionSection';
import TeamGrid from '../components/About/TeamGrid';
import CTASection from '../components/About/CTASection';

// About page composition: header/footer provided elsewhere; render sections only
const About = () => {
  return (
    <main className="w-full">
      <IntroSection />
      <OurStory />
      <ValuesGrid />
      <VisionSection />
      <TeamGrid />
      <CTASection />
    </main>
  );
};

export default About;
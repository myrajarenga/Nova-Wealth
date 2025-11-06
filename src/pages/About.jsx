import React from 'react';
import IntroSection from '../components/About/IntroSection';
import OurStory from '../components/About/OurStory';
import OurPurposeSection from '../components/About/OurPurposeSection';
import ValuesGrid from '../components/About/ValuesGrid';
import TeamGrid from '../components/About/TeamGrid';
import CTASection from '../components/About/CTASection';

// About page composition: header/footer provided elsewhere; render sections only
const About = () => {
  return (
    <main className="w-full space-y-20 md:space-y-24 bg-white">
      <IntroSection />
      <OurStory />
      <OurPurposeSection />
      <ValuesGrid />
      <TeamGrid />
      <CTASection />
    </main>
  );
};

export default About;
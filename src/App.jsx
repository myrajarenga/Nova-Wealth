import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesCards from './components/ServicesCards';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <ServicesCards />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
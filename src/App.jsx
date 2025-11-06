import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CTASection from './components/CTASection';
import ServiceHighlights from './components/Home/ServiceHighlights';
import Footer from './components/Footer';
import Services from './pages/Services';
import WhoWeServe from './pages/WhoWeServe';
import About from './pages/About';
import ClientCenter from './pages/ClientCenter';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <ServiceHighlights />
                <CTASection />
              </>
            )}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/who-we-serve" element={<WhoWeServe />} />
          <Route path="/about" element={<About />} />
          <Route path="/client-center" element={<ClientCenter />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
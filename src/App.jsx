import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CTASection from './components/CTASection';
import ServiceHighlights from './components/Home/ServiceHighlights';
import Footer from './components/Footer';
import Services from './pages/Services';
import WhoWeServe from './pages/WhoWeServe';
import About from './pages/About';
import ClientCenter from './pages/ClientCenter';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const location = useLocation();
  const hideFooter = ['/login', '/assessment', '/assessment-results'].includes(location.pathname);
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          {/* redeploy trigger */}
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <ServiceHighlights />
              </>
            )}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/who-we-serve" element={<WhoWeServe />} />
          <Route path="/about" element={<About />} />
          <Route path="/client-center" element={<ClientCenter />} />
          <Route path="/client-center/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;

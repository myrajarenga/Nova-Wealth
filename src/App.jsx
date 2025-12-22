import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AutoLogout from './components/AutoLogout';
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
import Register from './pages/Register';
import OAuthCallback from './pages/OAuthCallback';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const location = useLocation();

  const isAuthPage = /^\/(login|register|assessment|assessment-results)(\/|$)/i.test(location.pathname);
  const isClientPortal = /^\/client-center(\/|$)/i.test(location.pathname);

  const hideFooter = isAuthPage || isClientPortal;
  const hideNavbar = isClientPortal;

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <main>
        <AutoLogout>
          <Routes>
            {/* redeploy trigger */}
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
            <Route path="/client-center/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/assessment-results" element={<AssessmentResults />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AutoLogout>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;

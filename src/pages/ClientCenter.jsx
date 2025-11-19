import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../services/authService';
import ClientCenterHeader from '../components/ClientCenter/ClientCenterHeader';
import ClientCard from '../components/ClientCenter/ClientCard';
import SupportSection from '../components/ClientCenter/SupportSection';
import CallToActionBar from '../components/ClientCenter/CallToActionBar';

// Simple state machine for the client workflow.
// unauthenticated -> authenticated (may require profile) -> profileComplete -> uploaded
const ClientCenter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [hasUploadedDocs, setHasUploadedDocs] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    const authed = !!token;
    setIsAuthenticated(authed);
    if (authed) {
      setIsProfileComplete(true);
    }
  }, []);

  function handleLogin() {
    navigate('/login');
  }

  function handleLogout() {
    logout();
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    setHasUploadedDocs(false);
    navigate('/login');
  }

  function handleCompleteProfile() {
    setIsProfileComplete(true);
  }

  function handleUpload() {
    setIsUploading(true);
    // Simulate async upload
    setTimeout(() => {
      setHasUploadedDocs(true);
      setIsUploading(false);
    }, 1200);
  }

  function handleSchedule() {
    // Integrate with calendar provider or custom form route
    window.location.href = '/contact';
  }

  const loginCard = (
    <ClientCard
      testId="card-login"
      icon={<div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">🔐</div>}
      title="Client Login"
      description="Access your personalized dashboard to view portfolio performance, account statements, and investment insights in a secure environment."
      buttonText={isAuthenticated ? 'Logged In' : 'Login to Portal'}
      disabled={isAuthenticated}
      onClick={() => (!isAuthenticated ? handleLogin() : null)}
    />
  );

  const uploadCard = (
    <ClientCard
      testId="card-upload"
      icon={<div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center">📄</div>}
      title="Upload Documents"
      description="Securely share key documents, bank statements, or tax records with your advisor through our encrypted platform."
      buttonText={isUploading ? 'Uploading…' : hasUploadedDocs ? 'Uploaded' : 'Upload Files'}
      disabled={!isAuthenticated || hasUploadedDocs || isUploading}
      onClick={handleUpload}
    />
  );

  const meetingCard = (
    <ClientCard
      testId="card-meeting"
      icon={<div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center">📅</div>}
      title="Schedule Meeting"
      description="Book a consultation with your wealth advisor to review goals, discuss investment strategies, portfolio re‑views, and financial planning."
      buttonText="Book Meeting"
      disabled={!hasUploadedDocs}
      onClick={handleSchedule}
    />
  );

  return (
    <main className="bg-white text-black">
      <div className="container mx-auto px-4">
        <ClientCenterHeader />
        {isAuthenticated && (
          <div className="flex justify-end mb-4">
            <button onClick={handleLogout} className="px-4 py-2 rounded-md border border-black/10">Logout</button>
          </div>
        )}

        <section aria-label="Client actions" className="pb-8">
          {!isAuthenticated && (
            <p className="font-opensans text-center text-[#2C3E50] mb-6">Please log in to get started.</p>
          )}
          {isAuthenticated && !hasUploadedDocs && (
            <p className="font-opensans text-center text-[#2C3E50] mb-6">Welcome back. Upload your documents to unlock scheduling.</p>
          )}
          {hasUploadedDocs && (
            <p className="font-opensans text-center text-[#2C3E50] mb-6">Documents received. You can now book a meeting.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {loginCard}
            {uploadCard}
            {meetingCard}
          </div>
        </section>
      </div>

      <SupportSection />
      <CallToActionBar />
    </main>
  );
};

export default ClientCenter;



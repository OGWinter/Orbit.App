import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import CapabilityStrip from './components/sections/CapabilityStrip';
import PlatformSection from './components/sections/PlatformSection';
import WorkflowSection from './components/sections/WorkflowSection';
import BuilderRolesSection from './components/sections/BuilderRolesSection';
import ClosingSection from './components/sections/ClosingSection';
import WaitlistModal from './components/modals/WaitlistModal';
import InquiryModal from './components/modals/InquiryModal';
import QuickStartModal from './components/modals/QuickStartModal';
import PlatformSandboxView from './components/views/PlatformSandboxView';
import MissionControlView from './components/views/MissionControlView';
import WorkspaceView from './components/views/WorkspaceView';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignInView from './components/auth/SignInView';
import RegisterView from './components/auth/RegisterView';
import ForgotPasswordView from './components/auth/ForgotPasswordView';
import ResetPasswordView from './components/auth/ResetPasswordView';
import InviteAcceptanceView from './components/auth/InviteAcceptanceView';
import { BuilderRole } from './types/orbit';
import { AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<BuilderRole>('fullstack');

  // Support legacy hash navigations gracefully
  useEffect(() => {
    if (window.location.hash === '#admin') {
      navigate('/admin', { replace: true });
    } else if (window.location.hash === '#platform-sandbox') {
      navigate('/platform', { replace: true });
    }
  }, [navigate]);

  const openAdmin = () => {
    navigate('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlatform = () => {
    navigate('/platform');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSignIn = () => {
    navigate('/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWorkspace = () => {
    navigate('/workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToWebsite = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="orbit-app">
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            <>
              <Header
                onOpenWaitlist={() => setWaitlistOpen(true)}
                onOpenAdmin={openAdmin}
                onOpenPlatformDemo={openPlatform}
                onOpenQuickStart={() => setQuickStartOpen(true)}
                onOpenSignIn={openSignIn}
                onOpenWorkspace={openWorkspace}
                isAdminView={false}
              />
              <main id="top">
                <HeroSection
                  currentBuilderRole={currentRole}
                  onOpenQuickStart={() => setQuickStartOpen(true)}
                  onOpenPlatformDemo={openPlatform}
                />
                <CapabilityStrip />
                <PlatformSection onOpenPlatformDemo={openPlatform} />
                <WorkflowSection />
                <BuilderRolesSection onRoleChange={setCurrentRole} />
                <ClosingSection
                  onOpenWaitlist={() => setWaitlistOpen(true)}
                  onOpenInquiry={() => setInquiryOpen(true)}
                />
              </main>
              <Footer
                onOpenAdmin={openAdmin}
                onOpenQuickStart={() => setQuickStartOpen(true)}
                onOpenPlatformDemo={openPlatform}
                onOpenSignIn={openSignIn}
              />
            </>
          }
        />

        {/* Platform Sandbox Demo Route */}
        <Route
          path="/platform"
          element={
            <PlatformSandboxView
              onBackToWebsite={backToWebsite}
              onOpenQuickStart={() => setQuickStartOpen(true)}
              onOpenWaitlist={() => setWaitlistOpen(true)}
            />
          }
        />

        {/* Mission Control Admin Demo Route */}
        <Route
          path="/admin"
          element={<MissionControlView onBackToWebsite={backToWebsite} />}
        />

        {/* Phase 2: Authentication Routes */}
        <Route path="/login" element={<SignInView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/reset-password" element={<ResetPasswordView />} />
        <Route path="/invite" element={<InviteAcceptanceView />} />

        {/* Phase 4.1: Authenticated Workspace Route */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <WorkspaceView />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Modals */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        onOpenAdmin={openAdmin}
      />
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        onOpenAdmin={openAdmin}
      />
      <QuickStartModal
        isOpen={quickStartOpen}
        onClose={() => setQuickStartOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

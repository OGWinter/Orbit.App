import React, { useState, useEffect } from 'react';
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
import { BuilderRole } from './types/orbit';

export const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === '#admin' || window.location.pathname.startsWith('/admin');
  });

  const [isPlatformView, setIsPlatformView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === '#platform-sandbox' || window.location.pathname.startsWith('/platform');
  });

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<BuilderRole>('fullstack');

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
      setIsPlatformView(window.location.pathname.startsWith('/platform') || window.location.hash === '#platform-sandbox');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminView(true);
    setIsPlatformView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlatform = () => {
    window.history.pushState(null, '', '/platform');
    setIsPlatformView(true);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToWebsite = () => {
    window.history.pushState(null, '', '/');
    setIsAdminView(false);
    setIsPlatformView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="orbit-app">
      {isAdminView ? (
        <MissionControlView onBackToWebsite={backToWebsite} />
      ) : isPlatformView ? (
        <PlatformSandboxView
          onBackToWebsite={backToWebsite}
          onOpenQuickStart={() => setQuickStartOpen(true)}
          onOpenWaitlist={() => setWaitlistOpen(true)}
        />
      ) : (
        <>
          <Header
            onOpenWaitlist={() => setWaitlistOpen(true)}
            onOpenAdmin={openAdmin}
            onOpenPlatformDemo={openPlatform}
            onOpenQuickStart={() => setQuickStartOpen(true)}
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
          />
        </>
      )}

      {/* Modals */}
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

export default App;

import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { WorkspacePreview } from './components/sections/WorkspacePreview';
import { ProductIntro } from './components/sections/ProductIntro';
import { CoreCapabilities } from './components/sections/CoreCapabilities';
import { HowItWorks } from './components/sections/HowItWorks';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { EarlyAccessCTA } from './components/sections/EarlyAccessCTA';
import { EarlyAccessModal } from './components/modals/EarlyAccessModal';
import { SignInModal } from './components/modals/SignInModal';
import { DocumentationModal } from './components/modals/DocumentationModal';

export const App: React.FC = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  const handleOpenWaitlist = (email?: string) => {
    if (email) setInitialEmail(email);
    setWaitlistOpen(true);
  };

  const handleExplore = () => {
    const el = document.getElementById('workspace-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f8fafc] font-sans relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background subtle grid pattern */}
      <div className="fixed inset-0 bg-grid-subtle pointer-events-none opacity-40 z-0" />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          onOpenWaitlist={() => handleOpenWaitlist()}
          onOpenSignIn={() => setSignInOpen(true)}
          onOpenDocs={() => setDocsOpen(true)}
        />

        <main className="flex-1">
          <Hero
            onOpenWaitlist={handleOpenWaitlist}
            onExplore={handleExplore}
          />

          <WorkspacePreview />

          <ProductIntro onOpenWaitlist={() => handleOpenWaitlist()} />

          <CoreCapabilities />

          <HowItWorks />

          <ProductShowcase />

          <EarlyAccessCTA onOpenWaitlist={handleOpenWaitlist} />
        </main>

        <Footer
          onOpenWaitlist={() => handleOpenWaitlist()}
          onOpenDocs={() => setDocsOpen(true)}
        />
      </div>

      {/* Modals */}
      <EarlyAccessModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        initialEmail={initialEmail}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onOpenWaitlist={() => handleOpenWaitlist()}
      />

      <DocumentationModal
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
      />
    </div>
  );
};

export default App;

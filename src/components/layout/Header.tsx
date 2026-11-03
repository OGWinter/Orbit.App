import React, { useState, useEffect } from 'react';
import { OrbitLogo } from '../ui/OrbitLogo';
import { Button } from '../ui/Button';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenWaitlist: () => void;
  onOpenSignIn: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWaitlist,
  onOpenSignIn,
  onOpenDocs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Workspace Preview', href: '#workspace-preview' },
    { label: 'Documentation', onClick: onOpenDocs },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07080b]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg">
              <OrbitLogo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94a3b8]">
              {navLinks.map((link, idx) =>
                link.href ? (
                  <a
                    key={idx}
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={idx}
                    onClick={link.onClick}
                    className="hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenSignIn}
                className="text-[#94a3b8] hover:text-white"
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenWaitlist}
                iconRight={<Sparkles className="w-3.5 h-3.5" />}
              >
                Get Early Access
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenWaitlist}
                className="text-xs px-2.5 py-1.5"
              >
                Access
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#94a3b8] hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/80 backdrop-blur-xl pt-24 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-6 text-center">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) =>
                link.href ? (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-[#cbd5e1] hover:text-white py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={idx}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      link.onClick?.();
                    }}
                    className="text-lg font-medium text-[#cbd5e1] hover:text-white py-2"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Button
                variant="glow"
                size="lg"
                className="w-full justify-center"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWaitlist();
                }}
              >
                Get Early Access
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
              >
                Sign in (Phase 1 Info)
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

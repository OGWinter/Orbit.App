import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Terminal, Laptop, Copy, Check } from 'lucide-react';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCopiedKey(null);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const winCommand = 'npx orbit-workspace start --win';
  const macCommand = 'npx orbit-workspace start --mac';

  return (
    <div
      className={`orbit-modal-overlay ${isOpen ? 'is-active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-quickstart-title"
    >
      <div className="orbit-modal" style={{ maxWidth: '640px' }}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="modal-header">
          <span className="eyebrow" style={{ color: 'var(--violet)' }}>
            LOCAL RUNTIME LAUNCHER
          </span>
          <h3 id="modal-quickstart-title">One-Click Start for Windows & Mac</h3>
          <p style={{ marginBottom: '14px' }}>
            Run Orbit locally with one command. Automatically checks Node.js runtime, prepares isolated dependencies, and opens the workspace in your browser.
          </p>
        </div>

        {/* Isolation Guarantee Pill */}
        <div
          style={{
            background: 'var(--mint)',
            border: '1px solid #c2e2d3',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#065f46',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <ShieldCheck size={20} strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }} aria-hidden="true" />
          <div>
            <strong>Strictly Project-Isolated:</strong> Dependencies are scoped solely to your repository's local worktree. Zero global modifications will be made to your computer.
          </div>
        </div>

        {/* Windows & Mac Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          {/* Windows Option */}
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '18px',
              background: 'var(--paper)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Terminal size={18} color="var(--violet)" aria-hidden="true" />
                <strong style={{ fontSize: '15px', fontFamily: 'var(--font-display)' }}>
                  Windows (CMD / PowerShell)
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
                Launches in PowerShell or Terminal with automatic port binding.
              </p>
              <div
                style={{
                  background: 'var(--night)',
                  color: '#FFFFFF',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  wordBreak: 'break-all',
                }}
              >
                <span>{winCommand}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(winCommand, 'win')}
                  style={{
                    background: copiedKey === 'win' ? 'var(--lime)' : 'rgba(255, 255, 255, 0.15)',
                    color: copiedKey === 'win' ? 'var(--ink)' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedKey === 'win' ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={2} />}
                  <span>{copiedKey === 'win' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mac Option */}
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '18px',
              background: 'var(--paper)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Laptop size={18} color="var(--violet)" aria-hidden="true" />
                <strong style={{ fontSize: '15px', fontFamily: 'var(--font-display)' }}>
                  macOS (Terminal / zsh)
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
                Native zsh command with automatic Homebrew/nvm Node detection.
              </p>
              <div
                style={{
                  background: 'var(--night)',
                  color: '#FFFFFF',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  wordBreak: 'break-all',
                }}
              >
                <span>{macCommand}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(macCommand, 'mac')}
                  style={{
                    background: copiedKey === 'mac' ? 'var(--lime)' : 'rgba(255, 255, 255, 0.15)',
                    color: copiedKey === 'mac' ? 'var(--ink)' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedKey === 'mac' ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={2} />}
                  <span>{copiedKey === 'mac' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
          Node.js &gt;= 20 required. Zero telemetry or unreviewed code changes.
        </div>
      </div>
    </div>
  );
};

export default QuickStartModal;

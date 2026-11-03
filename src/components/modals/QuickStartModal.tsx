import React, { useState, useEffect } from 'react';

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
          ×
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
            border: '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#14532d',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>🛡️</span>
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
                <span style={{ fontSize: '20px' }}>🪟</span>
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
                  color: 'var(--lime)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  font: '12px monospace',
                  marginBottom: '12px',
                  wordBreak: 'break-all',
                }}
              >
                {winCommand}
              </div>
            </div>
            <button
              type="button"
              className="button button-dark"
              onClick={() => copyToClipboard(winCommand, 'win')}
              style={{ width: '100%', minHeight: '40px', fontSize: '12px' }}
            >
              {copiedKey === 'win' ? '✓ Copied Command!' : 'Copy Windows Command'}
            </button>
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
                <span style={{ fontSize: '20px' }}>🍎</span>
                <strong style={{ fontSize: '15px', fontFamily: 'var(--font-display)' }}>
                  macOS (Terminal / zsh)
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
                Supports macOS 12+ (Apple Silicon & Intel) with zero dependencies.
              </p>
              <div
                style={{
                  background: 'var(--night)',
                  color: 'var(--lime)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  font: '12px monospace',
                  marginBottom: '12px',
                  wordBreak: 'break-all',
                }}
              >
                {macCommand}
              </div>
            </div>
            <button
              type="button"
              className="button button-dark"
              onClick={() => copyToClipboard(macCommand, 'mac')}
              style={{ width: '100%', minHeight: '40px', fontSize: '12px' }}
            >
              {copiedKey === 'mac' ? '✓ Copied Command!' : 'Copy macOS Command'}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)' }}>
          Design preview demonstration launcher. Requires Node.js 18+ installed on your system.
        </div>
      </div>
    </div>
  );
};

export default QuickStartModal;

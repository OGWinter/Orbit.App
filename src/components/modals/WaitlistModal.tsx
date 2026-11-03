import React, { useState, useEffect, useRef } from 'react';
import { orbitStore } from '../../services/orbitStore';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
  onSuccess?: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [builderRole, setBuilderRole] = useState('fullstack');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    queuePosition: number;
    email: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setError(null);
      setSuccessInfo(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessInfo(null);

    const cleanEmail = email.toLowerCase().trim();
    if (!orbitStore.validateEmail(cleanEmail)) {
      setError('Please enter a valid work email address (e.g. name@company.com).');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = orbitStore.joinWaitlist({
        email: cleanEmail,
        full_name: fullName.trim() || null,
        builder_role: builderRole,
        company: company.trim() || null,
        use_case: useCase.trim() || null,
      });

      setSuccessInfo({
        queuePosition: result.queue_position,
        email: cleanEmail,
      });

      setEmail('');
      setFullName('');
      setCompany('');
      setUseCase('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`orbit-modal-overlay ${isOpen ? 'is-active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-waitlist-title"
    >
      <div className="orbit-modal">
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
            EARLY ACCESS
          </span>
          <h3 id="modal-waitlist-title">Join the Orbit Waitlist</h3>
          <p>
            Get prioritized access to the agent-first workspace as we open new builder cohorts.
          </p>
        </div>

        {successInfo ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--mint)',
                color: '#15803d',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
                fontSize: '22px',
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <h4 style={{ fontSize: '18px', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
              Queue Position #{successInfo.queuePosition} Reserved
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.6 }}>
              Thank you! Your preview registration for <strong>{successInfo.email}</strong> is recorded locally in your browser preview session.
            </p>
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '11px',
                color: '#64748b',
                marginBottom: '20px',
                textAlign: 'left',
              }}
            >
              <strong>Preview Notice:</strong> In Phase 1, data is stored locally in client-side storage for interface preview purposes. No backend database has been connected yet.
            </div>
            <button
              type="button"
              className="button button-dark"
              onClick={onClose}
              style={{ width: '100%' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="orbit-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="wl-email">Work Email *</label>
              <input
                ref={inputRef}
                type="email"
                id="wl-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@company.com"
                required
              />
              {error && (
                <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                  {error}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="wl-name">Full Name</label>
              <input
                type="text"
                id="wl-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ada Lovelace"
              />
            </div>

            <div className="form-field">
              <label htmlFor="wl-role">Primary Builder Role</label>
              <select
                id="wl-role"
                value={builderRole}
                onChange={(e) => setBuilderRole(e.target.value)}
              >
                <option value="fullstack">Full Stack Builder</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Architect</option>
                <option value="teams">Engineering Team Lead</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="wl-company">Company / Project (Optional)</label>
              <input
                type="text"
                id="wl-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Indie builder or Company name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="wl-usecase">What are you looking to build with Orbit?</label>
              <textarea
                id="wl-usecase"
                rows={2}
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="e.g. Multi-file refactorings, automated testing..."
              />
            </div>

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Reserving...' : 'Join Waitlist ↗'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', margin: '8px 0 0' }}>
              Client-side demonstration preview. Zero marketing spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;

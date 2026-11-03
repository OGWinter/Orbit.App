import React, { useState, useEffect, useRef } from 'react';
import { orbitStore } from '../../services/orbitStore';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
  onSuccess?: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('demo');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setFeedback(null);
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
    if (!name.trim() || !email.trim() || !message.trim() || isSubmitting) return;

    if (!orbitStore.validateEmail(email)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid work email address (e.g. name@company.com).',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      orbitStore.submitInquiry({
        name,
        email,
        company: company.trim() || null,
        inquiry_type: inquiryType,
        message,
      });

      setFeedback({
        type: 'success',
        message: '✓ Thank you! Your team demo inquiry has been registered in your local browser preview session.',
      });

      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      onSuccess?.();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Could not submit inquiry. Please try again.',
      });
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
      aria-labelledby="modal-inquiry-title"
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
            ENTERPRISE & TEAMS
          </span>
          <h3 id="modal-inquiry-title">Request a Team Demo</h3>
          <p>Explore how Orbit can accelerate your engineering team's delivery loops.</p>
        </div>

        {feedback?.type === 'success' ? (
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
              Inquiry Registered
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.6 }}>
              {feedback.message}
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
              Close
            </button>
          </div>
        ) : (
          <form className="orbit-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="inq-name">Your Name *</label>
              <input
                ref={inputRef}
                type="text"
                id="inq-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Connor"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="inq-email">Work Email *</label>
              <input
                type="email"
                id="inq-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@company.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="inq-company">Company</label>
              <input
                type="text"
                id="inq-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Skyline Tech"
              />
            </div>

            <div className="form-field">
              <label htmlFor="inq-type">Inquiry Type</label>
              <select
                id="inq-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
              >
                <option value="demo">Product Demo</option>
                <option value="sales">Sales & Pricing</option>
                <option value="partnership">Partnership</option>
                <option value="general">General Question</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="inq-msg">Message *</label>
              <textarea
                id="inq-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your team size, repository stack, and engineering goals..."
                required
              />
            </div>

            {feedback?.type === 'error' && (
              <div style={{ color: '#ef4444', fontSize: '12px' }}>
                {feedback.message}
              </div>
            )}

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request Team Demo →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;


import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, Sparkles, User, Mail, Github, Code } from 'lucide-react';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [role, setRole] = useState('fullstack');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update email if initialEmail changes
  React.useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid developer email address');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate submission (clearly identified as Phase 1 local state)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setGithub('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submitted ? undefined : 'Request Early Access to Orbit'}
      description={
        submitted
          ? undefined
          : 'Join the waitlist for Orbit V2. We are onboarding software builders in selective cohorts.'
      }
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xl font-bold text-white">You're on the early-access list!</h4>
            <p className="text-sm text-[#94a3b8] max-w-sm mx-auto">
              We've registered <span className="text-indigo-300 font-mono">{email}</span> for Cohort #1 access invitations.
            </p>
          </div>

          <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-left space-y-1.5 text-xs text-[#94a3b8]">
            <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 1 Design Preview Note</span>
            </div>
            <p>
              This is a client-side preview demonstration. Your request is staged for the upcoming V2 workspace rollout.
            </p>
          </div>

          <Button variant="secondary" className="w-full mt-4" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            label="Work or Personal Email *"
            type="email"
            placeholder="developer@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Mail className="w-4 h-4" />}
            error={error}
            required
          />

          <Input
            label="Name / Handle"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            iconLeft={<User className="w-4 h-4" />}
          />

          <Input
            label="GitHub Profile (Optional)"
            placeholder="github.com/username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            iconLeft={<Github className="w-4 h-4" />}
          />

          <div>
            <label className="block text-xs font-medium text-[#94a3b8] uppercase tracking-wider mb-2">
              Primary Role
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'indie', label: 'Indie Hacker / Founder' },
                { id: 'fullstack', label: 'Full-Stack Builder' },
                { id: 'frontend', label: 'Frontend Engineer' },
                { id: 'backend', label: 'Backend / Systems' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    role === item.id
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-white font-medium shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-[#94a3b8] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              isLoading={loading}
              iconRight={<Sparkles className="w-4 h-4" />}
            >
              Request Access
            </Button>
            <p className="text-[11px] text-center text-[#64748b] mt-2.5">
              Strictly developer-first. No spam, ever.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};


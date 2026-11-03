import React from 'react';

interface OrbitLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Symbol */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="logo-orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="logo-core" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Outer Ellipse Ring */}
          <ellipse
            cx="20"
            cy="20"
            rx="16.5"
            ry="6"
            transform="rotate(-28 20 20)"
            stroke="url(#logo-orbit-grad)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.5"
          />

          {/* Active Front Orbital Ring */}
          <ellipse
            cx="20"
            cy="20"
            rx="14"
            ry="5.5"
            transform="rotate(38 20 20)"
            stroke="url(#logo-orbit-grad)"
            strokeWidth="2"
          />

          {/* Orbiting Satellite Node 1 */}
          <circle cx="31" cy="12.5" r="2.2" fill="#38bdf8" />
          <circle cx="31" cy="12.5" r="4" stroke="#38bdf8" strokeWidth="0.75" opacity="0.4" />

          {/* Orbiting Satellite Node 2 */}
          <circle cx="9" cy="27.5" r="1.8" fill="#a855f7" />

          {/* Central Workspace Core */}
          <circle cx="20" cy="20" r="3.75" fill="url(#logo-core)" filter="url(#core-glow)" />
          <circle cx="20" cy="20" r="6" stroke="#6366f1" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex items-center gap-1.5">
        <span className={`font-bold tracking-tight text-white font-sans ${textSizes[size]}`}>
          Orbit<span className="text-indigo-400">.</span>
        </span>
        {showBadge && (
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
            v2
          </span>
        )}
      </div>
    </div>
  );
};


import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'indigo' | 'cyan' | 'amber' | 'emerald' | 'rose' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wide',
    md: 'text-xs px-2.5 py-1 tracking-wide font-medium',
  };

  const variantClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    neutral: 'bg-white/[0.05] text-[#94a3b8] border-white/10',
  };

  const dotClasses = {
    indigo: 'bg-indigo-400',
    cyan: 'bg-cyan-400',
    amber: 'bg-amber-400',
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
};


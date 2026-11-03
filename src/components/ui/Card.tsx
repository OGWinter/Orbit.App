import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated' | 'glass';
  glowColor?: 'indigo' | 'cyan' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  glowColor = 'none',
  className = '',
  ...props
}) => {
  const baseClasses = 'relative rounded-2xl transition-all duration-300';

  const variantClasses = {
    default: 'bg-[#0d1017] border border-white/[0.08] text-[#f8fafc]',
    interactive:
      'bg-[#0d1017] hover:bg-[#121622] border border-white/[0.08] hover:border-white/20 text-[#f8fafc] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer',
    elevated:
      'bg-[#0f131c] border border-white/[0.12] shadow-2xl shadow-black/80 text-[#f8fafc]',
    glass:
      'bg-[#0d1017]/80 backdrop-blur-xl border border-white/[0.1] text-[#f8fafc]',
  };

  const glowClasses = {
    none: '',
    indigo: 'hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.25)] hover:border-indigo-500/40',
    cyan: 'hover:shadow-[0_0_35px_-8px_rgba(6,182,212,0.25)] hover:border-cyan-500/40',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${glowClasses[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};


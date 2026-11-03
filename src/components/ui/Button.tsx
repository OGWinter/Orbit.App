import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07080b] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 border border-indigo-400/30 focus:ring-indigo-500 hover:shadow-indigo-500/30',
    secondary:
      'bg-[#121622] hover:bg-[#181e2e] text-[#f8fafc] border border-white/10 hover:border-white/20 focus:ring-slate-400',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-[#cbd5e1] hover:text-white border border-white/15 hover:border-white/30 focus:ring-indigo-500',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-[#94a3b8] hover:text-white border border-transparent focus:ring-slate-400',
    glow:
      'bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-white/20 focus:ring-cyan-500',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
      ) : (
        iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
      )}
      <span>{children}</span>
      {!isLoading && iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
};

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, iconLeft, iconRight, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748b]">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#090b10] text-[#f8fafc] text-sm placeholder-[#475569] rounded-xl border border-white/10 px-4 py-2.5 transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
              iconLeft ? 'pl-10' : ''
            } ${iconRight ? 'pr-10' : ''} ${
              error ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20' : ''
            } ${className}`}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[#64748b]">
              {iconRight}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#64748b] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

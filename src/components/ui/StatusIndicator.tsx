import React from 'react';
import { CheckCircle2, Clock, Cpu, Sparkles } from 'lucide-react';

export type AgentStatusType = 'analyzing' | 'planning' | 'awaitingApproval' | 'executing' | 'verified';

interface StatusIndicatorProps {
  status: AgentStatusType;
  customText?: string;
  size?: 'sm' | 'md';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  customText,
  size = 'md',
}) => {
  const configs = {
    analyzing: {
      label: 'Analyzing Codebase',
      colorText: 'text-cyan-400',
      colorBg: 'bg-cyan-500/10',
      colorBorder: 'border-cyan-500/25',
      dotColor: 'bg-cyan-400',
      icon: Cpu,
    },
    planning: {
      label: 'Synthesizing Architecture Plan',
      colorText: 'text-indigo-400',
      colorBg: 'bg-indigo-500/10',
      colorBorder: 'border-indigo-500/25',
      dotColor: 'bg-indigo-400',
      icon: Sparkles,
    },
    awaitingApproval: {
      label: 'Awaiting Developer Approval',
      colorText: 'text-amber-400',
      colorBg: 'bg-amber-500/10',
      colorBorder: 'border-amber-500/30',
      dotColor: 'bg-amber-400',
      icon: Clock,
    },
    executing: {
      label: 'Applying Multi-file Edits',
      colorText: 'text-purple-400',
      colorBg: 'bg-purple-500/10',
      colorBorder: 'border-purple-500/25',
      dotColor: 'bg-purple-400',
      icon: Cpu,
    },
    verified: {
      label: 'Tests Passed & Verified',
      colorText: 'text-emerald-400',
      colorBg: 'bg-emerald-500/10',
      colorBorder: 'border-emerald-500/25',
      dotColor: 'bg-emerald-400',
      icon: CheckCircle2,
    },
  };

  const current = configs[status];
  const Icon = current.icon;
  const isPending = status === 'analyzing' || status === 'executing';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono ${
        size === 'sm' ? 'text-xs' : 'text-xs'
      } ${current.colorBg} ${current.colorBorder} ${current.colorText}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isPending ? 'animate-ping' : ''
          } ${current.dotColor}`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dotColor}`} />
      </span>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="font-sans font-medium">{customText || current.label}</span>
    </div>
  );
};

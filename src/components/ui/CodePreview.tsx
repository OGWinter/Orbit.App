import React, { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';

export interface DiffLine {
  type: 'add' | 'del' | 'normal';
  lineNumber?: number;
  content: string;
}

interface CodePreviewProps {
  filename: string;
  language?: string;
  lines: DiffLine[];
  additionsCount?: number;
  deletionsCount?: number;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  filename,
  language = 'typescript',
  lines,
  additionsCount,
  deletionsCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = lines.map((l) => l.content).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#090b10] overflow-hidden text-xs font-mono shadow-xl">
      {/* File Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0e111a] border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-[#cbd5e1]">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-sans font-medium text-xs tracking-tight">{filename}</span>
          <span className="text-[10px] text-[#64748b] uppercase px-1.5 py-0.5 rounded bg-white/[0.05]">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {(additionsCount !== undefined || deletionsCount !== undefined) && (
            <div className="flex items-center gap-1.5 text-[11px]">
              {additionsCount !== undefined && (
                <span className="text-emerald-400 font-semibold">+{additionsCount}</span>
              )}
              {deletionsCount !== undefined && (
                <span className="text-rose-400 font-semibold">-{deletionsCount}</span>
              )}
            </div>
          )}
          <button
            onClick={handleCopy}
            className="p-1 rounded text-[#64748b] hover:text-white hover:bg-white/10 transition-colors"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code diff lines */}
      <div className="py-2.5 overflow-x-auto leading-relaxed max-h-[380px] scrollbar-thin">
        {lines.map((line, idx) => {
          let lineBg = 'hover:bg-white/[0.02]';
          let textColor = 'text-[#94a3b8]';
          let sign = ' ';

          if (line.type === 'add') {
            lineBg = 'bg-emerald-500/[0.09] hover:bg-emerald-500/[0.14]';
            textColor = 'text-emerald-200';
            sign = '+';
          } else if (line.type === 'del') {
            lineBg = 'bg-rose-500/[0.09] hover:bg-rose-500/[0.14]';
            textColor = 'text-rose-300 line-through opacity-80';
            sign = '-';
          }

          return (
            <div key={idx} className={`flex items-start px-3 py-0.5 ${lineBg} transition-colors`}>
              <span className="w-7 shrink-0 text-[#475569] text-right select-none pr-3 text-[11px]">
                {line.lineNumber ?? idx + 1}
              </span>
              <span
                className={`w-4 shrink-0 select-none font-bold ${
                  line.type === 'add'
                    ? 'text-emerald-400'
                    : line.type === 'del'
                    ? 'text-rose-400'
                    : 'text-transparent'
                }`}
              >
                {sign}
              </span>
              <span className={`whitespace-pre font-mono ${textColor} flex-1`}>{line.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

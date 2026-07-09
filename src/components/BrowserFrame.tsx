import React from "react";

interface BrowserFrameProps {
  domain: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a screenshot in a minimal, premium browser-chrome frame.
 * Shows the real live domain in the address bar so previews read
 * as "live website" rather than "pasted image."
 */
export function BrowserFrame({ domain, children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-stone-900 rounded-sm shadow-2xl border border-white/10 ${className}`}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 h-8 px-3 bg-stone-950/95 border-b border-white/5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1.5 bg-stone-900/80 rounded-full px-3 py-0.5 max-w-[220px]">
            <span className="w-1 h-1 rounded-full bg-[#C9A876] shrink-0" />
            <span className="text-[9px] font-mono tracking-wide text-stone-400 truncate">
              {domain}
            </span>
          </div>
        </div>
      </div>

      {/* Screenshot area */}
      <div className="relative w-full h-[calc(100%-2rem)]">{children}</div>
    </div>
  );
}

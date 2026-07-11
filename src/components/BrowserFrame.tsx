import React from "react";

interface BrowserFrameProps {
  domain: string;
  children: React.ReactNode;
  className?: string;
  /** Forces the auto-scroll to run (used when a card is the active/centered one) */
  active?: boolean;
}

/**
 * Clips and holds the screenshot preview. Purely a viewport for the
 * scrolling screenshot — the gold outline lives one level up, wrapped
 * around the whole card (see .glow-ring / .glow-ring-inner in index.css).
 */
export function BrowserFrame({ domain, children, className = "", active = false }: BrowserFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-stone-900 ${active ? "is-scrolling" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

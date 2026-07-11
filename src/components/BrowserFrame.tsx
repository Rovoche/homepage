import React from "react";

interface BrowserFrameProps {
  domain: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Clean hairline-bordered frame for screenshot previews.
 * No fake browser chrome — just a quiet, premium outline that
 * sharpens on hover.
 */
export function BrowserFrame({ domain, children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`group/frame relative overflow-hidden bg-stone-900 rounded-sm border border-white/10 transition-colors duration-500 hover:border-accent/50 ${className}`}
    >
      {children}
    </div>
  );
}

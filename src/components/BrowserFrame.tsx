import React from "react";

interface BrowserFrameProps {
  domain: string;
  children: React.ReactNode;
  className?: string;
  /** Forces the glow + auto-scroll to run (used on mobile, where there's no hover state) */
  active?: boolean;
}

/**
 * Clean-edged frame for screenshot previews.
 * - A quiet gold light travels around the border at rest, and
 *   brightens/speeds up on hover (desktop) or when `active` (mobile).
 * - The child <img> should use the .scroll-shot class to get the
 *   slow scroll-through-the-page animation, triggered by the same states.
 */
export function BrowserFrame({ domain, children, className = "", active = false }: BrowserFrameProps) {
  return (
    <div
      className={`glow-ring relative overflow-hidden bg-stone-900 rounded-sm ${
        active ? "is-active is-scrolling" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

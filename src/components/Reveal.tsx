import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms - use idx * 90 or similar for cascading lists */
  delay?: number;
}

/**
 * Fades and slides content into place the first time it scrolls into
 * view. Driven by a real CSS @keyframes animation (see .reveal-el /
 * .is-visible in index.css) rather than inline styles, and uses a plain
 * threshold with no restrictive rootMargin - both changes made after a
 * clip-path + negative-rootMargin version got stuck permanently invisible
 * on some mobile viewports. Fires once per element, respects
 * prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.animationDelay = `${delay}ms`;
            target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);

    // Safety net: if the observer never fires for any reason (edge-case
    // browser quirk, element never intersects), force it visible after
    // a few seconds so content can never get permanently stuck hidden.
    const safety = setTimeout(() => {
      el.classList.add("is-visible");
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-el ${className}`}>
      {children}
    </div>
  );
}

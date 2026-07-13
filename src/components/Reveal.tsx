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
 * .is-visible in index.css) rather than inline styles. Triggers slightly
 * before elements are fully on-screen (rootMargin) so it reads as fluid
 * rather than snapping right at the viewport edge. Fires once per
 * element, respects prefers-reduced-motion.
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

    // If this browser doesn't support IntersectionObserver at all, just
    // show the content rather than leaving it permanently invisible.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
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
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-el ${className}`}>
      {children}
    </div>
  );
}

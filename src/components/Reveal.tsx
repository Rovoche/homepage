import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms - use idx * 80 or similar for cascading lists */
  delay?: number;
  /** How far (px) the content slides up from as it reveals */
  y?: number;
}

/**
 * Fades and slides content up into place the first time it scrolls into
 * view. Fires once per element (doesn't re-trigger on scroll back up),
 * and respects prefers-reduced-motion by skipping the animation entirely.
 */
export function Reveal({ children, className = "", delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] duration-[900ms] ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}

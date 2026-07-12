import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms - use idx * 90 or similar for cascading lists */
  delay?: number;
}

/**
 * Reveals content as though it's rising into place from its own base —
 * a clip-path wipe from the bottom, not a generic opacity fade. Ties to
 * the "built on rock / foundation" identity instead of a stock fade-up.
 * Fires once per element, respects prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.19,1,0.22,1)] duration-[1100ms] ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";

interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "michael",
    stars: 5,
    quote: "ROVOCHÉ approaches digital work with unusual care and professionalism. Their understanding of trust, presentation, and user experience is evident throughout every project. They consistently deliver work that reflects quality, attention to detail, and long-term thinking.",
    author: "Michael",
    role: "Founder, Lumineuron",
  },
  {
    id: "samuel",
    stars: 5,
    quote: "ROVOCHÉ helped us translate years of community impact into a website that finally reflected the quality of our work. The result feels structured, credible, and far easier for partners and supporters to understand.",
    author: "Samuel",
    role: "Executive Director & Founder, Twayne Safe Haven",
  },
  {
    id: "hannah",
    stars: 5,
    quote: "What stood out most was the attention to detail. The website feels elegant, intentional, and aligned with the quality we want customers to associate with our brand.",
    author: "Hannah",
    role: "Founder, Peasis Fashion",
  },
];

export function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollSpeed = 0.45; // Smooth slow speed multiplier (pixels per frame)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let accumulatedScroll = container.scrollLeft;

    const scroll = () => {
      if (!isHovered && !isInteracting && container) {
        accumulatedScroll += scrollSpeed;
        
        // Match width of a single set of testimonials to reset seamless loop
        const halfWidth = container.scrollHeight > 0 ? container.scrollWidth / 2 : 0;
        
        if (halfWidth > 0 && accumulatedScroll >= halfWidth) {
          accumulatedScroll = accumulatedScroll - halfWidth;
        }
        
        container.scrollLeft = accumulatedScroll;
      } else if (container) {
        // Sync accumulated scrolls back to actual position if user interacts manually
        accumulatedScroll = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isInteracting]);

  // Sync scroll on manual wheel or swipe
  const handleScroll = () => {
    if (containerRef.current) {
      // Keep state position synced
    }
  };

  // Repeated list to provide a seamless continuous scroll loop
  const listToRender = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <div className="relative w-full">
      {/* Interaction Guidance microcopy */}
      <div className="flex items-center justify-between mb-4 px-1 max-w-7xl mx-auto">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400 select-none">
          Client Endorsements
        </span>
        <div className="text-[9px] uppercase tracking-widest text-[#C9A876] font-sans flex items-center space-x-1.5 select-none opacity-80">
          <span className="w-1 h-1 rounded-full bg-[#C9A876] animate-pulse" />
          <span>Swipe or hover to pause</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsInteracting(false);
        }}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => {
          // Resume auto scroll with a slight delay
          setTimeout(() => setIsInteracting(false), 1500);
        }}
        onScroll={handleScroll}
        className="w-full overflow-x-auto scrollbar-none flex gap-6 pb-6 select-none cursor-grab active:cursor-grabbing snap-x md:snap-none"
        style={{
          scrollBehavior: isInteracting ? "smooth" : "auto",
        }}
      >
        {listToRender.map((testimonial, idx) => {
          // Adjust id to guarantee uniqueness in key
          return (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[85vw] sm:w-[500px] md:w-[460px] shrink-0 bg-bg p-8 md:p-10 border border-stone-200/50 rounded-sm shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-accent/40 snap-center md:snap-align-none"
            >
              <div className="space-y-4 text-left">
                <span className="text-accent select-none mb-1 block tracking-wider text-xs">
                  {Array.from({ length: testimonial.stars }).map((_, i) => "★").join("")}
                </span>
                <p className="text-stone-850 text-xs sm:text-sm leading-relaxed font-sans font-light min-h-[96px] md:min-h-[110px]">
                  “{testimonial.quote}”
                </p>
              </div>

              <div className="border-t border-stone-200/80 pt-5 mt-6 flex items-center justify-between text-left">
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-bold text-text">
                    {testimonial.author}
                  </h4>
                  <p className="text-[9px] text-stone-500 uppercase tracking-widest max-w-[240px] truncate leading-tight">
                    {testimonial.role}
                  </p>
                </div>
                <span className="text-[9px] px-2.5 py-0.5 bg-accent/8 border border-accent/20 rounded-full text-accent tracking-wider font-semibold font-sans uppercase shrink-0">
                  Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

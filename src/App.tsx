import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkItem {
  id: string;
  tag: string;
  name: string;
  url: string;
  img: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SELECTED_WORK: WorkItem[] = [
  {
    id: "01",
    tag: "Fashion / Couture",
    name: "Bespoke Couture Architecture",
    url: "https://rovoche.github.io/luxuryfashion/",
    img: "SBL-SCC.png",
  },
  {
    id: "02",
    tag: "Beauty / Identity",
    name: "Aesthetic Identity Frame",
    url: "https://rovoche.github.io/Glam-and-Makeup/",
    img: "KIKI-SCC.png",
  },
  {
    id: "03",
    tag: "NGO / Platform",
    name: "Social Infrastructure Space",
    url: "https://twaynesafehaven.org",
    img: "TSH-SCC.png",
  },
  {
    id: "04",
    tag: "Commerce / Fashion",
    name: "Structured Digital Commerce",
    url: "https://peasis.com",
    img: "PEASIS-SCC.png",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "ROVOCHÉ helped us turn our fashion story into a website that feels elegant, clear, and ready for serious customers.",
    author: "Hannah",
    role: "Peasis Fashion",
  },
  {
    quote:
      "The final page felt sharper than what we had in mind. They understood the goal quickly and shaped the site around trust and action.",
    author: "Michael",
    role: "Herkimer Capital",
  },
  {
    quote:
      "The work made our brand feel more credible online. The layout and mobile experience were cleaner than expected.",
    author: "Segun",
    role: "ValueIQX",
  },
  {
    quote:
      "What stood out was how practical the process felt. The website wasn't just pretty — it made the business easier to explain and easier to contact.",
    author: "Amara",
    role: "Service Brand Founder",
  },
  {
    quote:
      "The redesign gave us a more polished first impression. It finally felt like our online presence matched the quality of our work.",
    author: "Daniel",
    role: "Business Owner",
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function SafeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#1C1D1D] to-[#252626] border border-[#C4B59D]/20 ${className}`}
      >
        <div className="text-center p-4">
          <p className="font-serif italic text-xs text-[#C4B59D]/70">{alt}</p>
          <span className="text-[10px] text-[#8A8C8A] uppercase tracking-widest mt-1 block">
            ROVOCHÉ PREVIEW
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
}

function VideoBackground({
  src,
  opacity = "opacity-55",
}: {
  src: string;
  opacity?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stone-shade fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#151616] via-[#1C1D1D] to-[#151616]" />

      {!error && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setError(true)}
          className={`absolute min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover ${opacity} transition-opacity duration-1000`}
          style={{ willChange: "transform" }}
          data-parallax-video
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Luxury ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151616] via-transparent to-[#151616]/30 pointer-events-none" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function App() {
  // Preloader
  const [introCompleted, setIntroCompleted] = useState(false);
  const [introPercent, setIntroPercent] = useState(0);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  // Layout
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio hover
  const [activePortfolioImgIndex, setActivePortfolioImgIndex] = useState<
    number | null
  >(null);

  // Stats counters
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [industriesCount, setIndustriesCount] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Testimonial drag carousel
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 1. Preloader
  useEffect(() => {
    const duration = 4600;
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextPercent = Math.min(Math.round((currentStep / steps) * 100), 100);
      setIntroPercent(nextPercent);
      if (nextPercent >= 100) {
        clearInterval(timer);
        setIntroCompleted(true);
      }
    }, intervalTime);

    const fallback = setTimeout(() => {
      setIntroPercent(100);
      setIntroCompleted(true);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(fallback);
    };
  }, []);

  // Scroll lock while preloader is open
  useEffect(() => {
    document.body.style.overflow = introCompleted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introCompleted]);

  // 2. Scroll + IntersectionObserver
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.id === "trust-metrics") setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".scroll-reveal")
      .forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // 3. Stats counter animation
  useEffect(() => {
    if (!statsAnimated) return;
    let startTime: number | null = null;
    const duration = 1800;

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress * (2 - progress);

      setDeliveredCount(Math.floor(ease * 10));
      setSatisfactionCount(Math.floor(ease * 100));
      setIndustriesCount(Math.floor(ease * 4));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDeliveredCount(10);
        setSatisfactionCount(100);
        setIndustriesCount(4);
      }
    };

    requestAnimationFrame(step);
  }, [statsAnimated]);

  // 4. Parallax scroll for video backgrounds
  useEffect(() => {
    if (!introCompleted) return;

    const handleParallax = () => {
      const scrollPos = window.scrollY;
      document.querySelectorAll("[data-parallax-video]").forEach((el) => {
        const v = el as HTMLVideoElement;
        v.style.transform = `translate(-50%, calc(-50% + ${scrollPos * 0.14}px))`;
      });
    };

    window.addEventListener("scroll", handleParallax, { passive: true });
    return () => window.removeEventListener("scroll", handleParallax);
  }, [introCompleted]);

  // Smooth scroll
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Carousel drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    carouselRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const scrollCarousel = (direction: "left" | "right") => {
    carouselRef.current?.scrollTo({
      left:
        carouselRef.current.scrollLeft +
        (direction === "left" ? -350 : 350),
      behavior: "smooth",
    });
  };

  // Portfolio touch (mobile: tap to peek, tap again to open)
  const handlePortfolioTouch = (
    idx: number,
    e: React.MouseEvent | React.TouchEvent,
    url: string
  ) => {
    if (window.innerWidth < 1024) {
      if (activePortfolioImgIndex !== idx) {
        e.preventDefault();
        setActivePortfolioImgIndex(idx);
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen bg-[#151616] selection:bg-[#C4B59D]/30 selection:text-white text-[#E2E1DA]">

      {/* ── 1. PRELOADER ── */}
      <div
        id="preloader"
        className={`fixed inset-0 z-[100] bg-[#151616] flex flex-col justify-between p-6 md:p-12 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          introCompleted ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            ref={introVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={() => setIntroCompleted(true)}
            className="absolute min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-40"
          >
            <source src="Rov-Intro.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#151616]/40" />
        </div>

        {/* Top bar */}
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#C4B59D]">
              ROVOCHÉ STUDIO
            </span>
            <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#8A8C8A] mt-1">
              Lagos · London · NY
            </p>
          </div>
          <button
            onClick={() => setIntroCompleted(true)}
            className="text-[10px] font-sans uppercase tracking-[0.2em] border border-[#E2E1DA]/20 hover:border-[#C4B59D] rounded-full px-4 py-1.5 transition-colors duration-300 text-[#8A8C8A] hover:text-[#E2E1DA]"
          >
            Skip Intro
          </button>
        </div>

        {/* Centre branding */}
        <div className="relative z-10 text-center select-none my-auto">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-normal tracking-[0.18em] uppercase text-[#E2E1DA]">
            ROVOCHÉ
          </h1>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#C4B59D] mt-4 tracking-wider">
            Built on Rock.
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 w-full space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#8A8C8A]">
              CREATIVE ARCHISTRY & STRATEGIC LUXURY
            </span>
            <span className="font-mono text-xs text-[#C4B59D]">
              {introPercent}%
            </span>
          </div>
          <div className="h-[2px] w-full bg-[#E2E1DA]/10 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#C4B59D] transition-all duration-300 ease-out"
              style={{ width: `${introPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 px-6 md:px-12 ${
          scrolled
            ? "glass-panel shadow-lg border-b border-[#E2E1DA]/8 !py-4"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-[#E2E1DA] hover:text-[#C4B59D] transition-colors duration-300 select-none"
          >
            ROVOCHÉ
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { label: "Work", target: "selected-work" },
              { label: "Services", target: "services-section" },
              { label: "Process", target: "how-we-work" },
              { label: "Results", target: "trust-bar-section" },
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                onClick={(e) => handleAnchorClick(e, link.target)}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#8A8C8A] hover:text-[#E2E1DA] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta-section"
              onClick={(e) => handleAnchorClick(e, "cta-section")}
              className="font-sans text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 bg-transparent border border-[#C4B59D]/30 text-[#C4B59D] hover:bg-[#C4B59D] hover:text-[#151616] transition-all duration-500 rounded-sm"
            >
              Begin Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#E2E1DA] hover:text-[#C4B59D] p-2"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile fullscreen overlay */}
        <div
          className={`fixed inset-0 z-40 bg-[#151616] flex flex-col justify-between p-8 pt-28 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-8 my-auto">
            {[
              { label: "Selected Work", target: "selected-work" },
              { label: "Our Services", target: "services-section" },
              { label: "Our Process", target: "how-we-work" },
              { label: "Client Results", target: "trust-bar-section" },
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                onClick={(e) => handleAnchorClick(e, link.target)}
                className="font-serif text-3xl sm:text-4xl text-[#E2E1DA] hover:text-[#C4B59D] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta-section"
              onClick={(e) => handleAnchorClick(e, "cta-section")}
              className="inline-block mt-4 text-center font-sans text-xs uppercase tracking-[0.25em] py-4 bg-[#C4B59D] text-[#151616] rounded transition-transform font-medium"
            >
              Begin Your Project
            </a>
          </div>
          <div className="border-t border-[#E2E1DA]/10 pt-6 space-y-2">
            <p className="font-serif italic text-sm text-[#C4B59D]">
              Built on Rock.
            </p>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#8A8C8A]">
              <span>LAGOS · LONDON · NY</span>
              <span>© 2026 ROVOCHÉ</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── 3. HERO ── */}
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden"
      >
        <VideoBackground src="rov-2.mp4" opacity="opacity-55" />

        <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center justify-center mt-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#C4B59D] mb-6 block opacity-90">
            LAGOS · LONDON · NEW YORK
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.2] sm:leading-[1.15] text-[#E2E1DA] tracking-tight max-w-3xl">
            Your business deserves to be taken{" "}
            <span className="font-serif italic text-[#C4B59D] block sm:inline">
              seriously online.
            </span>
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#8A8C8A] max-w-xl mx-auto mt-6 leading-relaxed tracking-wide">
            We build premium websites for Nigerian businesses ready to grow. No
            code shortcuts, just pure digital luxury.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-10">
            <a
              href="#selected-work"
              onClick={(e) => handleAnchorClick(e, "selected-work")}
              className="w-full sm:w-auto text-center font-sans text-xs uppercase tracking-[0.2em] px-8 py-3.5 border border-[#E2E1DA]/40 text-[#E2E1DA] hover:border-[#C4B59D] hover:bg-[#C4B59D]/10 transition-all duration-300 rounded-sm"
            >
              See Our Work
            </a>
            <a
              href="#cta-section"
              onClick={(e) => handleAnchorClick(e, "cta-section")}
              className="group flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C4B59D] hover:text-white transition-all duration-300 py-2.5"
            >
              <span>Start a Project</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* Bottom coordinates strip */}
        <div className="absolute bottom-10 left-0 right-0 z-10 px-6 md:px-12 sm:flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-[#8A8C8A]/80 hidden">
          <div className="flex items-center space-x-4">
            <span>LAGOS</span>
            <span className="w-1 h-1 rounded-full bg-[#C4B59D]/60" />
            <span>LONDON</span>
            <span className="w-1 h-1 rounded-full bg-[#C4B59D]/60" />
            <span>NEW YORK</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#C4B59D]">BUILT ON ROCK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4B59D]/80 animate-ping" />
          </div>
        </div>
      </section>

      {/* ── 4. TRUST BAR / STATS ── */}
      <section
        id="trust-bar-section"
        className="relative py-16 bg-[#1C1D1D] border-y border-[#E2E1DA]/8 scroll-reveal"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            id="trust-metrics"
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <div className="space-y-3">
              <span className="font-serif text-5xl md:text-6xl font-normal text-[#C4B59D] tracking-tighter block select-none">
                {deliveredCount}+
              </span>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8A8C8A]">
                Websites Delivered
              </p>
            </div>
            <div className="space-y-3 border-y border-[#E2E1DA]/8 md:border-y-0 md:border-x border-[#E2E1DA]/8 py-8 md:py-0">
              <span className="font-serif text-5xl md:text-6xl font-normal text-[#C4B59D] tracking-tighter block select-none">
                {satisfactionCount}%
              </span>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8A8C8A]">
                Client Satisfaction
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-serif text-5xl md:text-6xl font-normal text-[#C4B59D] tracking-tighter block select-none">
                {industriesCount}
              </span>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8A8C8A]">
                Industries Served
              </p>
            </div>
          </div>
          <div className="mt-12 text-center pt-8 border-t border-[#E2E1DA]/5">
            <p className="font-serif italic text-sm md:text-base text-[#E2E1DA]/90 max-w-xl mx-auto">
              "Every client we build for gets a site their competitors don't
              have."
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. SELECTED WORK ── */}
      <section id="selected-work" className="py-24 md:py-32 bg-[#151616]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col space-y-4 mb-16 scroll-reveal">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#C4B59D]">
              SELECTED WORK
            </span>
            <div className="h-[1px] w-12 bg-[#C4B59D]/60" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#E2E1DA]">
              High-Value Digital Real Estate
            </h2>
          </div>

          <div className="border-t border-[#E2E1DA]/8 divide-y divide-[#E2E1DA]/8">
            {SELECTED_WORK.map((work, idx) => (
              <div
                key={work.id}
                onMouseEnter={() => setActivePortfolioImgIndex(idx)}
                onMouseLeave={() => setActivePortfolioImgIndex(null)}
                onClick={(e) => handlePortfolioTouch(idx, e, work.url)}
                className="group relative py-8 sm:py-12 cursor-pointer transition-all duration-500 overflow-hidden text-left"
              >
                <div className="absolute inset-0 bg-[#1C1D1D]/0 group-hover:bg-[#1C1D1D]/45 -z-10 transition-colors duration-500" />

                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-8 z-10 relative">
                  <div className="lg:col-span-4 flex items-center space-x-6 sm:space-x-12">
                    <span className="font-mono text-xs text-[#C4B59D] uppercase tracking-wide">
                      {work.id}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8A8C8A] group-hover:text-[#E2E1DA] transition-colors duration-300">
                      {work.tag}
                    </span>
                  </div>
                  <div className="lg:col-span-6">
                    <h3 className="font-serif text-lg sm:text-2xl text-[#E2E1DA] tracking-wide group-hover:translate-x-4 group-hover:text-[#C4B59D] transition-all duration-500">
                      {work.name}
                    </h3>
                  </div>
                  <div className="lg:col-span-2 flex justify-between lg:justify-end items-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#8A8C8A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:inline mr-2">
                      Explore Architecture
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-[#8A8C8A] group-hover:text-[#C4B59D] group-hover:rotate-45 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Desktop hover image */}
                <div
                  className={`absolute right-12 top-1/2 -translate-y-1/2 z-20 w-64 h-40 hidden lg:block rounded overflow-hidden pointer-events-none transition-all duration-500 ${
                    activePortfolioImgIndex === idx
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-95 translate-x-4"
                  }`}
                >
                  <SafeImage
                    src={work.img}
                    alt={work.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 border border-[#C4B59D]/20 shadow-2xl"
                  />
                </div>

                {/* Mobile touch peek */}
                <div
                  className={`block lg:hidden mt-4 overflow-hidden transition-all duration-500 ${
                    activePortfolioImgIndex === idx
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="relative py-2 aspect-video w-full max-w-sm rounded overflow-hidden border border-[#C4B59D]/20">
                    <SafeImage
                      src={work.img}
                      alt={work.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151616] via-transparent to-transparent flex items-end p-3">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[#C4B59D]/90 bg-[#1C1D1D]/90 px-3 py-1 border border-[#E2E1DA]/10">
                        Tap again to open site
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center scroll-reveal">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#8A8C8A]">
              "Each site built to attract the right customers — not just to look
              good."
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. PROCESS ── */}
      <section
        id="how-we-work"
        className="py-24 md:py-32 bg-[#1C1D1D] border-y border-[#E2E1DA]/8"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col space-y-4 mb-20 text-center items-center scroll-reveal">
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#C4B59D] block">
              THE PROCESS
            </span>
            <div className="h-[1px] w-12 bg-[#C4B59D]/60" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E2E1DA] font-normal tracking-tight mt-2">
              Simple. Clear. Delivered.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 01",
                title: "We Listen",
                desc: "You tell us about your business, your customers, and what you want your website to do. No jargon.",
                highlight: false,
              },
              {
                step: "Step 02",
                title: "We Build",
                desc: "We design and develop your full custom website. You see progress, give feedback, we refine.",
                highlight: false,
              },
              {
                step: "Step 03",
                title: "You Launch",
                desc: "Your site goes live. You get a website that makes your business look serious and attracts customers.",
                highlight: true,
              },
            ].map((card) => (
              <div
                key={card.step}
                className={`${
                  card.highlight
                    ? "border border-[#C4B59D]/100 bg-[#C4B59D]/5 border-dashed"
                    : "border border-[#C4B59D]/20 hover:border-[#C4B59D]/60 bg-[#151616]/50"
                } rounded-sm p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 group scroll-reveal`}
              >
                <span className="font-mono text-sm text-[#C4B59D] uppercase tracking-wider block mb-8">
                  {card.step}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#E2E1DA] mb-3 group-hover:text-[#C4B59D] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8A8C8A] leading-relaxed tracking-wide">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SERVICES ── */}
      <section
        id="services-section"
        className="relative py-24 md:py-32 overflow-hidden bg-[#151616]"
      >
        <VideoBackground src="rov-2.mp4" opacity="opacity-35" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#C4B59D] block">
                SERVICES
              </span>
              <div className="h-[1px] w-12 bg-[#C4B59D]/60" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#E2E1DA] font-normal leading-tight">
                What We Build
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#8A8C8A] leading-relaxed tracking-wide max-w-sm mt-4">
                We craft tailored digital frameworks structured on clean code
                and serious, long-term brand conversion.
              </p>
            </div>

            <div className="lg:col-span-8 border-t border-[#E2E1DA]/8 divide-y divide-[#E2E1DA]/8">
              {[
                {
                  title: "Brand Websites",
                  desc: "A flagship online presence that makes your business the obvious choice.",
                },
                {
                  title: "E-Commerce Stores",
                  desc: "Sell online, professionally. Built to convert browsers into buyers.",
                },
                {
                  title: "Fashion & Couture Platforms",
                  desc: "Editorial digital spaces for fashion houses and luxury labels.",
                },
                {
                  title: "NGO & Nonprofit Sites",
                  desc: "Credibility and clarity for organizations doing important work.",
                },
                {
                  title: "Business Identity Packages",
                  desc: "Logo, site, and digital presence built as one complete system.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 hover:bg-[#1C1D1D]/30 px-4 -mx-4 transition-colors duration-300"
                >
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg sm:text-xl text-[#E2E1DA] group-hover:text-[#C4B59D] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#8A8C8A] max-w-xl">
                      {service.desc}
                    </p>
                  </div>
                  <CheckCircle2
                    size={16}
                    className="text-[#8A8C8A] group-hover:text-[#C4B59D] transition-colors duration-300 self-end sm:self-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ── */}
      <section
        id="testimonials-section"
        className="relative py-24 md:py-32 overflow-hidden bg-[#1C1D1D] border-y border-[#E2E1DA]/8"
      >
        <VideoBackground src="ROV-1.mp4" opacity="opacity-45" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 scroll-reveal">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#C4B59D] block mb-2">
                WHAT CLIENTS SAY
              </span>
              <div className="h-[1px] w-12 bg-[#C4B59D]/60 mb-4" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#E2E1DA] font-normal tracking-tight">
                Verified Foundations
              </h2>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => scrollCarousel("left")}
                className="w-10 h-10 rounded-full border border-[#E2E1DA]/20 hover:border-[#C4B59D] flex items-center justify-center transition-colors duration-300 text-[#8A8C8A] hover:text-[#E2E1DA]"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="w-10 h-10 rounded-full border border-[#E2E1DA]/20 hover:border-[#C4B59D] flex items-center justify-center transition-colors duration-300 text-[#8A8C8A] hover:text-[#E2E1DA]"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex space-x-6 overflow-x-auto pb-8 pt-4 scroll-smooth snap-x snap-mandatory lg:snap-none select-none cursor-grab active:cursor-grabbing ${
              isDragging ? "pointer-events-none" : ""
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[400px] max-w-[450px] flex-shrink-0 glass-panel p-8 sm:p-10 rounded-sm snap-start flex flex-col justify-between"
              >
                <span className="font-serif text-[#C4B59D] text-4xl block leading-none mb-6">
                  "
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#E2E1DA] leading-relaxed tracking-wide mb-8">
                  {t.quote}
                </p>
                <div className="border-t border-[#E2E1DA]/8 pt-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif text-[#E2E1DA] text-sm tracking-wide">
                      {t.author}
                    </h4>
                    <span className="font-sans text-[10px] uppercase text-[#8A8C8A] tracking-wider block mt-1">
                      {t.role}
                    </span>
                  </div>
                  <CheckCircle2 size={14} className="text-[#C4B59D]" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex sm:hidden justify-center items-center space-x-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-[#C4B59D]/40"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section
        id="cta-section"
        className="relative py-28 md:py-36 text-center overflow-hidden bg-[#151616]"
      >
        <VideoBackground src="ROV-rock.mp4" opacity="opacity-40" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#C4B59D] mb-6 block">
            BEGIN TO BUILD
          </span>
          <div className="h-[1px] w-12 bg-[#C4B59D]/60 mb-8" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#E2E1DA] tracking-tight max-w-2xl">
            Your business is ready.{" "}
            <span className="font-serif italic text-[#C4B59D] block sm:inline">
              Your website should be too.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#8A8C8A] max-w-md mx-auto mt-6 leading-relaxed tracking-wide">
            Let's build something that works for you. Invest in the architecture
            your brand deserves.
          </p>
          <div className="mt-10 flex flex-col items-center space-y-4">
            <a
              href="mailto:rovoche@gmail.com"
              className="px-10 py-4 bg-[#C4B59D] text-[#151616] tracking-[0.2em] font-sans font-medium text-xs rounded transition-transform duration-300 hover:scale-[1.03] select-none block uppercase"
            >
              Begin Your Project
            </a>
            <a
              href="mailto:rovoche@gmail.com"
              className="text-xs sm:text-sm font-sans tracking-[0.1em] text-[#8A8C8A] hover:text-[#C4B59D] underline decoration-[#C4B59D]/30 underline-offset-4 transition-colors duration-300 block"
            >
              rovoche@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. FOOTER ── */}
      <footer className="py-10 bg-[#151616] border-t border-[#E2E1DA]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#E2E1DA]/30">
            © 2026 ROVOCHÉ STUDIO · LAGOS · LONDON · NEW YORK
          </p>
          <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#E2E1DA]/30">
            Deliberate Digital Artistry
          </p>
        </div>
      </footer>
    </div>
  );
}

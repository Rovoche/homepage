import React, { useState, useEffect } from "react";
import { TestimonialSlider } from "./components/TestimonialSlider";
import {
  ArrowRight,
  ChevronRight,
  X,
  Menu,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Award,
  Maximize2
} from "lucide-react";

// Structure our Case Study project definitions
interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  img: string;
  url: string;
  brief: string;
  rationale: string;
  why: string[];
  palette: string[];
  type: string;
  signature: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  couture: {
    id: "01",
    tag: "Fashion / Couture",
    title: "Bespoke Couture Site",
    img: "SBL-SCC.png",
    url: "https://styledbylayo.rovoche.com/",
    brief: "A bespoke couture house needed a site that matched the weight of their garments — hand-finished, made-to-order, not mass production.",
    rationale: "The hero opens on the work itself before any text loads, because the craft sells faster than the copy. The signature collection is presented one piece at a time rather than as a grid, so each garment gets full attention.",
    why: [
      "Slow, deliberate pacing reflects the unhurried nature of bespoke tailoring",
      "Single-garment focus instead of grid-browsing fatigue",
      "A dedicated academy section builds authority beyond the shop itself"
    ],
    palette: ["#2B2521", "#C9A876", "#FAF5EC"],
    type: "Playfair Display for headlines, a restrained sans for body copy.",
    signature: "A collection accordion that expands one garment at a time, echoing a private fitting."
  },
  beauty: {
    id: "02",
    tag: "Beauty / Identity",
    title: "Makeup Artist Portfolio",
    img: "KIKI-SCC.png",
    url: "https://rovoche.github.io/Glam-and-Makeup/",
    brief: "A working makeup artist needed her real proof of skill — her Instagram presence — brought into a proper site without losing its immediacy.",
    rationale: "We embedded her actual reels directly rather than re-hosting curated images, so visitors see current, unedited proof of her work. The layout stays minimal so nothing competes with the content.",
    why: [
      "Live reel embeds stay current without portfolio upkeep",
      "Minimal framing keeps attention on the transformations",
      "Fast, mobile-first layout matches how clients actually browse"
    ],
    palette: ["#F3ECDF", "#C9A876", "#6E6357"],
    type: "Jost throughout — clean and unobtrusive, lets the content carry the personality.",
    signature: "Direct Instagram reel embedding for living proof instead of static screenshots."
  },
  ngo: {
    id: "03",
    tag: "NGO / Platform",
    title: "Youth Community Platform",
    img: "TSH-SCC.png",
    url: "https://twaynesafehaven.org",
    brief: "A youth storytelling community needed a site that reads as credible to funders and welcoming to the young people it serves.",
    rationale: "A calm, structured palette with a custom animated emblem gives the organization a mark of its own rather than a generic shield-and-text logo. An animated timeline turns a decade of history into something scannable.",
    why: [
      "A custom emblem gives the org a mark that feels designed, not templated",
      "A calm palette reads as credible to funders and reviewers",
      "An animated timeline replaces a wall of text with something scannable"
    ],
    palette: ["#3A6EA5", "#F3ECDF", "#2B2521"],
    type: "DM Serif Display for headings, DM Sans for body.",
    signature: "A hand-built animated emblem with a waving tri-colour flag, made specifically for this brand."
  },
  commerce: {
    id: "04",
    tag: "Commerce / Fashion",
    title: "Made-to-Order Fashion Site",
    img: "PEASIS-SCC.png",
    url: "https://peasis.com",
    brief: "A custom fashion brand needed a full site that felt considered end to end, without the overhead of a traditional store build.",
    rationale: "A recurring visual motif gives the brand a signature beyond its logo. A process animation makes the made-to-order model feel like craft rather than a delay, which matters when asking a client to commit before production starts.",
    why: [
      "A repeated motif builds recognition beyond the logo alone",
      "A process animation reframes 'made-to-order' as craft, not delay",
      "Package tiers shown clearly upfront reduce back-and-forth before commitment"
    ],
    palette: ["#FAF5EC", "#2B2521", "#C9A876"],
    type: "Cormorant Garamond for display, Jost for structure.",
    signature: "A cutting-motion transition marking the shift into the made-to-order process section."
  }
};

interface ProcessStage {
  number: string;
  name: string;
  oneLiner: string;
  description: string;
  details: string;
  deliverables: string[];
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    name: "Discovery",
    oneLiner: "We begin with your brand and your market goals.",
    description: "Who you serve, what makes them choose you, and how your website can prove your authority. This strategic planning stage shapes the entire structure of our work.",
    details: "We map out your competitive edge, analyze user behavior, and craft a detailed project blueprint. It's how we establish a robust pathway to conversion—long before any visual tools are opened.",
    deliverables: ["Project Strategy Brief", "Site Goals Outline", "Core Information Structure"]
  },
  {
    number: "02",
    name: "Structure",
    oneLiner: "We draft the blueprint of your success.",
    description: "Before applying visual details, we construct the structure page-by-page — determining exactly what your customers need to see first to build immediate trust.",
    details: "This is the flow foundation. We create layout wireframes of each page to establish clear pathways, making sure your potential customers find your services and get in touch easily.",
    deliverables: ["Page Blueprint Wireframes", "User Navigation Map", "Content Flow Layout"]
  },
  {
    number: "03",
    name: "Craft",
    oneLiner: "We bring your brand's unique story to life.",
    description: "We design a beautiful, high-end visual system with elegant typography, stunning layouts, and smooth animations that represent your company's absolute professionalism.",
    details: "We build your website on ultra-fast, modern technology, transforming our designs into a working experience that loads instantly on mobile and desktop. You can see and review the site as it is built.",
    deliverables: ["Tailored Visual Designs", "Fast Responsive Web Code", "Smooth Cinematic Transitions"]
  },
  {
    number: "04",
    name: "Growth",
    oneLiner: "Launching your business into a new tier.",
    description: "As your ambitious business grows and secures more clients, your website will seamlessly adapt to support your expansion.",
    details: "We continue to partner with you after launch—handling updates, improving your search engine visibility, tracking customer statistics, and ensuring your digital home stays modern and secure.",
    deliverables: ["Optimized Live Launch", "Visitor Analytics Dashboard", "Ongoing Support & Partnership"]
  }
];

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  includes: string[];
  whyItMatters: string;
  benefits: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "s1",
    number: "01",
    title: "Brand Websites & Trust Foundations",
    summary: "A stunning corporate website designed to establish instant authority, earn caller trust, and turn visitors into premium clients.",
    includes: [
      "Premium custom typography and editorial layout design",
      "Smooth cinematic video integration and visual framing",
      "Clear reading layouts that keep your potential clients engaged",
      "Strategic placement of reviews, case studies, and trust factors"
    ],
    whyItMatters: "In a world of generic web templates, a custom-crafted website is the single fastest way to look like an industry leader. It establishes instant authority and ensures your digital presence matches the elite quality of your real-world services.",
    benefits: "Instantly separates your studio from mass-produced competitors, builds immediate client trust, and helps you command higher rates for your services."
  },
  {
    id: "s2",
    number: "02",
    title: "Performance & Responsive Engineering",
    summary: "Lightning-fast page loading coded with absolute efficiency, guaranteeing a flawless responsive experience across all mobile and desktop screens.",
    includes: [
      "Ultra-fast code utilizing modern React frameworks",
      "Image or video optimizations for rapid loading",
      "Responsive layouts designed to look polished on all mobile-screen sizes",
      "Optimized button sizes and tap states for touch screen devices"
    ],
    whyItMatters: "Most clients browse on mobile devices while on the go, expecting instant answers. If your page takes too long to load, is cluttered, or displays poorly on mobile, they will immediately leave and use a competitor.",
    benefits: "Zero-lag experience, near-instant loading, and a flawless reputation for reliability on any screen."
  },
  {
    id: "s3",
    number: "03",
    title: "Technical SEO & Discoverability",
    summary: "Rigorous technical foundations engineered into your website to guarantee high rankings, organic discoverability, and long-term search engine visibility.",
    includes: [
      "Clean code structure optimized for Google crawlers",
      "Rich snippet metadata to display search details perfectly",
      "Sitemap submission and Google Search Console registration",
      "Fast loading metrics designed to boost your Google ranking"
    ],
    whyItMatters: "Even the most beautiful website is useless if no one can find it. We build SEO directly into the code from day one, instructing Google to index and display your services accurately to hot prospects.",
    benefits: "Reliable discoverability on search engines, higher rankings for valuable keywords, and a steady stream of incoming leads without buying ads."
  },
  {
    id: "s4",
    number: "04",
    title: "Client Conversion Design",
    summary: "Strategic page layouts designed end-to-end to guide prospective clients from initial curiosity to booking an inquiry or project.",
    includes: [
      "Frictionless contact pathways and easy scheduling integrations",
      "Elegant, clear call-to-action sections",
      "Visual focus sections highlighting your best work and reviews",
      "Clear pricing, service tiers, and simple onboarding cards"
    ],
    whyItMatters: "Your website is a business tool. Every layout choice—from button positions to text flow—must make it simple and compelling for your ideal client to inquire about your services, without sounding cheap.",
    benefits: "A consistent flow of high-quality incoming client inquiries, higher booking rates, and less time spent chasing leads."
  },
  {
    id: "s5",
    number: "05",
    title: "E-Commerce & Customized Checkouts",
    summary: "Direct checkout pathways for bespoke products, custom services, or made-to-order collections designed to eliminate purchasing friction.",
    includes: [
      "Beautiful, minimalist product catalogs and product details",
      "Extremely secure, instant payment gateway integrations",
      "Custom request forms for tailored orders",
      "Automated client receipt and booking notifications matching your style"
    ],
    whyItMatters: "Discerning buyers expect purchasing to feel as exclusive and elegant as a high-end physical store. Clunky shopping carts, confusing checkout forms, and messy billing screens turn premium buyers away.",
    benefits: "Higher shopping cart completion, painless checkout, and an elevated digital buying experience for your premium products."
  }
];

export default function App() {
  // Intro screen controls
  const [introActive, setIntroActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active state for detailed Case Study Modal Override
  const [activeCaseKey, setActiveCaseKey] = useState<string | null>(null);

  // Advanced Process state journey tracker
  const [activeProcessIndex, setActiveProcessIndex] = useState<number | null>(0);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // State for Mobile Work Horizontal Carousel
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  // State for Services Interactive Expandable Card
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>("s1");

  useEffect(() => {
    // Disable scrolling during intro sequence
    if (introActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Auto fade-out intro after 4.5 seconds for sleek experience
    const timer = setTimeout(() => {
      setIntroActive(false);
    }, 4500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [introActive]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 44) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent/30 selection:text-text antialiased">
      
      {/* 1. CINEMATIC DRAWING WORDMARK INTRO - WATERMARK COMPLETELY HELD OUT-OF-BOUNDS */}
      <div
        id="intro"
        className={`fixed inset-0 z-100 flex items-center justify-center bg-stone-950 overflow-hidden transition-all duration-1000 ease-in-out ${
          introActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Reframe the intro video & scale to crop watermark from the bottom of the viewport */}
          <video
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.28]"
          >
            <source src="rov-2.mp4" type="video/mp4" />
          </video>
          {/* Subtle localized dark linear gradients to eliminate white haze and blend into neighboring content */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-stone-950/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-950/90 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-stone-950/30 pointer-events-none" />
        </div>

        {/* Elegant typography branding line drawing animation */}
        <div className="relative z-10 text-center px-6">
          <div className="overflow-hidden py-4 select-none">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-[0.22em] text-[#C9A876] uppercase intro-carve-reveal">
              ROVOCHÉ
            </h1>
          </div>
          <p className="font-serif italic text-xs md:text-sm text-accent tracking-[0.25em] opacity-0 animate-[fadeInIntro_1.5s_ease-out_1.6s_forwards] uppercase mt-1 select-none">
            Built on Rock.
          </p>
        </div>
      </div>

      {/* 2. NAVIGATION BAR (SLIM, PREMIUM STYLED ACTIVE CONTRAST) */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-16 ${
          scrolled
            ? "bg-stone-950/95 backdrop-blur-md border-b border-white/5 py-4 text-stone-100"
            : "bg-transparent py-7 text-stone-50"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => smoothScroll(e, "hero")}
            className="font-serif text-lg md:text-xl font-bold tracking-[0.22em] uppercase transition-colors duration-300 hover:text-accent flex items-center space-x-1.5 md:space-x-2"
          >
            <span>ROVOCHÉ</span>
            <span className="font-serif italic font-normal text-[9px] md:text-[11px] text-[#C9A876] tracking-[0.05em] normal-case lowercase opacity-90 select-none">
              (ro-vosh)
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-12">
            <a
              href="#work"
              onClick={(e) => smoothScroll(e, "work")}
              className="text-[11px] uppercase tracking-[0.22em] text-inherit hover:text-accent transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#identity"
              onClick={(e) => smoothScroll(e, "identity")}
              className="text-[11px] uppercase tracking-[0.22em] text-inherit hover:text-accent transition-colors duration-300"
            >
              Identity
            </a>
            <a
              href="#services"
              onClick={(e) => smoothScroll(e, "services")}
              className="text-[11px] uppercase tracking-[0.22em] text-inherit hover:text-accent transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={(e) => smoothScroll(e, "process")}
              className="text-[11px] uppercase tracking-[0.22em] text-inherit hover:text-accent transition-colors duration-300"
            >
              Process
            </a>
            <a
              href="#cta"
              onClick={(e) => smoothScroll(e, "cta")}
              className="text-[10px] uppercase tracking-[0.18em] px-4 py-2 border border-accent/40 text-accent hover:bg-accent hover:text-stone-950 transition-all duration-300 rounded-sm font-medium"
            >
              Begin a Project
            </a>
          </div>

          {/* Hamburger (Mobile Toggle) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-inherit hover:text-accent transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-stone-950/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
          mobileMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-8 my-auto text-left">
          <a
            href="#work"
            onClick={(e) => smoothScroll(e, "work")}
            className="font-serif text-3xl text-stone-100 hover:text-accent transition-all duration-300"
          >
            Selected Work
          </a>
          <a
            href="#identity"
            onClick={(e) => smoothScroll(e, "identity")}
            className="font-serif text-3xl text-stone-100 hover:text-accent transition-all duration-300"
          >
            Identity
          </a>
          <a
            href="#services"
            onClick={(e) => smoothScroll(e, "services")}
            className="font-serif text-3xl text-stone-100 hover:text-accent transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#process"
            onClick={(e) => smoothScroll(e, "process")}
            className="font-serif text-3xl text-stone-100 hover:text-accent transition-all duration-300"
          >
            Our Process
          </a>
          {/* REDUCED SIZE DESIGN TO ELIMINATE CHEAP OVERSIZING */}
          <a
            href="#cta"
            onClick={(e) => smoothScroll(e, "cta")}
            className="inline-block self-start text-[10px] font-sans font-semibold uppercase tracking-[0.2em] py-2.5 px-4.5 bg-accent text-[#FAF5EC] hover:brightness-110 transition-all duration-300 rounded-sm"
          >
            Begin Project
          </a>
        </div>
        <div className="border-t border-stone-850 pt-6 text-left">
          <p className="text-stone-300 text-sm font-sans font-light">
            Built on Rock. <span className="font-serif italic font-normal text-accent text-sm tracking-normal lowercase">(ro-vosh)</span>
          </p>
          <div className="flex justify-between mt-4 text-[9px] uppercase tracking-widest text-[#6E6357]">
            <span>Premium Web Design Studio</span>
            <span>© 2026 ROVOCHÉ</span>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION - DELIBERATE WATERMARK-CROP WITHOUT DISTORTION, MAX TEXT READABILITY */}
      <section
        id="hero"
        className="relative min-h-[96vh] md:min-h-screen flex items-center justify-center bg-stone-950 overflow-hidden"
      >
        {/* Cinematic Backdrop Video Frame aligned to crop watermark off bottom edge naturally */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.28]"
          >
            <source src="rov-2.mp4" type="video/mp4" />
          </video>
          {/* Subtle localized dark linear gradients to eliminate white haze and blend into neighboring content */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-stone-950 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />
          {/* Protective premium darkening gradient overlay to ensure stellar wordmark contrast on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/65 to-stone-950/75 pointer-events-none" />
        </div>

        {/* HERO CONTENT - SLEEK AND TIGHT TO PRESERVE MAXIMUM VIDEO SPACE */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12 md:mt-16">
          <div className="p-0 bg-transparent text-center">
            
            <h1 className="font-serif font-light text-4xl sm:text-5.5xl md:text-[4rem] lg:text-[4.75rem] xl:text-[5.5rem] text-[#FAF5EC] leading-[1.08] tracking-tight [text-shadow:_0_2px_12px_rgb(0_0_0_/_65%)]">
              Websites <span className="italic text-accent font-light font-serif">built on rock.</span>
              <span className="block mt-1">Crafted to last.</span>
            </h1>

            <p className="text-stone-200 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light tracking-wide max-w-xl mx-auto mt-7 [text-shadow:_0_1px_6px_rgb(0_0_0_/_55%)]">
              Built on strategy. Designed for trust.<br className="lg:hidden" />Engineered for growth.
            </p>

            <div className="flex flex-row items-center justify-center gap-3 mt-9">
              <a
                href="#work"
                onClick={(e) => smoothScroll(e, "work")}
                className="text-[10px] font-sans uppercase tracking-[0.2em] py-3.5 px-6 bg-accent text-stone-950 hover:brightness-110 transition-all font-semibold rounded-sm shadow-md"
              >
                See Our Work
              </a>
              <a
                href="#cta"
                onClick={(e) => smoothScroll(e, "cta")}
                className="text-[10px] font-sans uppercase tracking-[0.2em] py-3.5 px-6 border border-white/30 text-white hover:bg-white/10 transition-all rounded-sm backdrop-blur-[2px]"
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES BANNER - COLOR RHYTHM: LIGHT */}
      <section id="industries" className="py-20 bg-beige border-y border-stone-300/40 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-col items-start space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C9A876]">WHO WE WORK WITH</span>
            <h2 className="font-serif font-light text-xl md:text-3xl text-text leading-tight max-w-xl">
              Architectural web design for ambitious brands and growing businesses
            </h2>
          </div>
        </div>

        <div className="w-full overflow-hidden mask-linear">
          {/* Animated endless ribbon track */}
          <div className="flex select-none whitespace-nowrap gap-12 animate-[marquee_50s_linear_infinite] w-max italic font-serif text-base md:text-2xl text-text/85">
            <span>Fashion &amp; Couture</span>
            <span className="text-accent">•</span>
            <span>Beauty &amp; Cosmetic Clinics</span>
            <span className="text-accent">•</span>
            <span>NGOs &amp; Philanthropic Organizations</span>
            <span className="text-accent">•</span>
            <span>Real Estate Landmarks</span>
            <span className="text-accent">•</span>
            <span>Artistic Photography &amp; Videography Studios</span>
            <span className="text-accent">•</span>
            <span>Premium Personal Brands</span>
            <span className="text-accent">•</span>
            <span>Elite Coaches &amp; Consultants</span>
            <span className="text-accent">•</span>
            <span>Schools &amp; Educational Institutions</span>
            <span className="text-accent">•</span>
            <span>Bespoke Professional Services</span>
            <span className="text-accent">•</span>
            <span>Hospitality Brands</span>
            <span className="text-accent">•</span>
            <span>Creative Agencies</span>
            <span className="text-accent">•</span>
            <span>Ambitious Small &amp; Medium Businesses</span>
            <span className="text-accent">•</span>
            
            {/* Duplication for perfect loop */}
            <span>Fashion &amp; Couture</span>
            <span className="text-accent">•</span>
            <span>Beauty &amp; Cosmetic Clinics</span>
            <span className="text-accent">•</span>
            <span>NGOs &amp; Philanthropic Organizations</span>
            <span className="text-accent">•</span>
            <span>Real Estate Landmarks</span>
            <span className="text-accent">•</span>
            <span>Artistic Photography &amp; Videography Studios</span>
            <span className="text-accent">•</span>
            <span>Premium Personal Brands</span>
            <span className="text-accent">•</span>
            <span>Elite Coaches &amp; Consultants</span>
            <span className="text-accent">•</span>
            <span>Schools &amp; Educational Institutions</span>
            <span className="text-accent">•</span>
            <span>Bespoke Professional Services</span>
            <span className="text-accent">•</span>
            <span>Hospitality Brands</span>
            <span className="text-accent">•</span>
            <span>Creative Agencies</span>
            <span className="text-accent">•</span>
            <span>Ambitious Small &amp; Medium Businesses</span>
            <span className="text-accent">•</span>
          </div>
        </div>
      </section>

      {/* 5. SELECTED WORK SECTION - COLOR RHYTHM: DARK (HIGH-WEIGHT OBSIDIAN THEME) */}
      <section id="work" className="py-28 md:py-36 bg-stone-950 text-stone-100 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.03] pointer-events-none bg-stone-900" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent">PROOF OF EXCELLENCE</span>
              <div className="h-[1px] w-12 bg-accent opacity-60" />
              <h2 className="font-serif font-light text-4xl md:text-6xl text-stone-50 leading-tight tracking-tight">
                Selected Work
              </h2>
            </div>
            <p className="text-stone-400 text-xs md:text-sm max-w-sm font-sans leading-relaxed">
              We construct digital landmarks for ambitious businesses. Explore each project to see how strategy, design, and performance come together.
            </p>
          </div>

          {/* Majestic, High-Weight Asymmetric Grid Layout giving projects supreme authority */}
          {/* Desktop/Tablet Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24 text-left">
            
            {/* Case 1: Bespoke Couture */}
            <div 
              onClick={() => setActiveCaseKey("couture")}
              className="group cursor-pointer flex flex-col space-y-5 transition-all duration-500 hover:translate-y-[-6px] relative"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 rounded-sm shadow-2xl border border-white/10">
                <img 
                  src="SBL-SCC.png" 
                  alt="Bespoke Couture Site Preview"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-stone-950/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                <span className="absolute top-4 left-4 bg-stone-950/90 text-accent font-mono text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm border border-white/5 shadow-md">
                  01 // BESPOKE COUTURE SITE
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-serif text-2xl text-stone-100 font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    Bespoke Couture Site
                  </h3>
                  <p className="text-stone-400 text-xs font-sans mt-2 tracking-wide font-light max-w-sm leading-relaxed">
                    A luxurious, slow-paced virtual showroom designed to isolate individual fashion garments like physical art.
                  </p>
                </div>
                <span className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-[#C9A876] font-semibold group-hover:underline mt-1.5 shrink-0">
                  <span>Explore Case</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Case 2: Makeup Artist Portfolio */}
            <div 
              onClick={() => setActiveCaseKey("beauty")}
              className="group cursor-pointer flex flex-col space-y-5 transition-all duration-500 hover:translate-y-[-6px] md:mt-12 relative"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 rounded-sm shadow-2xl border border-white/10">
                <img 
                  src="KIKI-SCC.png" 
                  alt="Makeup Artist Portfolio Preview"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-stone-950/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                <span className="absolute top-4 left-4 bg-stone-950/90 text-accent font-mono text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm border border-white/5 shadow-md">
                  02 // BEAUTY PORTFOLIO
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-serif text-2xl text-stone-100 font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    Makeup Artist Portfolio
                  </h3>
                  <p className="text-stone-400 text-xs font-sans mt-2 tracking-wide font-light max-w-sm leading-relaxed">
                    Live social media integration and unedited video layouts centered to prioritize client conversions.
                  </p>
                </div>
                <span className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-[#C9A876] font-semibold group-hover:underline mt-1.5 shrink-0">
                  <span>Explore Case</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Case 3: Youth Platform */}
            <div 
              onClick={() => setActiveCaseKey("ngo")}
              className="group cursor-pointer flex flex-col space-y-5 transition-all duration-500 hover:translate-y-[-6px] relative"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 rounded-sm shadow-2xl border border-white/10">
                <img 
                  src="TSH-SCC.png" 
                  alt="Youth Community Platform Preview"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-stone-950/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                <span className="absolute top-4 left-4 bg-stone-950/90 text-accent font-mono text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm border border-white/5 shadow-md">
                  03 // NGO / PLATFORM
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-serif text-2xl text-stone-100 font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    Youth Community Platform
                  </h3>
                  <p className="text-stone-400 text-xs font-sans mt-2 tracking-wide font-light max-w-sm leading-relaxed">
                    Information-rich platforms designed to simplify youth narrative storytelling, ensuring secure compliance.
                  </p>
                </div>
                <span className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-[#C9A876] font-semibold group-hover:underline mt-1.5 shrink-0">
                  <span>Explore Case</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Case 4: Made-to-Order Commerce */}
            <div 
              onClick={() => setActiveCaseKey("commerce")}
              className="group cursor-pointer flex flex-col space-y-5 transition-all duration-500 hover:translate-y-[-6px] md:mt-12 relative"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 rounded-sm shadow-2xl border border-white/10">
                <img 
                  src="PEASIS-SCC.png" 
                  alt="Made-to-Order Fashion Site Preview"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-stone-950/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                <span className="absolute top-4 left-4 bg-stone-950/90 text-accent font-mono text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm border border-white/5 shadow-md">
                  04 // LUXURY E-COMMERCE
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-serif text-2xl text-stone-100 font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    Made-to-Order Fashion Site
                  </h3>
                  <p className="text-stone-400 text-xs font-sans mt-2 tracking-wide font-light max-w-sm leading-relaxed">
                    Custom order pathways reframed as premium slow craft to convert discerning shoppers seamlessly.
                  </p>
                </div>
                <span className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-[#C9A876] font-semibold group-hover:underline mt-1.5 shrink-0">
                  <span>Explore Case</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

          </div>

          {/* Swipeable Carousel View Exclusively on Mobile/Small Screens */}
          <div className="block md:hidden relative mt-8">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[9px] uppercase font-semibold tracking-wider text-stone-500">Selected Portfolio</span>
              <div className="text-[9px] uppercase tracking-wider text-accent font-sans flex items-center space-x-1 select-none animate-pulse">
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span>Swipe to explore projects</span>
              </div>
            </div>
            <div className="overflow-hidden relative w-full rounded-sm border border-white/10 bg-stone-900 shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeWorkIndex * 100}%)` }}
              >
                {[
                  { key: "couture", number: "01", tag: "BESPOKE COUTURE", title: "Bespoke Couture Site", img: "SBL-SCC.png", desc: "A luxurious, slow-paced virtual showroom designed to isolate individual fashion garments like physical art." },
                  { key: "beauty", number: "02", tag: "BEAUTY PORTFOLIO", title: "Makeup Artist Portfolio", img: "KIKI-SCC.png", desc: "Live social media integration and unedited video layouts centered to prioritize client conversions." },
                  { key: "ngo", number: "03", tag: "NGO / PLATFORM", title: "Youth Community Platform", img: "TSH-SCC.png", desc: "Information-rich platforms designed to simplify youth narrative storytelling, ensuring secure compliance." },
                  { key: "commerce", number: "04", tag: "LUXURY E-COMMERCE", title: "Made-to-Order Fashion Site", img: "PEASIS-SCC.png", desc: "Custom order pathways reframed as premium slow craft to convert discerning shoppers seamlessly." }
                ].map((item, idx) => (
                  <div 
                    key={item.key} 
                    onClick={() => setActiveCaseKey(item.key)}
                    className="w-full shrink-0 p-6 flex flex-col space-y-4"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-stone-950 rounded-sm border border-white/5">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-stone-950/90 text-accent font-mono text-[8px] tracking-widest px-2 py-0.5 uppercase rounded-sm border border-white/5">
                        {item.number} // {item.tag}
                      </span>
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="font-serif text-xl text-stone-100 font-light tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 text-xs font-sans leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="pt-2 flex items-center space-x-2 text-[10px] font-sans uppercase tracking-[0.16em] text-accent font-semibold">
                        <span>Explore Case Study</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Controller */}
            <div className="flex items-center justify-between mt-6 px-1">
              <div className="flex space-x-1.5 matches-slider">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWorkIndex(idx)}
                    className={`h-1 hover:brightness-110 transition-all duration-300 ${
                      activeWorkIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-stone-700"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={() => setActiveWorkIndex((prev) => (prev > 0 ? prev - 1 : 3))}
                  className="p-2 border border-white/10 rounded-sm text-stone-400 hover:text-stone-100 hover:border-accent active:scale-95 transition-all text-sm font-sans uppercase tracking-widest flex items-center justify-center cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronRight size={14} className="rotate-180" />
                </button>
                <span className="font-mono text-[10px] text-stone-400 select-none tracking-widest">
                  0{activeWorkIndex + 1} / 04
                </span>
                <button
                  onClick={() => setActiveWorkIndex((prev) => (prev < 3 ? prev + 1 : 0))}
                  className="p-2 border border-white/10 rounded-sm text-stone-400 hover:text-stone-100 hover:border-accent active:scale-95 transition-all text-sm font-sans uppercase tracking-widest flex items-center justify-center cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/10 text-center">
            <p className="font-serif italic text-base md:text-lg text-stone-400 max-w-lg mx-auto">
              "Every digital foundation is shaped specifically around the unique business it represents."
            </p>
          </div>

        </div>
      </section>

      {/* 6. ROCK / FOUNDATION IDENTITY PORTAL - COLOR RHYTHM: LIGHT (REINTRODUCING ROVOCHÉ IDENTITY EXQUISITELY) */}
      <section id="identity" className="py-28 md:py-36 bg-bg border-b border-stone-200/40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Sophisticated, Poetic Editorial Content */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent block">
                ROVOCHÉ VALUES
              </span>
              <div className="h-[1px] w-12 bg-accent opacity-60" />
              <h2 className="font-serif font-light text-3xl md:text-5xl text-text leading-tight">
                Crafted to Last.<br />Built on Rock.
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-md font-sans font-light">
                We believe a website is your most valuable piece of digital real estate. It should build instant credibility, earn the trust of your visitors, and stand as a strong, durable foundation for your company's long-term growth. We combine timeless design principles with clear business strategy to make your brand highly visible and unforgettable.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-stone-300/40 font-sans">
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle2 size={16} className="text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base text-text">Absolute Credibility</h4>
                    <p className="text-[#6D6559] text-xs leading-relaxed mt-0.5 font-light">We replace standard templates with custom-crafted visual layouts that immediately prove your team's stature and competence to prospects.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle2 size={16} className="text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base text-text">Unwavering Trust</h4>
                    <p className="text-[#6D6559] text-xs leading-relaxed mt-0.5 font-light">Our clean typography, rapid loading speed, and structural security foster client confidence, ensuring a seamless path to booking or buying.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sophisticated Twin Art Gallery Viewports using existing ROV-1 and ROV-24 footage */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
              
              {/* Floating Museum Frame A: ROV-1.mp4 (Bottom watermarks cropped out elegantly) */}
              <div className="col-span-7 bg-stone-950 aspect-[4/5] rounded-sm shadow-xl border border-stone-300/40 overflow-hidden relative group">
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Subtle upscale and top center alignment to hide bottom deck watermarks */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.14] translate-y-[-4%]"
                  >
                    <source src="ROV-1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[#FAF5EC]/5 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-4 left-4 z-10 text-left">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-accent font-semibold block mb-0.5">FOUNDATION</span>
                  <p className="font-serif text-stone-100 text-sm italic">The Rock Elements Code</p>
                </div>
              </div>

              {/* Floating Museum Frame B: rov-24.mp4 (Bottom watermarks cropped out elegantly) */}
              <div className="col-span-5 bg-stone-950 aspect-[3/4.5] ml-2 mt-12 rounded-sm shadow-xl border border-stone-300/40 overflow-hidden relative group">
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.14] translate-y-[-4%]"
                  >
                    <source src="rov-24.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[#FAF5EC]/5 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-4 left-4 z-10 text-left">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-accent font-semibold block mb-0.5">ENDURANCE</span>
                  <p className="font-serif text-stone-100 text-sm italic">The Craft Form</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. PROCESS SECTION - COLOR RHYTHM: DARK (INTERACTIVE PROGRESSION SLABS) */}
      <section id="process" className="py-28 md:py-36 bg-stone-900 border-b border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.03] pointer-events-none bg-stone-950" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="mb-20 text-center md:text-left space-y-4">
            <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent">METHODOLOGY</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-stone-50 leading-tight">
              A Process Built in Stages
            </h2>
            <p className="text-stone-400 text-xs md:text-sm max-w-xl mt-4 leading-relaxed font-sans">
              Four structured progression checkpoints, each designed to earn the success of the next. Dive into our interactive client journey framework below.
            </p>
            
            {/* Elegant Microcopy Interaction Guidance */}
            <div className="pt-2 text-[10px] text-accent font-sans tracking-wider uppercase flex items-center space-x-2 select-none opacity-85 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Tap a stage to explore the methodology.</span>
            </div>
          </div>

          {/* Interactive Staggered Stage Selector Compass Layout */}
          {/* Desktop/Tablet Split View */}
          <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Visual Navigation Steps - Steerable Hub Column */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {PROCESS_STAGES.map((stage, idx) => (
                <button
                  key={stage.number}
                  onClick={() => setActiveProcessIndex(activeProcessIndex === idx ? null : idx)}
                  className={`w-full text-left p-6 transition-all duration-500 rounded-sm border flex items-center space-x-6 relative group ${
                    activeProcessIndex === idx
                      ? "bg-stone-950 border-accent shadow-2xl translate-x-3 text-stone-100"
                      : "bg-stone-950/40 border-white/5 hover:bg-stone-950/80 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <span className={`font-mono text-xs font-bold ${
                    activeProcessIndex === idx ? "text-accent" : "text-stone-600 group-hover:text-stone-400"
                  }`}>
                    {stage.number}
                  </span>
                  
                  <div className="flex-1">
                    <h3 className="font-serif text-lg md:text-xl font-light tracking-tight">
                      {stage.name}
                    </h3>
                    <p className="text-[10.5px] uppercase tracking-wider font-sans mt-0.5 opacity-80">
                      Stage {idx + 1}
                    </p>
                  </div>

                  <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                    activeProcessIndex === idx ? "bg-accent/15 text-accent" : "bg-white/5 text-stone-500"
                  }`}>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${
                      activeProcessIndex === idx ? "rotate-90" : "rotate-0"
                    }`} />
                  </span>
                </button>
              ))}
            </div>

            {/* Structured Stage Detail Content display Column */}
            {activeProcessIndex !== null ? (
              <div 
                key={activeProcessIndex}
                className="lg:col-span-7 bg-stone-950 p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl min-h-[440px] flex flex-col justify-between transition-all duration-300 relative overflow-hidden text-left animate-fade-in"
              >
                <div className="absolute top-0 right-0 p-8 select-none pointer-events-none">
                  <span className="font-serif italic text-white/5 text-8xl md:text-9xl font-bold leading-none">
                    {PROCESS_STAGES[activeProcessIndex].number}
                  </span>
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-widest text-accent">
                      Active Inspection
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-stone-100 font-light mt-2 leading-tight">
                    {PROCESS_STAGES[activeProcessIndex].name}
                  </h3>

                  <p className="font-serif italic text-base text-stone-300 font-light max-w-md">
                    "{PROCESS_STAGES[activeProcessIndex].oneLiner}"
                  </p>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="space-y-4 font-sans font-light text-stone-400">
                    <p className="text-xs md:text-sm leading-relaxed max-w-xl">
                      {PROCESS_STAGES[activeProcessIndex].description}
                    </p>
                    <p className="text-xs md:text-sm leading-relaxed max-w-xl">
                      {PROCESS_STAGES[activeProcessIndex].details}
                    </p>
                  </div>
                </div>

                {/* Stage Deliverables Key Tags */}
                <div className="relative z-10 pt-8 mt-8 border-t border-white/5">
                  <h4 className="text-[9.5px] font-sans font-semibold uppercase tracking-widest text-stone-500 mb-3.5">
                    Core Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {PROCESS_STAGES[activeProcessIndex].deliverables.map((item) => (
                      <span 
                        key={item}
                        className="px-3.5 py-1.5 bg-stone-900 border border-white/5 rounded-sm text-stone-300 font-sans text-xs font-light tracking-wide flex items-center space-x-2"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 bg-stone-950 p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl min-h-[440px] flex flex-col justify-center items-center transition-all duration-300 relative overflow-hidden text-center">
                <div className="space-y-4 max-w-xs">
                  <span className="text-accent/35 font-serif text-4xl block">✦</span>
                  <h3 className="font-serif text-xl text-stone-300 font-light tracking-tight">Stage Select Compass</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans font-light">
                    Select a structured process stage on the left to inspect our metrics, strategic checkpoints, and core deliverables.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Mobile/Tablet Accordion Layout */}
          <div className="block lg:hidden space-y-4 text-left">
            {PROCESS_STAGES.map((stage, idx) => {
              const isOpen = activeProcessIndex === idx;
              return (
                <div 
                  key={stage.number}
                  className="bg-stone-950 border border-white/5 rounded-sm overflow-hidden transition-all duration-300 shadow-xl"
                >
                  <button
                    onClick={() => setActiveProcessIndex(isOpen ? null : idx)}
                    className={`w-full text-left p-5 transition-all duration-300 flex items-center justify-between ${
                      isOpen ? "bg-stone-900/40 border-b border-white/5" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`font-mono text-xs font-bold ${isOpen ? "text-accent" : "text-stone-550"}`}>
                        {stage.number}
                      </span>
                      <h3 className="font-serif text-lg text-stone-100 font-light tracking-tight">
                        {stage.name}
                      </h3>
                    </div>
                    <span className={`flex items-center justify-center w-7 h-7 rounded-sm border transition-colors duration-300 ${
                      isOpen ? "text-accent bg-accent/10 border-accent" : "text-stone-500 bg-transparent border-white/5"
                    }`}>
                      <ChevronRight size={14} className={`transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`} />
                    </span>
                  </button>

                  {/* Accordion Content */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[600px] opacity-100 p-5" : "max-h-0 opacity-0"
                  }`}>
                    <div className="space-y-4 font-sans font-light text-stone-300/90">
                      <p className="font-serif italic text-sm text-accent max-w-xs">
                        "{stage.oneLiner}"
                      </p>
                      <p className="text-xs leading-relaxed">
                        {stage.description}
                      </p>
                      <p className="text-xs leading-relaxed pb-3">
                        {stage.details}
                      </p>
                    </div>
                    
                    {/* Deliverables tags */}
                    <div className="pt-4 border-t border-white/5">
                      <h4 className="text-[9px] font-sans font-semibold uppercase tracking-widest text-stone-500 mb-2.5">
                        Core Deliverables
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.deliverables.map((item) => (
                          <span 
                            key={item}
                            className="px-2.5 py-1 bg-stone-900 border border-white/5 rounded-sm text-stone-300 font-sans text-[11px] font-light tracking-wide flex items-center space-x-1.5"
                          >
                            <span className="w-1 h-1 bg-accent rounded-full" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-28 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-stone-950/70 rounded-sm border border-white/5">
            <div className="flex items-center space-x-4 text-left">
              <span className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 text-sm font-semibold select-none">
                ?
              </span>
              <div>
                <h4 className="font-serif text-base text-stone-100">Want a personalized structural layout draft?</h4>
                <p className="text-stone-400 text-xs font-sans mt-0.5">Let's sketch a tailored workflow blueprint for your custom brand.</p>
              </div>
            </div>
            <a 
              href="#cta"
              onClick={(e) => smoothScroll(e, "cta")}
              className="text-[10px] uppercase tracking-widest text-stone-950 bg-accent font-sans px-5 py-3.5 hover:brightness-110 transition-all font-semibold rounded-sm cursor-pointer whitespace-nowrap"
            >
              Consult On Design Plan
            </a>
          </div>

        </div>
      </section>

      {/* 7. SERVICES SECTION - COLOR RHYTHM: LIGHT */}
      <section id="services" className="py-24 bg-bg border-b border-stone-200/40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Sticky Sidebar Left Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6 text-left">
              <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent">SERVICES</span>
              <div className="h-[1px] w-12 bg-accent opacity-60" />
              <h2 className="font-serif font-light text-3xl md:text-5xl text-text leading-tight">
                Architectural Web Building
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                We craft each custom digital touchpoint with precise intention, structural density, and modular speed.
              </p>
              
              {/* Elegant Microcopy Interaction Guidance */}
              <div className="pt-2 text-[10px] text-accent font-sans tracking-wider uppercase flex items-center space-x-2 select-none opacity-85">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Select a service to view details.</span>
              </div>
            </div>

            {/* Interactive Expandable Cards Right Column */}
            <div className="lg:col-span-8 flex flex-col space-y-5">
              {SERVICES_DATA.map((service) => {
                const isExpanded = expandedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className={`p-6 md:p-8 bg-[#FAF5EC] border rounded-sm transition-all duration-500 cursor-pointer text-left ${
                      isExpanded 
                        ? "border-accent shadow-lg bg-[#FAF5EC]" 
                        : "border-stone-200 hover:border-accent/60 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 md:space-x-6">
                        <span className="font-mono text-xs md:text-sm text-accent font-semibold mt-1">
                          {service.number}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl md:text-2xl text-text font-light tracking-tight">
                            {service.title}
                          </h3>
                          <p className="text-muted text-xs md:text-sm leading-relaxed mt-1 font-sans font-light max-w-xl">
                            {service.summary}
                          </p>
                        </div>
                      </div>
                      
                      <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 transition-colors duration-300 ${
                        isExpanded ? "bg-accent/10 border-accent text-accent" : "text-stone-500 bg-transparent"
                      }`}>
                        <ChevronRight size={16} className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`} />
                      </span>
                    </div>

                    {/* Expanded Detailed Grid Pane */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-[800px] opacity-100 mt-6 pt-6 border-t border-stone-200/80" : "max-h-0 opacity-0"
                    }`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans font-light text-text/90">
                        
                        {/* What is Included Left Column */}
                        <div className="space-y-3.5">
                          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                            What is Included
                          </h4>
                          <ul className="space-y-2.5">
                            {service.includes.map((incl) => (
                              <li key={incl} className="text-stone-700 text-xs flex items-start space-x-2.5 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                <span>{incl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Why it Matters & Business Benefits Right Column */}
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#6E6357]">
                              Why It Matters
                            </h4>
                            <p className="text-stone-600 text-xs leading-relaxed italic">
                              {service.whyItMatters}
                            </p>
                          </div>
                          <div className="space-y-1.5 pt-2">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A876]">
                              Business Benefits
                            </h4>
                            <p className="text-stone-800 text-xs font-normal leading-relaxed">
                              {service.benefits}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & FAQ EMBED - COLOR RHYTHM: LIGHT */}
      <section id="testimonials" className="py-24 bg-panel border-b border-stone-300/40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center md:text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent">COMMENDATIONS</span>
            <div className="h-[1px] w-12 bg-accent opacity-60 md:mx-0 mx-auto" />
            <h2 className="font-serif font-light text-4xl md:text-5xl text-text leading-tight">
              Said Plainly By Trusted Clients
            </h2>
          </div>

          {/* Premium auto-scrolling slow-motion testimonial slider/marquee */}
          <div className="mt-8">
            <TestimonialSlider />
          </div>

          {/* Elegant FAQ Layout */}
          <div className="mt-28 max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] uppercase font-semibold tracking-[0.28em] text-accent">RESOURCES</span>
              <h3 className="font-serif font-light text-2xl md:text-3xl text-text">Frequently Asked Questions</h3>
            </div>

            <div className="divide-y divide-stone-300/60 border-t border-b border-stone-300/60 font-sans text-left">
              
              {[
                {
                  q: "How long does a creative project take?",
                  a: "Most premium projects span between three to five weeks from structural inception to launch, depending on complexity. We establish a transparent modular schedule following discovery."
                },
                {
                  q: "Do I need ready structural content beforehand?",
                  a: "No. A basic direction of your model is entirely sufficient. We map and design your copy outlines, structure rules, and asset logic together during our initial stages."
                },
                {
                  q: "Can we redesign a running application?",
                  a: "Yes. We start by auditing your current content, isolating what works structurally, and designing modern, lightweight upgrades that preserve your established organic authority."
                },
                {
                  q: "What technical support follows the launch?",
                  a: "We stay close following launch to walk you through backend tasks, verify accessibility compliance, configure metrics, and plan modular platform iterations."
                }
              ].map((faq, fIdx) => (
                <div key={faq.q} className="py-5">
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <h4 className="font-serif text-base text-text group-hover:text-accent font-medium leading-normal transition-colors">
                      {faq.q}
                    </h4>
                    <span className="ml-4 text-accent shrink-0 font-light text-xl select-none">
                      {openFaqIndex === fIdx ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFaqIndex === fIdx ? "max-h-[220px] opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* 9. BEGIN TO BUILD SECTION - COLOR RHYTHM: DARK (CINEMATIC CLIMAX, EXCLUSIVELY ROV-rock.mp4) */}
      <section id="cta" className="relative min-h-[80vh] flex items-center justify-center bg-stone-950 overflow-hidden">
        {/* Cinematic Backdrop Video Frame strictly featuring ROV-rock.mp4 upscaled to crop bottom logo watermark */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.14] translate-y-[-4%]"
          >
            <source src="ROV-rock.mp4" type="video/mp4" />
          </video>
          {/* Subtle natural gradients blending layout boundaries together cleanly */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-panel via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />
          {/* Transparent contrast shadow allowing texture and amber detail to stand out dramatically */}
          <div className="absolute inset-0 bg-stone-950/25 pointer-events-none" />
        </div>

        {/* Dynamic conversion CTA Card - free flowing container */}
        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <div className="px-6 py-12 md:p-14">
            <span className="text-[10px] uppercase font-bold tracking-[0.28em] text-accent block mb-4 select-none">
              BUILT ON ROCK
            </span>
            <h2 className="font-serif font-light text-2xl sm:text-3.5xl text-[#FAF5EC] leading-tight">
              Begin with a <em className="italic text-accent font-serif font-normal">strong foundation.</em>
            </h2>
            <p className="text-stone-100 text-xs md:text-sm mt-4 leading-relaxed max-w-md mx-auto font-sans font-light">
              Let's construct a deliberate digital platform prepared to represent. Start a prompt inquiry with us today.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href="mailto:studio@rovoche.com"
                className="w-full sm:w-auto inline-block text-center text-xs font-sans uppercase tracking-[0.2em] py-4 px-8 bg-accent text-stone-950 hover:brightness-115 active:scale-95 transition-all font-semibold rounded-sm shadow-lg cursor-pointer"
              >
                Begin Your Project
              </a>
              <a
                href="mailto:studio@rovoche.com"
                className="text-stone-300 hover:text-accent font-sans text-xs tracking-wider underline underline-offset-4 decoration-stone-550 transition-colors mt-2"
              >
                studio@rovoche.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER - COLOR RHYTHM: DARK (ABSOLUTE MINIMAL INTENTION, VIDEOS AND WATERMARKS REMOVED) */}
      <footer className="bg-stone-950 border-t border-white/5 py-16 px-6 md:px-16 text-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h3 className="font-serif text-[#C9A876] text-lg tracking-[0.16em] uppercase font-semibold">ROVOCHÉ</h3>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-sans font-light">
              Premium Web Design Studio
            </p>
          </div>
          <div className="text-center md:text-right space-y-2 font-sans font-light text-xs text-stone-400">
            <p>Built on Rock. <span className="font-serif italic font-normal text-accent text-sm tracking-normal lowercase">(ro-vosh)</span></p>
            <p className="text-[10px] tracking-widest text-[#6E6357] uppercase mt-1">© 2026 ROVOCHÉ · ALL RIGHTS SECURED</p>
          </div>
        </div>
      </footer>

      {/* 11. PREMIUM MODAL CASE STUDY OVERLAY PANEL */}
      <div
        className={`fixed inset-0 z-101 flex bg-stone-950/50 backdrop-blur-sm transition-all duration-500 ease-in-out ${
          activeCaseKey ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setActiveCaseKey(null)}
      >
        <div
          className={`ml-auto w-full max-w-4xl h-full bg-bg shadow-2xl flex flex-col overflow-y-auto transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeCaseKey ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Controls */}
          <div className="sticky top-0 right-0 w-full flex justify-between items-center px-6 py-4 bg-[#FAF5EC]/90 backdrop-blur-md border-b border-stone-200/60 z-10">
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] text-accent uppercase">
              CASE ARCHIVE // PROJECT STUDY
            </span>
            <button
              onClick={() => setActiveCaseKey(null)}
              className="p-2 text-text hover:text-accent border border-stone-200/60 hover:border-accent rounded-full transition-all duration-300 bg-[#FAF5EC]"
              aria-label="Close Case Study"
            >
              <X size={16} />
            </button>
          </div>

          {activeCaseKey && (
            <div className="flex-1">
              {/* Grand Banner Image Header */}
              <div className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-stone-900 border-b border-stone-200/40">
                <img
                  src={CASE_STUDIES[activeCaseKey].img}
                  alt={CASE_STUDIES[activeCaseKey].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-[#FAF5EC]/10 to-[#FAF5EC]/30" />
                <div className="absolute bottom-6 left-6 md:left-12 max-w-2xl text-left">
                  <span className="inline-block bg-accent text-[#FAF5EC] font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase rounded-sm mb-2 shadow-sm font-semibold">
                    {CASE_STUDIES[activeCaseKey].id} // {CASE_STUDIES[activeCaseKey].tag}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-text font-light tracking-tight leading-none animate-fade-in">
                    {CASE_STUDIES[activeCaseKey].title}
                  </h2>
                </div>
              </div>

              {/* Case Narrative Grid */}
              <div className="px-6 py-12 md:px-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans font-light text-left">
                
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-10">
                  
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent block">
                      THE INITIAL BRIEF
                    </span>
                    <p className="text-stone-800 text-sm md:text-base leading-relaxed">
                      {CASE_STUDIES[activeCaseKey].brief}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent block">
                      CRAFT STRATEGY &amp; DESIGN RATIONALE
                    </span>
                    <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
                      {CASE_STUDIES[activeCaseKey].rationale}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent block">
                      WHY THIS DIGITAL FOUNDATION SUCCEEDS
                    </span>
                    <ul className="space-y-3.5 pl-1">
                      {CASE_STUDIES[activeCaseKey].why.map((point) => (
                        <li key={point} className="text-stone-700 text-xs md:text-sm flex items-start space-x-3 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Technical Meta Column */}
                <div className="lg:col-span-4 space-y-8 border-t lg:border-t-0 pt-8 lg:pt-0 border-stone-200">
                  
                  <div className="border-b border-stone-200 pb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-3">
                      Brand Palette
                    </span>
                    <div className="flex gap-2">
                      {CASE_STUDIES[activeCaseKey].palette.map((color) => (
                        <div key={color} className="flex flex-col items-center space-y-1">
                          <div
                            className="w-9 h-9 rounded-sm border border-stone-300 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[9px] font-mono select-all text-muted uppercase font-semibold">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-stone-200 pb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-2">
                      TYPOGRAPHY RULESET
                    </span>
                    <p className="text-text font-serif text-sm font-light leading-relaxed">
                      {CASE_STUDIES[activeCaseKey].type}
                    </p>
                  </div>

                  <div className="border-b border-stone-200 pb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-2">
                      SIGNATURE VALUE DETAIL
                    </span>
                    <p className="text-text text-xs leading-relaxed font-normal italic">
                      {CASE_STUDIES[activeCaseKey].signature}
                    </p>
                  </div>

                  <a
                    href={CASE_STUDIES[activeCaseKey].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2.5 py-4 px-6 bg-accent text-stone-950 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all rounded-sm shadow-md"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </a>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

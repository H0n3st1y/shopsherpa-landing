// components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-sherpa {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(46,98,115,0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(46,98,115,0.07) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Plain, no-gradient text using the heading font */
  .cinematic-heading {
    font-family: var(--font-heading, "Barlow Semi Condensed", system-ui, sans-serif);
    color: #1C1A18;
    letter-spacing: -0.02em;
    line-height: 1.0;
  }

  .cinematic-heading-muted {
    font-family: var(--font-heading, "Barlow Semi Condensed", system-ui, sans-serif);
    color: #2e6273;
    letter-spacing: -0.02em;
    line-height: 1.0;
  }

  .cinematic-serif {
    font-family: var(--font-serif, "Lora", Georgia, serif);
  }

  .card-heading-plain {
    font-family: var(--font-heading, "Barlow Semi Condensed", system-ui, sans-serif);
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1.0;
  }

  /* Deep card — teal dark, no blue */
  .premium-depth-card-sherpa {
    background: linear-gradient(145deg, #0d2b35 0%, #061419 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(46,98,115,0.25),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(46,98,115,0.1);
    position: relative;
  }

  .card-sheen-sherpa {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(46,98,115,0.06) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow:
      -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
    background: rgba(255,255,255,0.03);
    box-shadow:
      0 8px 16px rgba(0,0,0,0.25),
      inset 0 1px 1px rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .floating-ui-badge {
    background: rgba(13, 31, 45, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(46,98,115,0.2),
      0 20px 40px -8px rgba(0,0,0,0.7),
      inset 0 1px 0 rgba(255,255,255,0.06);
  }

  /* CTA buttons */
  .btn-sherpa-light {
    background: #ffffff;
    color: #1C1A18;
    border: 1px solid rgba(28,26,24,0.12);
    box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 20px -4px rgba(0,0,0,0.12);
    transition: all 0.25s ease;
    font-family: var(--font-sans, "Barlow", system-ui, sans-serif);
    font-weight: 500;
  }
  .btn-sherpa-light:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 16px 32px -8px rgba(0,0,0,0.18);
  }
  .btn-sherpa-light:active { transform: translateY(0); }

  .btn-sherpa-teal {
    background: #2e6273;
    color: #ffffff;
    border: 1px solid rgba(46,98,115,0.5);
    box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 8px 20px -4px rgba(0,0,0,0.3);
    transition: all 0.25s ease;
    font-family: var(--font-sans, "Barlow", system-ui, sans-serif);
    font-weight: 500;
  }
  .btn-sherpa-teal:hover {
    transform: translateY(-2px);
    background: #3d7a8a;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 16px 32px -8px rgba(0,0,0,0.4);
  }
  .btn-sherpa-teal:active { transform: translateY(0); }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "Catch the scam,",
  tagline2 = "before you pay.",
  cardHeading = "Your shield online.",
  cardDescription = (
    <>
      <span className="font-semibold text-white">ShopSherpa</span> sits quietly in the background while you shop. It reads your inbox so you don&apos;t fall for fake tracking emails. It checks the seller before you check out. And it keeps your real card number off the internet entirely.
    </>
  ),
  ctaHeading = "Shop safe, always.",
  ctaDescription = "One pre-order. Lifetime protection. No subscriptions, no tracking, no nonsense.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.9, filter: "blur(12px)" });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.92, filter: "blur(20px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.6, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-sherpa"], { scale: 1.1, filter: "blur(16px)", opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 180, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .fromTo(".floating-badge", { y: 80, autoAlpha: 0, scale: 0.85 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.2)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.92, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#FAF8F4]", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-sherpa absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* Hero text — plain, no gradient */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 will-change-transform">
        <h1 className="text-track gsap-reveal cinematic-heading text-5xl md:text-7xl lg:text-[6rem] font-semibold mb-1">
          {tagline1}
        </h1>
        <div className="text-days gsap-reveal cinematic-heading-muted text-5xl md:text-7xl lg:text-[6rem] font-semibold" aria-hidden="false">
          {tagline2}
        </div>
      </div>

      {/* CTA — appears at the end of the scroll sequence */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 gsap-reveal pointer-events-auto will-change-transform">
        <p className="text-xs uppercase tracking-[0.18em] text-[#2e6273]/70 mb-5 font-mono">ShopSherpa</p>
        <h2 className="cinematic-heading text-[#1C1A18] text-4xl md:text-6xl lg:text-7xl font-semibold mb-5">
          {ctaHeading}
        </h2>
        <p className="cinematic-serif text-[#1C1A18]/60 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/#cta" className="btn-sherpa-light flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm">
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Pre-order — $9.99
          </a>
          <a href="/#cta" className="btn-sherpa-teal flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm">
            Join the waitlist
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main dark card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card-sherpa relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen-sherpa" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Brand — top mobile / right desktop */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <div className="text-center lg:text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1d9e75]/60 font-mono mb-2">ShopSherpa</p>
                <h2 className="card-heading-plain text-5xl md:text-[5rem] lg:text-[6.5rem] font-semibold">
                  Shop<br />Sherpa
                </h2>
              </div>
            </div>

            {/* iPhone mockup — center */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse" style={{ boxShadow: "0 0 6px rgba(29,158,117,0.7)" }} />
                    </div>

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      {/* App header */}
                      <div className="phone-widget flex justify-between items-center mb-6">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-0.5">ShopSherpa</p>
                          <p className="text-base font-semibold text-white">Shield active</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1d9e75]/15 border border-[#1d9e75]/20">
                          <span className="size-1.5 rounded-full bg-[#1d9e75]" />
                          <span className="text-[10px] font-mono text-[#1d9e75]">On</span>
                        </div>
                      </div>

                      {/* Ring */}
                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-6">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(46,98,115,0.1)" strokeWidth="10" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#1d9e75" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10">
                          <p className="text-[9px] text-white/30 uppercase tracking-widest font-mono mb-1">Today</p>
                          <p className="text-4xl font-bold tracking-tight text-white">0</p>
                          <p className="text-[9px] text-[#2e6273]/60 uppercase tracking-widest font-mono mt-1">threats caught</p>
                        </div>
                      </div>

                      {/* Alert rows */}
                      <div className="space-y-2.5">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-400/15">
                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-1.5 w-20 bg-white/15 rounded-full mb-1.5" />
                            <div className="h-1.5 w-14 bg-white/8 rounded-full" />
                          </div>
                          <span className="text-[9px] font-mono text-red-400/70 shrink-0">blocked</span>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1d9e75]/10 flex items-center justify-center shrink-0 border border-[#1d9e75]/15">
                            <svg className="w-4 h-4 text-[#1d9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-1.5 w-24 bg-white/15 rounded-full mb-1.5" />
                            <div className="h-1.5 w-16 bg-white/8 rounded-full" />
                          </div>
                          <span className="text-[9px] font-mono text-[#1d9e75]/70 shrink-0">masked</span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-white/15 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating badges — no emojis */}
                <div className="floating-badge absolute top-6 lg:top-12 left-[-10px] lg:left-[-90px] floating-ui-badge rounded-2xl px-4 py-3 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0 border border-red-400/20">
                    <svg className="size-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Phishing blocked</p>
                    <p className="text-white/40 text-[10px] font-mono mt-0.5">Fake Amazon email</p>
                  </div>
                </div>

                <div className="floating-badge absolute bottom-12 lg:bottom-20 right-[-10px] lg:right-[-90px] floating-ui-badge rounded-2xl px-4 py-3 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-xl bg-[#1d9e75]/15 flex items-center justify-center shrink-0 border border-[#1d9e75]/20">
                    <svg className="size-4 text-[#1d9e75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Card masked</p>
                    <p className="text-white/40 text-[10px] font-mono mt-0.5">Real number never shared</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description — bottom mobile / left desktop */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="card-heading-plain text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 lg:mb-5">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-white/50 text-sm lg:text-base leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-serif, 'Lora', Georgia, serif)" }}>
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

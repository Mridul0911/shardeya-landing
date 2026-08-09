"use client";

import dynamic from "next/dynamic";
import CanvasBoundary from "@/components/canvas-boundary";
import { useMagnetic } from "@/hooks/use-magnetic";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
});

export default function Hero() {
  const {
    ref: magneticRef,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagnetic<HTMLAnchorElement>();

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[720px] w-full items-end overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0">
        <CanvasBoundary>
          <HeroScene />
        </CanvasBoundary>
      </div>

      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_20%_100%,rgba(199,161,89,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_10%,rgba(46,90,76,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 sm:px-10 sm:pb-24">
        <p
          className="mb-5 font-data text-xs uppercase tracking-[0.28em] text-brass-soft opacity-0"
          style={{ animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}
        >
          Shardeya — Real Estate Operating System
        </p>

        <h1
          className="max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-normal leading-[1.02] tracking-[-0.01em] text-bone opacity-0"
          style={{ animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s forwards" }}
        >
          Real estate,
          <br />
          <span className="italic text-brass-soft">reimagined.</span>
        </h1>

        <p
          className="mt-7 max-w-[46ch] text-lg leading-relaxed text-bone/70 opacity-0 sm:text-xl"
          style={{ animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.54s forwards" }}
        >
          One intelligent platform to manage projects, properties, clients,
          payments, documents, brokers, and enquiries — all in one place.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4 opacity-0"
          style={{ animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.66s forwards" }}
        >
          <a
            ref={magneticRef}
            onMouseMove={onMagneticMove}
            onMouseLeave={onMagneticLeave}
            href="#contact"
            className="rounded-full bg-brass px-7 py-3.5 text-sm font-medium text-obsidian transition-all duration-200 ease-out hover:bg-brass-soft"
          >
            Get Started
          </a>
          <a
            href="#contact"
            className="rounded-full border border-bone/25 px-7 py-3.5 text-sm text-bone transition-colors duration-300 hover:border-bone/60"
          >
            Book a Demo
          </a>
          <a
            href="#platform"
            className="group flex items-center gap-2 px-2 py-3.5 text-sm text-bone/70 transition-colors hover:text-bone"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 transition-colors group-hover:border-bone/60">
              ▸
            </span>
            Watch Product Tour
          </a>
        </div>
      </div>

      <div
        className="absolute right-6 bottom-8 z-10 hidden flex-col items-center gap-3 opacity-0 sm:right-10 sm:flex"
        style={{ animation: "fade-up 1s ease-out 1.6s forwards" }}
      >
        <span className="font-data text-[10px] uppercase tracking-[0.28em] text-bone/45">
          Scroll
        </span>
        <span className="h-12 w-px animate-pulse bg-gradient-to-b from-brass-soft to-transparent" />
      </div>
    </section>
  );
}

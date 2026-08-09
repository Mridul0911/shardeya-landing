"use client";

import { useInView } from "@/hooks/use-in-view";
import { useMagnetic } from "@/hooks/use-magnetic";

export default function FinalCta() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const {
    ref: magneticRef,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagnetic<HTMLAnchorElement>();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-obsidian py-32 text-bone sm:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(199,161,89,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,89,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 55%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 55%, black, transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(199,161,89,0.22),transparent_65%)]" />

      <div
        ref={ref}
        data-reveal={inView}
        className="relative mx-auto max-w-[900px] px-6 text-center sm:px-10"
      >
        <p className="mb-6 font-data text-xs uppercase tracking-[0.28em] text-brass-soft">
          Shardeya
        </p>
        <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] tracking-[-0.01em]">
          Build the future of real estate.
        </h2>
        <p className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-bone/65 sm:text-xl">
          Everything your real estate business needs, in one intelligent
          platform.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            ref={magneticRef}
            onMouseMove={onMagneticMove}
            onMouseLeave={onMagneticLeave}
            href="#top"
            className="rounded-full bg-brass px-8 py-3.5 text-sm font-medium text-obsidian transition-all duration-200 ease-out hover:bg-brass-soft"
          >
            Start Free
          </a>
          <a
            href="#top"
            className="rounded-full border border-bone/25 px-8 py-3.5 text-sm text-bone transition-colors duration-300 hover:border-bone/60"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

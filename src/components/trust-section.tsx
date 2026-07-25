"use client";

import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";

const metrics = [
  { target: 180, suffix: "+", label: "Projects onboarded" },
  { target: 420, prefix: "₹", suffix: "Cr+", label: "Payments tracked" },
  { target: 12000, suffix: "+", label: "Documents stored" },
  { target: 97, suffix: "%", label: "Client satisfaction" },
];

const testimonials = [
  {
    quote:
      "We used to reconcile installments by hand every Friday. Now it just shows us who's overdue.",
    name: "Founder, mid-size developer",
    place: "Nagpur",
  },
  {
    quote:
      "My brokers stopped calling me for unit status. They just check the app.",
    name: "Sales Head",
    place: "Colony project, Indore",
  },
];

const markers = [
  "RERA-ready record-keeping",
  "Bank-grade data security",
  "Built for Tier 2 & Tier 3 teams",
];

function Metric({
  target,
  prefix,
  suffix,
  label,
  inView,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  inView: boolean;
}) {
  const value = useCountUp(target, inView);
  return (
    <div className="flex-1 border-l border-bone/12 pl-6 first:border-l-0 first:pl-0">
      <div className="font-data text-[clamp(1.8rem,3.4vw,2.6rem)] text-bone">
        {prefix}
        {value.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-bone/50">{label}</div>
    </div>
  );
}

export default function TrustSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="trust"
      ref={ref}
      className="relative overflow-hidden bg-obsidian py-24 text-bone sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[56ch]">
          <p className="mb-5 font-data text-xs uppercase tracking-[0.28em] text-brass-soft">
            Built on real operations
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.01em]">
            Teams running real projects trust it with real money.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-y border-bone/10 py-10 sm:flex-row sm:gap-10">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} inView={inView} />
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {testimonials.map((t) => (
            <div key={t.name}>
              <p className="font-display text-2xl italic leading-snug text-bone sm:text-[1.7rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 font-data text-xs uppercase tracking-[0.15em] text-bone/45">
                {t.name} — {t.place}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-bone/10 pt-10">
          {markers.map((m) => (
            <span
              key={m}
              className="font-data text-[11px] uppercase tracking-[0.15em] text-bone/40"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

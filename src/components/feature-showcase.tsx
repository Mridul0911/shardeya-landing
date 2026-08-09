"use client";

import { useInView } from "@/hooks/use-in-view";
import clsx from "clsx";
import type { ReactNode } from "react";

function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  return (
    <div ref={ref} className={className} data-reveal={inView}>
      {children}
    </div>
  );
}

function Block({
  id,
  eyebrow,
  title,
  copy,
  dark,
  reverse,
  visual,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  dark: boolean;
  reverse?: boolean;
  visual: ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "relative overflow-hidden py-24 sm:py-32",
        dark ? "bg-obsidian text-bone" : "bg-bone text-obsidian"
      )}
    >
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(199,161,89,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,89,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 90% at 75% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 90% at 75% 50%, black, transparent)",
          }}
        />
      )}
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div
          className={clsx(
            "grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <Reveal className="max-w-[46ch]">
            <p
              className={clsx(
                "mb-5 font-data text-xs uppercase tracking-[0.28em]",
                dark ? "text-brass-soft" : "text-verdigris"
              )}
            >
              {eyebrow}
            </p>
            <h3 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.1] tracking-[-0.01em]">
              {title}
            </h3>
            <p
              className={clsx(
                "mt-5 text-base leading-relaxed sm:text-lg",
                dark ? "text-bone/65" : "text-obsidian/65"
              )}
            >
              {copy}
            </p>
          </Reveal>

          <Reveal>{visual}</Reveal>
        </div>
      </div>
    </section>
  );
}

function GlassPanel({
  dark,
  className,
  children,
}: {
  dark: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-6 backdrop-blur-sm sm:p-8",
        dark
          ? "border-bone/10 bg-graphite/60"
          : "border-obsidian/10 bg-white/70",
        className
      )}
    >
      {children}
    </div>
  );
}

function ProjectsUnitsVisual() {
  const units = [
    "sold",
    "available",
    "available",
    "reserved",
    "available",
    "sold",
    "available",
    "available",
    "reserved",
    "available",
    "sold",
    "available",
  ] as const;

  return (
    <GlassPanel dark>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 font-data text-[11px] uppercase tracking-[0.2em] text-brass-soft">
            Colony Project
          </div>
          <div className="font-display text-xl text-bone">
            Meadow Ridge Villas
          </div>
          <div className="mt-1 text-sm text-bone/50">
            ₹85L – ₹2.1Cr · 42 units
          </div>
        </div>
        <span className="whitespace-nowrap rounded-full border border-brass/40 bg-brass/10 px-3 py-1 text-xs text-brass-soft">
          Under Construction
        </span>
      </div>

      <div className="h-28 w-full rounded-lg bg-gradient-to-br from-brass/25 via-verdigris/20 to-obsidian" />

      <div className="mt-6 grid grid-cols-6 gap-2">
        {units.map((status, i) => (
          <div key={i} className="group relative">
            <div
              className={clsx(
                "aspect-square rounded-[4px] transition-transform duration-300 group-hover:scale-110",
                status === "available" && "bg-bone/15",
                status === "reserved" && "bg-brass",
                status === "sold" && "bg-verdigris-soft"
              )}
            />
            {status === "reserved" && i === 3 && (
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded-md border border-bone/10 bg-graphite-2 px-2.5 py-1.5 text-[11px] text-bone opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100">
                Reserved · Rakesh Broker
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-5 font-data text-[11px] text-bone/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-bone/15" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-brass" /> Reserved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-verdigris-soft" /> Sold
        </span>
      </div>
    </GlassPanel>
  );
}

function PaymentsDocsVisual() {
  const installments = [
    "paid",
    "paid",
    "paid",
    "overdue",
    "upcoming",
    "upcoming",
  ] as const;

  return (
    <GlassPanel dark={false}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-36 w-36 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              className="text-obsidian/10"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              className="text-brass-deep"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - 0.68)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl text-obsidian">68%</span>
            <span className="text-[11px] text-obsidian/50">collected</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-3 flex items-baseline justify-between font-data text-sm">
            <span className="text-obsidian/70">₹68,00,000 of ₹1,00,00,000</span>
            <span className="text-brass-deep">Plot A-12</span>
          </div>
          <div className="flex items-center gap-2">
            {installments.map((s, i) => (
              <span
                key={i}
                className={clsx(
                  "h-2.5 w-2.5 rounded-full",
                  s === "paid" && "bg-brass-deep",
                  s === "overdue" && "ring-2 ring-[#b23c2f]",
                  s === "upcoming" && "bg-obsidian/15"
                )}
              />
            ))}
          </div>
          <div className="mt-2 text-[13px] text-[#b23c2f]">
            1 installment overdue — due 04 Jun
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {["Sale Deed", "RERA", "Registry"].map((doc, i) => (
          <div
            key={doc}
            className="flex-1 rounded-lg border border-obsidian/10 bg-white px-3 py-3 text-center text-[12px] text-obsidian/70 shadow-sm"
            style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
          >
            {doc}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function LeadsVisual() {
  const stages = [
    "New",
    "Contacted",
    "Site Visit",
    "Negotiation",
    "Booked",
    "Sold",
  ];

  return (
    <GlassPanel dark>
      <div className="mb-2 font-data text-[11px] uppercase tracking-[0.2em] text-brass-soft">
        Lead Pipeline
      </div>
      <div className="mt-5 flex items-center justify-between gap-1">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={clsx(
                "h-1.5 w-full rounded-full",
                i <= 3 ? "bg-brass" : "bg-bone/12"
              )}
            />
            <span
              className={clsx(
                "text-center text-[10px] leading-tight",
                i === 3 ? "text-brass-soft" : "text-bone/45"
              )}
            >
              {stage}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-brass/30 bg-brass/[0.08] p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-base text-bone">
            Ananya Shah
          </span>
          <span className="rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] text-brass-soft">
            Negotiation
          </span>
        </div>
        <div className="mt-1 text-[13px] text-bone/50">
          Interested — Plot B-07 · 3BHK
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-bone/[0.04] px-3.5 py-2.5 text-[12px] text-bone/55">
        <span className="text-verdigris-soft">●</span>
        WhatsApp follow-up sent · 2h ago
      </div>
    </GlassPanel>
  );
}

function AnalyticsTeamVisual() {
  const bars = [40, 65, 50, 82, 60, 95, 70];
  const team = [
    { role: "Admin", init: "A" },
    { role: "Sales", init: "S" },
    { role: "Accountant", init: "Ac" },
    { role: "Broker", init: "B" },
  ];

  return (
    <GlassPanel dark={false}>
      <div className="mb-1 font-data text-[11px] uppercase tracking-[0.2em] text-verdigris">
        Business Overview
      </div>
      <div className="mt-6 flex h-28 items-end gap-2.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brass-deep to-brass"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-data text-[10px] text-obsidian/40">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-obsidian/10 pt-6">
        {team.map((member) => (
          <div key={member.role} className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 bg-obsidian font-data text-xs text-bone">
              {member.init}
            </div>
            <span className="text-[11px] text-obsidian/55">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default function FeatureShowcase() {
  return (
    <div id="platform">
      <Block
        id="projects"
        dark
        eyebrow="Project & Unit Management"
        title="Every project, plot to penthouse, structured the same way."
        copy="Colonies, apartments, villas, farmhouses, commercial — set up once with images, location, pricing and documents. Units update live: available, reserved, sold, each with the detail that matters attached automatically."
        visual={<ProjectsUnitsVisual />}
      />
      <Block
        id="payments"
        dark={false}
        reverse
        eyebrow="Installments & Documents"
        title="Money and paperwork, finally in sync."
        copy="Every installment tracked against every unit, with overdue payments surfaced before they become a problem. Sale deeds, RERA filings, registries and agreements live next to the deal they belong to."
        visual={<PaymentsDocsVisual />}
      />
      <Block
        id="leads"
        dark
        eyebrow="Lead CRM & Follow-ups"
        title="Every enquiry followed through, not followed up on a sticky note."
        copy="Leads move through the pipeline you actually use — new, contacted, site visit, negotiation, booked, sold. Follow-up reminders go out on WhatsApp and by call, on schedule, without anyone having to remember."
        visual={<LeadsVisual />}
      />
      <Block
        id="analytics"
        dark={false}
        reverse
        eyebrow="Analytics & Collaboration"
        title="The whole business, visible to the whole team."
        copy="Sales, collections, inventory and lead conversion in one view. Admins, sales staff, accountants and brokers each see exactly what their role needs — nothing more, nothing hidden."
        visual={<AnalyticsTeamVisual />}
      />
    </div>
  );
}

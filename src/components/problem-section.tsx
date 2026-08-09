"use client";

import { useInView } from "@/hooks/use-in-view";
import clsx from "clsx";

type ChaosCard = {
  className: string;
  rot: number;
  delay: number;
  content: React.ReactNode;
};

const cards: ChaosCard[] = [
  {
    className: "left-[2%] top-[2%] w-[230px] sm:w-[250px]",
    rot: -6,
    delay: 0,
    content: (
      <div className="rounded-lg border border-black/10 bg-[#e7f5ea] p-3 font-sans text-[13px] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        <div className="mb-2 text-[11px] font-medium text-[#2f6146]">
          Rakesh Broker
        </div>
        <div className="mb-1.5 ml-auto w-fit max-w-[85%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-2.5 py-1.5 text-[#1c3a1c]">
          Plot 14 still available sir?
        </div>
        <div className="mb-1.5 w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 text-[#1c1c1c]">
          Yes, 2 left. Payment kab tak?
        </div>
        <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-2.5 py-1.5 text-[#1c3a1c]">
          Client will confirm Monday 🙏
        </div>
      </div>
    ),
  },
  {
    className: "left-[27%] top-[16%] w-[240px] sm:w-[260px]",
    rot: 4,
    delay: 0.12,
    content: (
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white font-data text-[11px] text-[#333] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-4 bg-[#e8e8e8] px-2 py-1.5 font-medium">
          <span>Client</span>
          <span>Plot</span>
          <span>Due</span>
          <span>Status</span>
        </div>
        <div className="grid grid-cols-4 border-t border-black/5 px-2 py-1.5">
          <span>Verma</span>
          <span>A-12</span>
          <span>04/06</span>
          <span className="text-[#b23c2f]">Overdue</span>
        </div>
        <div className="grid grid-cols-4 border-t border-black/5 px-2 py-1.5">
          <span>Iyer</span>
          <span>C-03</span>
          <span>18/06</span>
          <span className="text-[#3a7d3f]">Paid</span>
        </div>
        <div className="grid grid-cols-4 border-t border-black/5 bg-[#fdeceb] px-2 py-1.5">
          <span>Shah</span>
          <span>B-07</span>
          <span>02/06</span>
          <span className="text-[#b23c2f]">Overdue</span>
        </div>
      </div>
    ),
  },
  {
    className: "right-[2%] top-[0%] w-[200px] sm:w-[215px]",
    rot: -3,
    delay: 0.24,
    content: (
      <div className="rounded-sm bg-[#fbe98a] p-4 font-display text-[15px] italic leading-snug text-[#3a2f0a] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        Call Mrs. Verma re: Plot A-12 — 3rd reminder, still no reply
      </div>
    ),
  },
  {
    className: "left-[6%] top-[54%] w-[250px] sm:w-[270px]",
    rot: 3,
    delay: 0.36,
    content: (
      <div className="rounded-sm border border-black/10 bg-[#f2ede0] p-4 font-display text-[13px] leading-relaxed text-[#3a352a] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        <div className="mb-2 text-center text-[11px] uppercase tracking-[0.2em] text-[#3a352a]/70">
          Agreement to Sell
        </div>
        <p className="text-[12px]">
          This agreement is made between the Seller and the Purchaser for
          Plot No. ______, admeasuring ______ sq. ft&hellip;
        </p>
        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-wide text-[#3a352a]/60">
          <span>Seller sign ___</span>
          <span>Buyer sign ___</span>
        </div>
      </div>
    ),
  },
  {
    className: "right-[16%] top-[58%] w-[210px] sm:w-[225px]",
    rot: 6,
    delay: 0.48,
    content: (
      <div className="rounded-lg border border-black/10 bg-white p-3.5 font-sans text-[13px] text-[#2b2b2b] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        <div className="mb-1 flex items-center gap-1.5 text-[#b23c2f]">
          <span className="text-base leading-none">✆</span>
          <span className="font-medium">14 missed calls</span>
        </div>
        <div className="text-[11px] text-[#2b2b2b]/60">
          Enquiry — Colony Phase 2
        </div>
      </div>
    ),
  },
  {
    className: "left-[38%] top-[62%] w-[235px] sm:w-[250px]",
    rot: -4,
    delay: 0.6,
    content: (
      <div className="rounded-lg border border-black/10 bg-white font-sans text-[12px] text-[#2b2b2b] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)]">
        <div className="border-b border-black/5 bg-[#f5f5f5] px-3 py-1.5 text-[11px] text-[#666]">
          📁 Downloads
        </div>
        <div className="flex flex-col gap-1.5 px-3 py-2.5 text-[#333]">
          <span>IMG_2847.jpg</span>
          <span>Agreement_FINAL_v3.pdf</span>
          <span className="text-[#b23c2f]">
            Agreement_FINAL_v3_ACTUAL.pdf
          </span>
          <span className="text-[#999]">Untitled(2).xlsx</span>
        </div>
      </div>
    ),
  },
];

export default function ProblemSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      id="problem"
      ref={ref}
      className="relative overflow-hidden bg-bone py-28 text-obsidian sm:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[60ch]">
          <p className="mb-5 font-data text-xs uppercase tracking-[0.28em] text-verdigris">
            The way it is now
          </p>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]">
            Real estate runs on WhatsApp, Excel, and memory.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-obsidian/65">
            Enquiries get lost in chat threads. Payment status lives in
            someone&rsquo;s head. Agreements sit in a drawer until someone
            needs them and can&rsquo;t find them. It works, until it
            doesn&rsquo;t.
          </p>
        </div>

        <div
          className={clsx(
            "relative mt-16 hidden h-[480px] md:block",
            "before:pointer-events-none"
          )}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={clsx("absolute", card.className)}
              data-chaos-card={inView}
              style={{ "--delay": `${card.delay}s` } as React.CSSProperties}
            >
              <div style={{ transform: `rotate(${card.rot}deg)` }}>
                {card.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {cards.map((card, i) => (
            <div key={i} className="[&>div]:shadow-none">
              {card.content}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-6 border-t border-obsidian/10 pt-10">
          <span className="font-display text-2xl italic text-brass-deep">
            Until now.
          </span>
          <span className="h-px flex-1 bg-obsidian/10" />
        </div>
      </div>
    </section>
  );
}

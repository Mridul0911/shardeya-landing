import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';
import { collections, funnel, leadSources } from '../mockups/data';

export function Insights() {
  const { t } = useLanguage();
  return (
    <section id="insights" className="py-24 sm:py-32">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow={t.insights.eyebrow} title={t.insights.title} />
          <Reveal delay={80}>
            <p className="lead lg:pb-1">{t.insights.sub}</p>
          </Reveal>
        </div>

        <Reveal delay={60} className="mt-12">
          <dl className="grid divide-y divide-ivory-400 border-y border-ivory-400 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {t.insights.highlights.map((h) => (
              <div key={h.label} className="py-6 sm:px-8 sm:first:pl-0">
                <dd className="num font-display text-[2.4rem] font-medium leading-none tracking-tight text-ink-900">{h.value}</dd>
                <dt className="mt-2 text-sm text-ink-600">{h.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-xl bg-ivory-300 shadow-lift ring-1 ring-ivory-300 lg:grid-cols-[1.4fr_1fr]">
            <CollectionsChart />
            <div className="grid gap-px bg-ivory-300">
              <LeadSources />
              <Funnel />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CollectionsChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = 120;
  const ticks = [0, 40, 80, 120];
  const last = collections.length - 1;
  const shown = hover ?? last;

  return (
    <figure className="flex flex-col bg-white p-6">
      <figcaption className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-ink-900">Collections</p>
          <p className="text-xs text-ink-500">₹ lakh per month · Apr–Sep</p>
        </div>
        <div className="text-right">
          <p className="num font-display text-2xl font-medium text-ink-900">₹{collections[shown].v} L</p>
          <p className="text-xs text-ink-500">{collections[shown].m} 2026</p>
        </div>
      </figcaption>

      <div className="relative mt-6 min-h-56 flex-1 pl-8">
        {/* gridlines */}
        <div className="absolute inset-x-0 bottom-6 top-0" aria-hidden="true">
          {ticks.map((tk) => (
            <div
              key={tk}
              className="absolute inset-x-0 flex translate-y-1/2 items-center"
              style={{ bottom: `${(tk / max) * 86}%` }}
            >
              <span className="num w-7 text-right text-[10px] text-ink-400">{tk}</span>
              <span className={`ml-1.5 h-px flex-1 ${tk === 0 ? 'bg-ink-300' : 'bg-ivory-300'}`} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-9 right-0 flex items-end gap-3 pb-6 sm:gap-5">
          {collections.map((c, i) => {
            const active = i === shown;
            return (
              <button
                key={c.m}
                type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${c.m}: ₹${c.v} lakh`}
                className="relative flex h-full flex-1 flex-col items-center justify-end"
              >
                <span
                  className={`w-full max-w-[44px] rounded-t transition-colors duration-200 ${active ? 'bg-emerald-600' : 'bg-emerald-200'}`}
                  style={{ height: `${(c.v / max) * 86}%` }}
                />
                <span className={`absolute -bottom-6 text-[11px] ${active ? 'font-bold text-ink-900' : 'text-ink-500'}`}>{c.m}</span>
              </button>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

function LeadSources() {
  const max = Math.max(...leadSources.map((s) => s.v));
  return (
    <figure className="bg-white p-6">
      <figcaption>
        <p className="text-sm font-bold text-ink-900">Leads by source</p>
        <p className="text-xs text-ink-500">Share of 412 enquiries · September</p>
      </figcaption>
      <ul className="mt-5 space-y-3">
        {leadSources.map((s) => (
          <li key={s.label} className="group grid grid-cols-[8.5rem_1fr_2.25rem] items-center gap-3 text-xs">
            <span className="truncate text-ink-700">{s.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-ivory-200">
              <span
                className="block h-full rounded-full bg-emerald-500 transition-colors group-hover:bg-emerald-700"
                style={{ width: `${(s.v / max) * 100}%` }}
              />
            </span>
            <span className="num text-right font-semibold text-ink-900">{s.v}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Funnel() {
  const top = funnel[0].v;
  return (
    <figure className="bg-white p-6">
      <figcaption>
        <p className="text-sm font-bold text-ink-900">Enquiry to booking</p>
        <p className="text-xs text-ink-500">September · all projects</p>
      </figcaption>
      <ol className="mt-5 grid grid-cols-4 gap-2">
        {funnel.map((f, i) => (
          <li key={f.label}>
            <div className="flex h-16 items-end">
              <span
                className={`w-full rounded-t ${i === funnel.length - 1 ? 'bg-ink-800' : 'bg-ink-300'}`}
                style={{ height: `${Math.max(8, (f.v / top) * 100)}%` }}
              />
            </div>
            <p className="num mt-2 text-sm font-bold text-ink-900">{f.v}</p>
            <p className="text-[11px] leading-tight text-ink-500">{f.label}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

import { Building2, CalendarRange, FileText, Layers } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppWindow, Pill, Reveal, SectionHeading } from '../ui/primitives';

const icons = [Layers, CalendarRange, Building2, FileText];

const projects = [
  { name: 'Aravali Greens · Phase II', type: 'Plotted colony', city: 'Jaipur', total: 220, sold: 142, booked: 31, hold: 9, collected: 68 },
  { name: 'Aravali Greens · Phase I', type: 'Plotted colony', city: 'Jaipur', total: 180, sold: 176, booked: 4, hold: 0, collected: 94 },
  { name: 'Shree Residency', type: 'Apartments · 2 towers', city: 'Ajmer', total: 96, sold: 38, booked: 12, hold: 5, collected: 41 },
  { name: 'Market Square', type: 'Commercial shops', city: 'Jaipur', total: 48, sold: 11, booked: 6, hold: 2, collected: 22 },
];

const milestones = [
  { label: 'Booking amount', pct: 10, state: 'done' },
  { label: 'Agreement (within 30 days)', pct: 20, state: 'done' },
  { label: 'Boundary wall & roads', pct: 25, state: 'done' },
  { label: 'Electricity & water lines', pct: 25, state: 'current' },
  { label: 'Possession & registry', pct: 20, state: 'todo' },
];

export function Builders() {
  const { t } = useLanguage();
  return (
    <section id="builders" className="border-y border-ivory-300 bg-ivory-50 py-24 sm:py-32">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow={t.builders.eyebrow} title={t.builders.title} />
          <Reveal delay={80}>
            <p className="lead lg:pb-1">{t.builders.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <Reveal delay={60}>
            <AppWindow url="app.shardeya.in/projects">
              <div className="bg-ivory-100 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-ink-900">All projects</p>
                  <div className="flex gap-3 text-[10.5px] text-ink-500">
                    <Legend cls="bg-ink-700" label="Sold" />
                    <Legend cls="bg-sky-500" label="Booked" />
                    <Legend cls="bg-gold-400" label="Hold" />
                    <Legend cls="bg-ivory-400" label="Open" />
                  </div>
                </div>
                <div className="mt-3 divide-y divide-ivory-300 overflow-hidden rounded-md bg-white shadow-hairline">
                  {projects.map((p) => {
                    const open = p.total - p.sold - p.booked - p.hold;
                    const seg = (n: number) => `${(n / p.total) * 100}%`;
                    return (
                      <div key={p.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 p-3.5 sm:grid-cols-[1.2fr_1.3fr_auto]">
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-ink-900">{p.name}</p>
                          <p className="text-[10.5px] text-ink-500">
                            {p.type} · {p.city}
                          </p>
                        </div>
                        <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                          <div className="flex h-2 gap-[2px] overflow-hidden rounded-full">
                            <span className="rounded-l-full bg-ink-700" style={{ width: seg(p.sold) }} />
                            <span className="bg-sky-500" style={{ width: seg(p.booked) }} />
                            {p.hold > 0 && <span className="bg-gold-400" style={{ width: seg(p.hold) }} />}
                            {open > 0 && <span className="rounded-r-full bg-ivory-400" style={{ width: seg(open) }} />}
                          </div>
                          <p className="num mt-1 text-[10px] text-ink-500">
                            {p.sold + p.booked} of {p.total} units sold or booked · {open} open
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="num text-[12px] font-bold text-ink-900">{p.collected}%</p>
                          <p className="text-[10px] text-ink-500">collected</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-md bg-white p-4 shadow-hairline">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[12px] font-bold text-ink-900">Construction-linked payment plan</p>
                      <p className="text-[10.5px] text-ink-500">Applied to 173 bookings in Phase II</p>
                    </div>
                    <Pill className="bg-emerald-50 text-emerald-700 ring-emerald-200">Reminders on</Pill>
                  </div>
                  <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                    {milestones.map((m, i) => (
                      <li key={m.label} className="flex gap-2.5 sm:block">
                        <div
                          className={`h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full sm:h-1 sm:w-full sm:translate-y-0 ${
                            m.state === 'done' ? 'bg-emerald-500' : m.state === 'current' ? 'bg-gold-400' : 'bg-ivory-400'
                          }`}
                        />
                        <div className="sm:mt-2">
                          <p className="num text-[11px] font-bold text-ink-900">
                            {m.pct}% <span className="font-normal text-ink-400">· Stage {i + 1}</span>
                          </p>
                          <p className="text-[10.5px] leading-snug text-ink-500">{m.label}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </AppWindow>
          </Reveal>

          <ul className="grid content-center gap-8">
            {t.builders.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 70} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-900 text-gold-300">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink-900">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="hidden items-center gap-1 sm:flex">
      <span className={`h-2 w-2 rounded-sm ${cls}`} /> {label}
    </span>
  );
}

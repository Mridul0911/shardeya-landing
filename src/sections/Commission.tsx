import { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';
import { payouts } from '../mockups/data';
import { inr, inrShort } from '../lib/format';

const MIN = 1_000_000;
const MAX = 20_000_000;

const payoutTone = {
  Paid: 'text-emerald-300',
  Approved: 'text-gold-200',
  Pending: 'text-ink-300',
};

export function Commission() {
  const { t } = useLanguage();
  const [sale, setSale] = useState(3_700_000);
  const [slab, setSlab] = useState(1);
  const [gstRegistered, setGstRegistered] = useState(true);

  const rate = t.commission.slabs[slab].rate;
  const commission = (sale * rate) / 100;
  const gst = gstRegistered ? commission * 0.18 : 0;
  const tds = commission * 0.02;
  const net = commission + gst - tds;
  const pct = ((sale - MIN) / (MAX - MIN)) * 100;

  return (
    <section id="commissions" className="relative overflow-hidden bg-ink-900 py-24 text-ivory-100 sm:py-32">
      <div className="absolute inset-0 bg-plot-grid-dark [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading eyebrow={t.commission.eyebrow} title={t.commission.title} sub={t.commission.sub} tone="light" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Calculator */}
          <Reveal delay={60}>
            <div className="rounded-xl bg-ivory-50 text-ink-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-ivory-300 px-6 py-4">
                <h3 className="font-bold">{t.commission.calcTitle}</h3>
                <span className="num text-xs font-semibold text-ink-500">{rate}%</span>
              </div>

              <div className="space-y-7 p-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="sale-value" className="text-sm font-semibold text-ink-700">
                      {t.commission.saleValue}
                    </label>
                    <output htmlFor="sale-value" className="num font-display text-2xl font-medium">
                      {inrShort(sale)}
                    </output>
                  </div>
                  <input
                    id="sale-value"
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={50_000}
                    value={sale}
                    onChange={(e) => setSale(Number(e.target.value))}
                    className="range mt-4 w-full"
                    style={{ '--pct': `${pct}%` } as React.CSSProperties}
                  />
                  <div className="mt-1.5 flex justify-between text-[11px] text-ink-400">
                    <span>₹10 L</span>
                    <span>₹2 Cr</span>
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-ink-700">{t.commission.slab}</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {t.commission.slabs.map((s, i) => {
                      const active = i === slab;
                      return (
                        <button
                          key={s.name}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSlab(i)}
                          className={`rounded-md px-3 py-2.5 text-left transition-all duration-200 ${
                            active
                              ? 'bg-ink-900 text-ivory-100 shadow-lift'
                              : 'bg-white text-ink-800 ring-1 ring-inset ring-ivory-400 hover:ring-ink-300'
                          }`}
                        >
                          <span className="block text-[13px] font-bold">
                            {s.name} <span className={`num font-semibold ${active ? 'text-gold-300' : 'text-emerald-600'}`}>{s.rate}%</span>
                          </span>
                          <span className={`block text-[11px] ${active ? 'text-ink-300' : 'text-ink-500'}`}>{s.rule}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-ink-700">{t.commission.gstToggle}</span>
                  <span className="relative inline-flex">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={gstRegistered}
                      onChange={(e) => setGstRegistered(e.target.checked)}
                    />
                    <span className="h-6 w-11 rounded-full bg-ivory-400 transition-colors peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2" />
                    <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform peer-checked:translate-x-5" />
                  </span>
                </label>
              </div>

              <dl className="num space-y-2.5 border-t border-dashed border-ivory-400 bg-ivory-100 px-6 py-5 text-sm" aria-live="polite">
                <Line label={`${t.commission.commission} (${rate}%)`} value={inr(commission)} />
                <Line label={t.commission.gst} value={gstRegistered ? `+ ${inr(gst)}` : '—'} muted={!gstRegistered} />
                <Line label={t.commission.tds} value={`− ${inr(tds)}`} />
                <div className="flex items-baseline justify-between border-t border-ivory-400 pt-3">
                  <dt className="font-bold text-ink-900">{t.commission.net}</dt>
                  <dd className="font-display text-[1.75rem] font-medium tracking-tight text-emerald-700">{inr(net)}</dd>
                </div>
              </dl>
              <p className="rounded-b-xl bg-ivory-100 px-6 pb-5 text-[11.5px] text-ink-500">{t.commission.note}</p>
            </div>
          </Reveal>

          {/* Points + payouts */}
          <div className="flex flex-col gap-10">
            <ul className="space-y-4">
              {t.commission.points.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 70} className="flex items-start gap-3 text-[1.0625rem] text-ivory-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {p}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <div className="flex items-center justify-between bg-white/[0.04] px-5 py-3.5">
                  <h3 className="text-sm font-bold text-ivory-100">{t.commission.ledgerTitle}</h3>
                  <span className="text-xs text-ink-400">Phase II · Sep</span>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead className="sr-only">
                    <tr>
                      <th>Broker</th>
                      <th>Plot</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07]">
                    {payouts.map((p) => (
                      <tr key={p.broker} className="transition-colors hover:bg-white/[0.03]">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-ivory-100">{p.broker}</p>
                          <p className="text-xs text-ink-400">Plot {p.plot}</p>
                        </td>
                        <td className="num py-3.5 text-right font-semibold text-ivory-100">{inr(p.amount)}</td>
                        <td className={`py-3.5 pl-4 pr-5 text-right text-xs font-semibold ${payoutTone[p.status]}`}>{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-600">{label}</dt>
      <dd className={`font-semibold ${muted ? 'text-ink-400' : 'text-ink-900'}`}>{value}</dd>
    </div>
  );
}

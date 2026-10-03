import { Check, Headphones, Minus, ShieldCheck, Smile, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';

type Mark = 'yes' | 'partial' | 'no';
const pillarIcons = [Smile, ShieldCheck, Headphones];

export function Why() {
  const { t } = useLanguage();
  const legend = t.why.legend;

  const Cell = ({ v, highlight }: { v: Mark; highlight?: boolean }) => (
    <span className="relative flex justify-center">
      {v === 'yes' ? (
        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${highlight ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
          <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
        </span>
      ) : v === 'partial' ? (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-50 text-gold-500">
          <Minus className="h-3.5 w-3.5" strokeWidth={2.75} />
        </span>
      ) : (
        <span className="flex h-6 w-6 items-center justify-center text-ink-300">
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      )}
      <span className="sr-only">{legend[v]}</span>
    </span>
  );

  return (
    <section className="border-y border-ivory-300 bg-ivory-50 py-24 sm:py-32" aria-label={t.why.eyebrow}>
      <div className="container-site">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} align="center" />

        <Reveal delay={80} className="mx-auto mt-14 max-w-4xl">
          <div className="relative">
            <table className="w-full table-fixed border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="w-[40%] pb-4 sm:w-[44%]" />
                  {t.why.cols.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-1 pb-4 pt-4 text-center text-[11px] font-bold leading-tight sm:px-2 sm:text-[13px] ${
                        i === 2 ? 'rounded-t-lg bg-ink-900 text-ivory-50' : 'text-ink-600'
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.why.rows.map((r, ri) => {
                  const lastRow = ri === t.why.rows.length - 1;
                  return (
                    <tr key={r.label} className="group">
                      <th scope="row" className="border-t border-ivory-300 py-4 pr-3 text-[13px] font-semibold leading-snug text-ink-800 sm:pr-4 sm:text-[15px]">
                        {r.label}
                      </th>
                      {(r.v as Mark[]).map((v, i) => (
                        <td
                          key={i}
                          className={`border-t px-2 py-4 ${
                            i === 2
                              ? `border-emerald-100 bg-emerald-50/70 ${lastRow ? 'rounded-b-lg' : ''}`
                              : 'border-ivory-300'
                          }`}
                        >
                          <Cell v={v} highlight={i === 2} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-ink-500" aria-hidden="true">
            <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-600" strokeWidth={3} /> {legend.yes}</span>
            <span className="flex items-center gap-1.5"><Minus className="h-3 w-3 text-gold-500" strokeWidth={3} /> {legend.partial}</span>
            <span className="flex items-center gap-1.5"><X className="h-3 w-3 text-ink-300" strokeWidth={3} /> {legend.no}</span>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.why.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <Reveal key={p.title} delay={i * 80} className="border-t-2 border-ink-900 pt-6">
                <Icon className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-ink-900">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{p.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

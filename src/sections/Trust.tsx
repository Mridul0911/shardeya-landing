import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from '../ui/primitives';

// Placeholder customer wordmarks — replace with real customer logos (with permission).
const marks = [
  { name: 'SHUBH LAXMI', sub: 'DEVELOPERS', cls: 'font-sans font-extrabold tracking-[0.18em] text-[13px]', shape: 'tri' },
  { name: 'Godavari Greens', cls: 'font-display italic text-[19px]', shape: 'leaf' },
  { name: 'Singh Realty', cls: 'font-sans font-bold text-[17px] tracking-tight', shape: 'sq' },
  { name: 'NARMADA VIHAR', cls: 'font-display font-semibold tracking-[0.12em] text-[14px]', shape: 'arc' },
  { name: 'Pink City Estates', cls: 'font-sans font-medium text-[16px]', shape: 'dia' },
  { name: 'Aravali Infra', cls: 'font-display text-[18px]', shape: 'mtn' },
] as const;

function Mark({ shape }: { shape: (typeof marks)[number]['shape'] }) {
  const common = { width: 18, height: 18, viewBox: '0 0 20 20', 'aria-hidden': true } as const;
  switch (shape) {
    case 'tri':
      return <svg {...common}><path d="M10 3l7 13H3z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    case 'leaf':
      return <svg {...common}><path d="M4 16C4 8 9 4 16 4c0 7-4 12-12 12z" fill="currentColor" opacity=".85" /></svg>;
    case 'sq':
      return <svg {...common}><rect x="3" y="3" width="14" height="14" rx="2" fill="currentColor" /><rect x="7" y="7" width="6" height="6" fill="#0F1C2B" /></svg>;
    case 'arc':
      return <svg {...common}><path d="M2 15a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M6 15a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    case 'dia':
      return <svg {...common}><path d="M10 2l8 8-8 8-8-8z" fill="currentColor" /></svg>;
    case 'mtn':
      return <svg {...common}><path d="M1 16l6-9 4 5 3-3 5 7z" fill="currentColor" /></svg>;
  }
}

export function Trust() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-ink-900 pb-20 text-ivory-100 sm:pb-24" aria-label="Customers">
      <div className="absolute inset-0 bg-plot-grid-dark" aria-hidden="true" />
      <div className="container-site relative">
        <Reveal>
          <p className="mx-auto max-w-xl text-center text-sm font-medium text-ink-300">{t.trust.title}</p>
          <ul className="mt-9 grid grid-cols-2 items-center gap-x-6 gap-y-8 text-ivory-200/70 sm:grid-cols-3 lg:flex lg:justify-between">
            {marks.map((m) => (
              <li key={m.name} className="flex items-center justify-center gap-2 transition-colors hover:text-ivory-100">
                <Mark shape={m.shape} />
                <span className={`whitespace-nowrap leading-none ${m.cls}`}>
                  {m.name}
                  {'sub' in m && <span className="ml-1 hidden text-[9px] font-semibold tracking-[0.2em] opacity-70 sm:inline">{m.sub}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-16 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
            {t.trust.stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-white/10 px-2 pt-8 sm:px-6 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
                  i === 2 ? 'lg:border-l' : ''
                }`}
              >
                <dd className="num whitespace-nowrap font-display text-[1.7rem] font-medium tracking-tight text-ivory-50 sm:text-[2.5rem]">{s.value}</dd>
                <dt className="mt-1 text-sm text-ink-300">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

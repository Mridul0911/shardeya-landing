import { ArrowRight, Check, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button, Reveal } from '../ui/primitives';
import { site } from '../config/site';

export function FinalCta({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-emerald-900 py-24 text-ivory-100 sm:py-28">
      <div className="absolute inset-0 bg-plot-grid-dark [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" aria-hidden="true" />
      {/* Plot outline motif */}
      <svg
        className="absolute -right-10 top-1/2 hidden h-[420px] -translate-y-1/2 text-white/[0.06] lg:block"
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 4 }).map((__, c) => (
            <rect key={`${r}-${c}`} x={10 + c * 72} y={10 + r * 72} width="62" height="62" rx="4" stroke="currentColor" strokeWidth="1.5" />
          )),
        )}
        <rect x="154" y="82" width="62" height="62" rx="4" fill="#C29A4C" fillOpacity="0.35" />
      </svg>

      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[2.3rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[3.2rem]">{t.cta.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-emerald-100/80">{t.cta.sub}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="light" onClick={onOpenDemo}>
              {t.cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline-light" href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" />
              {t.cta.secondary}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-100/80">
            {t.cta.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-gold-300" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

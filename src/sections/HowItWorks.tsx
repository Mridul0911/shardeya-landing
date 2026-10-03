import { CalendarCheck, Handshake, IndianRupee, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';

const icons = [LayoutGrid, CalendarCheck, IndianRupee, Handshake];

export function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section className="border-y border-ivory-300 bg-ivory-50 py-24 sm:py-28" aria-label={t.how.eyebrow}>
      <div className="container-site">
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} align="center" />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* connecting rule */}
          <span
            className="absolute left-[22px] top-0 h-full w-px bg-ivory-400 md:left-0 md:right-0 md:top-[22px] md:h-px md:w-full"
            aria-hidden="true"
          />
          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={step.title} delay={i * 90} className="relative grid grid-cols-[44px_1fr] gap-5 md:block">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory-50 text-emerald-600 ring-1 ring-ivory-400">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="md:mt-6 md:pr-4">
                  <p className="num text-xs font-semibold uppercase tracking-[0.14em] text-gold-500">
                    Step 0{i + 1}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

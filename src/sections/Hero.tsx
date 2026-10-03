import { ArrowRight, Check, CheckCheck, IndianRupee, Handshake } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button, Initials } from '../ui/primitives';
import { HeroDashboard } from '../mockups/HeroDashboard';
import { ScaledFrame } from '../mockups/AppShell';

export function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Quiet site-plan texture that fades out */}
      <div
        className="pointer-events-none absolute inset-0 bg-plot-grid [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-700 shadow-hairline">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[2.6rem] font-medium leading-[1.05] tracking-[-0.022em] text-ink-900 [animation-delay:60ms] sm:text-[3.6rem] lg:text-[4.25rem]"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t.hero.titleA} <span className="text-emerald-600">{t.hero.titleB}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[40rem] animate-fade-up text-[1.0625rem] leading-relaxed text-ink-600 [animation-delay:120ms] sm:text-lg">
            {t.hero.sub}
          </p>

          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:flex-row">
            <Button size="lg" onClick={onOpenDemo} className="w-full sm:w-auto">
              {t.hero.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="secondary" href="#product" className="w-full sm:w-auto">
              {t.hero.secondary}
            </Button>
          </div>

          <div className="mt-9 flex animate-fade-up flex-col items-center gap-4 [animation-delay:240ms]">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['Rajendra Agarwal', 'Priya Deshmukh', 'Harpreet Singh', 'Anil Kushwaha'].map((n, i) => (
                  <Initials
                    key={n}
                    name={n}
                    className={`h-8 w-8 text-[11px] ring-2 ring-ivory-100 ${
                      ['bg-emerald-100 text-emerald-800', 'bg-gold-100 text-gold-600', 'bg-sky-50 text-sky-600', 'bg-ivory-300 text-ink-700'][i]
                    }`}
                  />
                ))}
              </div>
              <p className="text-left text-sm font-semibold text-ink-700">{t.hero.trustLine}</p>
            </div>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-ink-600">
              {t.hero.points.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product shot sitting across the ivory → navy seam */}
      <div className="relative mt-14 sm:mt-16">
        <div className="absolute inset-x-0 bottom-0 top-[42%] bg-ink-900" aria-hidden="true">
          <div className="absolute inset-0 bg-plot-grid-dark" />
        </div>
        <div className="container-site relative">
          <div className="relative mx-auto max-w-[1120px] animate-scale-in [animation-delay:200ms]">
            <ScaledFrame designWidth={1120} minScale={0.62} className="rounded-xl ring-1 ring-white/10">
              <HeroDashboard />
            </ScaledFrame>

            <FloatCard
              className="-right-6 top-[18%] hidden lg:flex xl:-right-14"
              icon={<IndianRupee className="h-4 w-4" strokeWidth={2.25} />}
              iconClass="bg-emerald-600 text-white"
              title="Payment received · ₹4,50,000"
              sub="Sunita Meena · Plot A-03 · via UPI"
              meta={<span className="flex items-center gap-1 text-emerald-600"><CheckCheck className="h-3 w-3" /> Receipt sent on WhatsApp</span>}
              delay={700}
            />
            <FloatCard
              className="-left-6 bottom-[22%] hidden lg:flex xl:-left-16"
              icon={<Handshake className="h-4 w-4" strokeWidth={2} />}
              iconClass="bg-gold-100 text-gold-600"
              title="Plot B-06 booked"
              sub="Om Sai Properties · Partner slab 2%"
              meta={<span className="text-ink-500">Commission ₹66,800 · auto-calculated</span>}
              delay={950}
            />
          </div>
        </div>
        <div className="h-14 sm:h-20" aria-hidden="true" />
      </div>
    </section>
  );
}

function FloatCard({
  className,
  icon,
  iconClass,
  title,
  sub,
  meta,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  sub: string;
  meta: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      className={`absolute z-10 w-[280px] animate-fade-up items-start gap-3 rounded-lg bg-white p-3.5 shadow-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${iconClass}`}>{icon}</span>
      <div className="min-w-0 text-[12px]">
        <p className="font-bold text-ink-900">{title}</p>
        <p className="mt-0.5 text-ink-500">{sub}</p>
        <p className="mt-1.5 text-[11px] font-medium">{meta}</p>
      </div>
    </div>
  );
}

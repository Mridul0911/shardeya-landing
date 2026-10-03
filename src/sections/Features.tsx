import {
  BadgePercent,
  BarChart3,
  CalendarClock,
  Handshake,
  IndianRupee,
  Map,
  Share2,
  Users,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';

const icons = [Map, Users, CalendarClock, Share2, Handshake, IndianRupee, BadgePercent, BarChart3];

export function Features() {
  const { t } = useLanguage();
  return (
    <section className="py-24 sm:py-32" aria-label={t.features.eyebrow}>
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow={t.features.eyebrow} title={t.features.title} />
          <Reveal delay={80}>
            <p className="lead lg:pb-1">{t.features.sub}</p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-14">
          <ul className="grid gap-px overflow-hidden rounded-xl bg-ivory-400/70 ring-1 ring-ivory-400/70 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.items.map((f, i) => {
              const Icon = icons[i];
              return (
                <li key={f.title} className="group relative flex gap-4 bg-ivory-100 p-5 transition-colors duration-300 hover:bg-white sm:block sm:p-7">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-ink-700 shadow-hairline transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-bold tracking-tight text-ink-900 sm:mt-6">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600 sm:mt-2">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

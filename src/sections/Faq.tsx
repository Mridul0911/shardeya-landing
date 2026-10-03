import { useState } from 'react';
import { Mail, Plus } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';
import { site } from '../config/site';

export function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <Reveal delay={80} className="mt-6">
            <p className="text-ink-600">{t.faq.sub}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition-colors hover:decoration-emerald-600"
            >
              <Mail className="h-4 w-4" />
              {t.faq.contact} · {site.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <ul className="border-t border-ivory-400">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-ivory-400">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-bold text-ink-900 transition-colors hover:text-emerald-700"
                    >
                      {item.q}
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ${
                          isOpen ? 'rotate-45 bg-ink-900 text-white ring-ink-900' : 'text-ink-600 ring-ivory-400'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink-600">{item.a}</p>
                    </div>
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

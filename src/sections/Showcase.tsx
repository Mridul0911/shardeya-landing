import { useRef, useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppWindow, Reveal, SectionHeading } from '../ui/primitives';
import { FollowUpsScreen, LeadsScreen, ListingsScreen, PaymentsScreen, PlotsScreen } from '../mockups/ShowcaseScreens';

const screens = {
  plots: { el: PlotsScreen, url: 'app.shardeya.in/projects/aravali-greens/layout' },
  leads: { el: LeadsScreen, url: 'app.shardeya.in/leads' },
  followups: { el: FollowUpsScreen, url: 'app.shardeya.in/follow-ups' },
  payments: { el: PaymentsScreen, url: 'app.shardeya.in/payments' },
  listings: { el: ListingsScreen, url: 'app.shardeya.in/listings' },
} as const;

type TabId = keyof typeof screens;

export function Showcase() {
  const { t } = useLanguage();
  const [active, setActive] = useState<TabId>('plots');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = t.showcase.tabs as { id: TabId; label: string; text: string }[];
  const activeTab = tabs.find((x) => x.id === active)!;
  const Screen = screens[active].el;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="product" className="border-y border-ivory-300 bg-ivory-200 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading eyebrow={t.showcase.eyebrow} title={t.showcase.title} sub={t.showcase.sub} align="center" />

        <Reveal delay={80} className="mt-12">
          <div
            role="tablist"
            aria-label={t.showcase.eyebrow}
            className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg bg-ivory-300/60 p-1 scrollbar-none"
          >
            {tabs.map((tab, i) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="showcase-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    selected ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <p key={active} className="mx-auto mt-5 max-w-xl animate-fade-in text-center text-[15px] text-ink-600">
            {activeTab.text}
          </p>

          <div className="relative mx-auto mt-8 max-w-[1080px]">
            <span className="absolute -top-3 right-4 z-10 hidden items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-ivory-100 shadow-float sm:flex">
              <MousePointerClick className="h-3.5 w-3.5 text-gold-300" />
              {t.showcase.hint}
            </span>
            <div role="tabpanel" id="showcase-panel" aria-labelledby={`tab-${active}`}>
              <AppWindow url={screens[active].url}>
                <div key={active} className="animate-fade-in">
                  <Screen />
                </div>
              </AppWindow>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

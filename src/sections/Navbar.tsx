import { useEffect, useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button, Logo } from '../ui/primitives';

export function Navbar({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { t, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const links = [
    { href: '#product', label: t.nav.product },
    { href: '#builders', label: t.nav.builders },
    { href: '#brokers', label: t.nav.brokers },
    { href: '#commissions', label: t.nav.commissions },
    { href: '#insights', label: t.nav.insights },
    { href: '#faq', label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = ['product', 'builders', 'brokers', 'commissions', 'insights', 'faq'];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open ? 'bg-ivory-100/90 shadow-inset-line backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center gap-6">
        <a href="#top" aria-label="Shardeya home" className="shrink-0">
          <Logo />
        </a>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = activeId === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-emerald-600 transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.nav.switchLabel}
            className="flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ivory-200 hover:text-ink-900"
          >
            <Languages className="h-4 w-4" strokeWidth={1.75} />
            {t.nav.switchTo}
          </button>
          <Button onClick={onOpenDemo} className="hidden sm:inline-flex">
            {t.nav.demo}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-800 hover:bg-ivory-200 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] animate-fade-in border-t border-ivory-300 bg-ivory-100 lg:hidden">
          <nav className="container-site flex flex-col py-4" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ivory-300 py-4 font-display text-xl text-ink-900"
              >
                {l.label}
              </a>
            ))}
            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                setOpen(false);
                onOpenDemo();
              }}
            >
              {t.nav.demo}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

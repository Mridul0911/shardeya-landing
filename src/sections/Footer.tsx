import { useLanguage } from '../i18n/LanguageContext';
import { Logo } from '../ui/primitives';
import { site } from '../config/site';

export function Footer({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { t } = useLanguage();
  const l = t.footer.links;

  const cols: { title: string; links: { label: string; href?: string; onClick?: () => void }[] }[] = [
    {
      title: t.footer.cols.product,
      links: [
        { label: l.plots, href: '#product' },
        { label: l.leads, href: '#product' },
        { label: l.commissions, href: '#commissions' },
        { label: l.reports, href: '#insights' },
      ],
    },
    {
      title: t.footer.cols.solutions,
      links: [
        { label: l.builders, href: '#builders' },
        { label: l.colonisers, href: '#builders' },
        { label: l.brokers, href: '#brokers' },
      ],
    },
    {
      title: t.footer.cols.company,
      links: [
        { label: l.demo, onClick: onOpenDemo },
        { label: l.contact, href: `mailto:${site.email}` },
        { label: l.faq, href: '#faq' },
      ],
    },
  ];

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_2fr]">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed">{t.footer.tagline}</p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm font-semibold text-ivory-100 hover:text-gold-200">
            {site.email}
          </a>
        </div>
        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{c.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className="transition-colors hover:text-ivory-100">
                        {link.label}
                      </a>
                    ) : (
                      <button type="button" onClick={link.onClick} className="transition-colors hover:text-ivory-100">
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/[0.07]">
        <div className="container-site flex flex-col justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-2">
            <span className="flex h-2.5 w-4 flex-col overflow-hidden rounded-[1px]" aria-hidden="true">
              <span className="flex-1 bg-[#FF9933]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            {t.footer.madeIn}
          </p>
        </div>
      </div>
    </footer>
  );
}

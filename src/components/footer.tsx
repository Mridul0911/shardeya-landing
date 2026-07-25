const columns = [
  {
    heading: "Product",
    links: ["Platform", "Pricing", "Security"],
  },
  {
    heading: "Resources",
    links: ["Guides", "API docs", "Support"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Contact"],
  },
];

const social = ["LinkedIn", "Twitter", "Instagram"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-obsidian text-bone">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(46,90,76,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2">
            <div className="font-display text-xl text-bone">Shardeya</div>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-bone/50">
              One intelligent platform for real estate projects, properties,
              clients, and payments.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <div className="font-data text-[11px] uppercase tracking-[0.15em] text-bone/40">
                {col.heading}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-bone/65 transition-colors hover:text-bone"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <span className="text-xs text-bone/40">
            © {new Date().getFullYear()} Shardeya. All rights reserved.
          </span>
          <div className="flex gap-6">
            {social.map((s) => (
              <a
                key={s}
                href="#top"
                className="text-xs text-bone/45 transition-colors hover:text-bone"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

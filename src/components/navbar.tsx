"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const LINKS = [
  { href: "#problem", label: "Why Shardeya" },
  { href: "#platform", label: "Platform" },
  { href: "#trust", label: "Trust" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-obsidian/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          className="font-display text-lg tracking-[0.02em] text-bone"
        >
          Shardeya
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={clsx(
                    "group relative text-sm transition-colors hover:text-bone",
                    isActive ? "text-bone" : "text-bone/75"
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-0 h-px bg-brass transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="text-sm text-bone/75 transition-colors hover:text-bone"
          >
            Book Demo
          </a>
          <a
            href="#contact"
            className="rounded-full border border-brass/50 bg-brass/10 px-5 py-2 text-sm text-brass-soft transition-all duration-300 hover:border-brass hover:bg-brass hover:text-obsidian"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={clsx(
              "h-px w-5 bg-bone transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={clsx(
              "h-px w-5 bg-bone transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <div
        className={clsx(
          "overflow-hidden border-b border-line bg-obsidian/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-transparent"
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-base text-bone/85"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full border border-brass/50 bg-brass/10 px-5 py-2.5 text-center text-sm text-brass-soft"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

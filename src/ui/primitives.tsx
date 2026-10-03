import React from 'react';
import { useReveal } from '../lib/useReveal';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type ButtonSize = 'md' | 'lg';

const buttonBase =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(8,51,40,0.3),0_4px_12px_-2px_rgba(21,107,85,0.35)] hover:bg-emerald-700 active:translate-y-px',
  secondary:
    'bg-white text-ink-900 shadow-[0_0_0_1px_rgba(15,28,43,0.12),0_1px_2px_rgba(15,28,43,0.06)] hover:shadow-[0_0_0_1px_rgba(15,28,43,0.2),0_2px_6px_rgba(15,28,43,0.08)] active:translate-y-px',
  ghost: 'text-ink-700 hover:bg-ivory-200 hover:text-ink-900',
  light: 'bg-ivory-100 text-ink-900 hover:bg-white active:translate-y-px',
  'outline-light': 'text-ivory-100 ring-1 ring-inset ring-white/20 hover:bg-white/5 hover:ring-white/35',
};

const buttonSizes: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const ink = tone === 'dark' ? '#0F1C2B' : '#FBF9F4';
  const fill = tone === 'dark' ? '#0F1C2B' : '#FBF9F4';
  const stroke = tone === 'dark' ? '#FBF9F4' : '#0F1C2B';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={fill} />
        <path d="M16 44V30l16-11 16 11v14" fill="none" stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
        <path d="M26 44V34h12v10" fill="none" stroke="#C29A4C" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.3rem] font-semibold tracking-[-0.02em]" style={{ color: ink }}>
        Shardeya
      </span>
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  tone = 'dark',
  className = '',
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <p className={`eyebrow ${tone === 'light' ? '!text-gold-300' : ''}`}>
        <span className={`h-px w-6 ${tone === 'light' ? 'bg-gold-300/70' : 'bg-emerald-500/60'}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={`h-section mt-4 ${tone === 'light' ? '!text-ivory-100' : ''}`}>{title}</h2>
      {sub && <p className={`lead mt-4 ${tone === 'light' ? '!text-ink-300' : ''}`}>{sub}</p>}
    </Reveal>
  );
}

export function Pill({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

/** Browser-style frame used to present the web app. */
export function AppWindow({
  url = 'app.shardeya.in',
  className = '',
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-frame ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-ivory-300 bg-ivory-100 px-3.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ivory-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-ivory-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-ivory-400" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center gap-1.5 rounded bg-white px-3 text-[11px] text-ink-500 shadow-hairline">
          <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
            <rect x="0.5" y="4" width="8" height="5.5" rx="1" fill="none" stroke="currentColor" />
            <path d="M2.5 4V3a2 2 0 0 1 4 0v1" fill="none" stroke="currentColor" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <div className="w-[42px]" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

/** Phone frame used for the broker app. */
export function PhoneFrame({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative rounded-[42px] bg-ink-900 p-[9px] shadow-[0_0_0_1px_rgba(15,28,43,0.4),0_30px_60px_-20px_rgba(15,28,43,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[34px] bg-ivory-100">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink-900" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export function Initials({ name, className = '' }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-ivory-200 font-semibold text-ink-700 ring-1 ring-ivory-300 ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

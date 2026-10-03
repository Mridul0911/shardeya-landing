import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from '../ui/primitives';
import { site } from '../config/site';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const emptyForm = { name: '', phone: '', city: '', role: '', size: '' };

/** Accepts +91 / 0 prefixes, spaces and dashes; returns the 10-digit number or null. */
function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, language } = useLanguage();
  const d = t.demo;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [phoneError, setPhoneError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Focus management, Esc to close, scroll lock, simple focus trap.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, select, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Reset after closing so the next open starts fresh.
  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      setStatus('idle');
      setPhoneError(false);
      setForm(emptyForm);
    }, 200);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k === 'phone') setPhoneError(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = normalisePhone(form.phone);
    if (!phone) {
      setPhoneError(true);
      return;
    }
    const payload = { ...form, phone, language, source: 'shardeya.in', submittedAt: new Date().toISOString() };

    if (site.leadEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(site.leadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
      return;
    }

    // No endpoint configured: hand the lead to the visitor's email app so it is never silently lost.
    const body = [
      `Name: ${form.name}`,
      `Mobile: +91 ${phone}`,
      `City: ${form.city}`,
      `Role: ${form.role}`,
      `Plots/units per year: ${form.size}`,
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Demo request — ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  const done = status === 'sent' || status === 'mailto';
  const field =
    'mt-1.5 h-11 w-full rounded-md border border-ivory-400 bg-white px-3.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';
  const label = 'block text-[13px] font-semibold text-ink-700';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-ink-950/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        className="relative max-h-[92dvh] w-full max-w-[34rem] animate-scale-in overflow-y-auto rounded-t-2xl bg-ivory-50 shadow-frame sm:rounded-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={d.close}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-ivory-200 hover:text-ink-900"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="px-7 pb-8 pt-12 text-center sm:px-10" aria-live="polite">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" strokeWidth={1.5} />
            <h2 id="demo-title" className="mt-5 font-display text-2xl font-medium text-ink-900">
              {d.successTitle}, {form.name.split(' ')[0]}.
            </h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-600">
              {status === 'sent' ? d.successText.replace('{phone}', `+91 ${normalisePhone(form.phone)}`) : d.mailtoText}
            </p>
            <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={onClose}>
              {d.done}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate={false} className="px-6 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10">
            <h2 id="demo-title" className="pr-10 font-display text-[1.75rem] font-medium leading-tight text-ink-900">
              {d.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{d.sub}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="demo-name" className={label}>{d.name}</label>
                <input ref={firstFieldRef} id="demo-name" required autoComplete="name" value={form.name} onChange={set('name')} className={field} />
              </div>
              <div>
                <label htmlFor="demo-phone" className={label}>{d.phone}</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 mt-[3px] -translate-y-1/2 text-[15px] text-ink-500">+91</span>
                  <input
                    id="demo-phone"
                    required
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={set('phone')}
                    aria-invalid={phoneError}
                    aria-describedby={phoneError ? 'demo-phone-error' : undefined}
                    className={`${field} pl-12 ${phoneError ? '!border-rose-500' : ''}`}
                  />
                </div>
                {phoneError && (
                  <p id="demo-phone-error" className="mt-1.5 text-xs font-medium text-rose-600">
                    {d.phoneError}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="demo-city" className={label}>{d.city}</label>
                <input id="demo-city" required autoComplete="address-level2" value={form.city} onChange={set('city')} className={field} />
              </div>
              <div>
                <label htmlFor="demo-role" className={label}>{d.role}</label>
                <select id="demo-role" required value={form.role} onChange={set('role')} className={`${field} appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat`} style={{ backgroundImage: chevron }}>
                  <option value="" disabled>—</option>
                  {d.roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="demo-size" className={label}>{d.size}</label>
                <select id="demo-size" required value={form.size} onChange={set('size')} className={`${field} appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat`} style={{ backgroundImage: chevron }}>
                  <option value="" disabled>—</option>
                  {d.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <p className="mt-5 rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-600" role="alert">
                {d.errorText.replace('{email}', site.email)}
              </p>
            )}

            <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === 'sending'}>
              {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === 'sending' ? d.submitting : d.submit}
            </Button>
            <p className="mt-4 text-center text-xs text-ink-500">{d.privacy}</p>
          </form>
        )}
      </div>
    </div>
  );
}

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%235B6B7C' stroke-width='1.6'/%3E%3C/svg%3E\")";

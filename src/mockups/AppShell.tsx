import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  Handshake,
  IndianRupee,
  LayoutDashboard,
  Map,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { project } from './data';

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Building2 },
  { id: 'plots', label: 'Plot layout', icon: Map },
  { id: 'leads', label: 'Leads', icon: Users, badge: '24' },
  { id: 'followups', label: 'Follow-ups', icon: CalendarClock, badge: '5' },
  { id: 'brokers', label: 'Brokers', icon: Handshake },
  { id: 'payments', label: 'Payments', icon: IndianRupee },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
] as const;

export type NavId = (typeof navItems)[number]['id'] | 'listings';

export function AppShell({
  active,
  title,
  actions,
  children,
  compact = false,
}: {
  active: NavId;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex bg-ivory-100 text-ink-900">
      <aside
        className={`${compact ? 'hidden lg:flex' : 'flex'} w-[184px] shrink-0 flex-col bg-ink-900 px-3 py-4 text-[12px]`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-2 pb-4">
          <svg width="22" height="22" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#FBF9F4" />
            <path d="M16 44V30l16-11 16 11v14" fill="none" stroke="#0F1C2B" strokeWidth="5" strokeLinejoin="round" />
            <path d="M26 44V34h12v10" fill="none" stroke="#C29A4C" strokeWidth="5" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-[15px] font-semibold text-ivory-100">Shardeya</span>
        </div>
        <div className="mb-3 rounded-md bg-white/5 px-2.5 py-2 ring-1 ring-inset ring-white/10">
          <p className="text-[10px] uppercase tracking-wider text-ink-400">Project</p>
          <p className="mt-0.5 truncate font-semibold text-ivory-100">{project.name}</p>
          <p className="truncate text-[10.5px] text-ink-400">{project.phase} · Jaipur</p>
        </div>
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ id, label, icon: Icon, ...rest }) => {
            const isActive = id === active || (active === 'listings' && id === 'projects');
            return (
              <span
                key={id}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-[7px] ${
                  isActive ? 'bg-white/10 font-semibold text-white' : 'text-ink-300'
                }`}
              >
                <Icon className={`h-[15px] w-[15px] ${isActive ? 'text-gold-300' : 'text-ink-400'}`} strokeWidth={1.75} />
                <span className="flex-1">{label}</span>
                {'badge' in rest && (
                  <span className="rounded bg-white/10 px-1.5 text-[10px] font-semibold text-ivory-200">{rest.badge}</span>
                )}
              </span>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-white/10 px-2 pt-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-ink-900">
            RA
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-ivory-100">Rajendra A.</p>
            <p className="text-[10px] text-ink-400">Owner</p>
          </div>
          <Settings className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.75} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-12 items-center gap-3 border-b border-ivory-300 bg-white px-4 sm:px-5">
          <h3 className="truncate text-[13px] font-bold text-ink-900">{title}</h3>
          <div className="ml-auto hidden h-7 w-56 items-center gap-2 rounded-md bg-ivory-100 px-2.5 text-[11px] text-ink-400 ring-1 ring-inset ring-ivory-300 md:flex">
            <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
            Search plots, buyers, brokers…
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {actions}
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md text-ink-500 ring-1 ring-inset ring-ivory-300">
              <Bell className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * Renders children at a fixed design width and scales them down to fit,
 * like a crisp screenshot. `minScale` lets the frame bleed off-screen on
 * phones instead of shrinking into illegibility.
 */
export function ScaledFrame({
  designWidth,
  minScale = 0,
  className = '',
  children,
}: {
  designWidth: number;
  minScale?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const scale = Math.max(minScale, Math.min(1, o.clientWidth / designWidth));
      setState({ scale, height: i.offsetHeight * scale });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [designWidth, minScale]);

  return (
    <div ref={outer} className={className} style={{ height: state.height || undefined }}>
      <div
        ref={inner}
        style={{ width: designWidth, transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
    </div>
  );
}

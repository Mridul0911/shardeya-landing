import { ArrowUpRight, CalendarClock, MapPin, Phone, Plus, MessageCircle } from 'lucide-react';
import { AppShell } from './AppShell';
import { plots, plotStatusMeta, followUps, payments, project } from './data';
import { AppWindow, Pill } from '../ui/primitives';
import { inr } from '../lib/format';

const kpis = [
  { label: 'Plots sold', value: '142', suffix: `/ ${project.totalPlots}`, foot: '64% of Phase II', bar: 64 },
  { label: 'Collections · Sep', value: '₹1.12 Cr', foot: '+18% vs Aug', up: true },
  { label: 'Active leads', value: '386', foot: '24 new today' },
  { label: 'Commission due', value: '₹6.4 L', foot: '11 brokers' },
];

const kindIcon = { call: Phone, visit: MapPin, whatsapp: MessageCircle };

export function HeroDashboard() {
  const blockA = plots.filter((p) => p.block === 'A');
  const blockB = plots.filter((p) => p.block === 'B');

  return (
    <AppWindow url="app.shardeya.in/dashboard">
      <AppShell
        active="dashboard"
        title="Dashboard"
        actions={
          <span className="flex h-7 items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 text-[11px] font-semibold text-white">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.25} /> New booking
          </span>
        }
      >
        <div className="space-y-4 p-5">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-3">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-md bg-white p-3.5 shadow-hairline">
                <p className="text-[10.5px] font-medium text-ink-500">{k.label}</p>
                <p className="num mt-1.5 text-[19px] font-bold tracking-tight text-ink-900">
                  {k.value}
                  {k.suffix && <span className="ml-1 text-[12px] font-semibold text-ink-400">{k.suffix}</span>}
                </p>
                {k.bar !== undefined ? (
                  <div className="mt-2">
                    <div className="h-1 overflow-hidden rounded-full bg-ivory-300">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${k.bar}%` }} />
                    </div>
                    <p className="mt-1.5 text-[10px] text-ink-500">{k.foot}</p>
                  </div>
                ) : (
                  <p className={`mt-2 flex items-center gap-1 text-[10px] ${k.up ? 'font-semibold text-emerald-600' : 'text-ink-500'}`}>
                    {k.up && <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />}
                    {k.foot}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.45fr_1fr] gap-3">
            {/* Plot availability */}
            <div className="rounded-md bg-white p-4 shadow-hairline">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-bold">Plot availability</p>
                  <p className="text-[10.5px] text-ink-500">
                    {project.name} · {project.phase}
                  </p>
                </div>
                <div className="flex gap-3 text-[10px] text-ink-500">
                  {(['available', 'hold', 'booked', 'sold'] as const).map((s) => (
                    <span key={s} className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-sm ${plotStatusMeta[s].dot}`} />
                      {plotStatusMeta[s].label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3.5 rounded bg-ivory-100 p-2.5 ring-1 ring-inset ring-ivory-300">
                <MiniBlock plots={blockA} />
                <div className="my-1.5 flex items-center gap-2 px-1 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-ink-400">
                  <span className="h-px flex-1 border-t border-dashed border-ink-300" />
                  30 ft road
                  <span className="h-px flex-1 border-t border-dashed border-ink-300" />
                </div>
                <MiniBlock plots={blockB} />
              </div>
            </div>

            {/* Today's follow-ups */}
            <div className="rounded-md bg-white p-4 shadow-hairline">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold">Today’s follow-ups</p>
                <span className="flex items-center gap-1 text-[10px] text-ink-500">
                  <CalendarClock className="h-3 w-3" /> 3 Oct
                </span>
              </div>
              <ul className="mt-2.5 divide-y divide-ivory-300">
                {followUps.slice(1, 5).map((f) => {
                  const Icon = kindIcon[f.kind];
                  return (
                    <li key={f.name} className="flex items-center gap-2.5 py-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded ${
                          f.state === 'overdue' ? 'bg-rose-50 text-rose-500' : f.state === 'next' ? 'bg-gold-50 text-gold-600' : 'bg-ivory-200 text-ink-500'
                        }`}
                      >
                        <Icon className="h-3 w-3" strokeWidth={2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-semibold">{f.name}</p>
                        <p className="truncate text-[10px] text-ink-500">{f.note}</p>
                      </div>
                      <span
                        className={`num text-[10px] font-semibold ${f.state === 'overdue' ? 'text-rose-500' : 'text-ink-500'}`}
                      >
                        {f.state === 'overdue' ? 'Overdue' : f.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Recent payments */}
          <div className="rounded-md bg-white shadow-hairline">
            <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
              <p className="text-[12px] font-bold">Recent payments</p>
              <span className="text-[10.5px] font-semibold text-emerald-600">View all</span>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-y border-ivory-300 bg-ivory-100 text-[10px] uppercase tracking-wider text-ink-400">
                  <th className="px-4 py-1.5 font-semibold">Buyer</th>
                  <th className="py-1.5 font-semibold">Plot</th>
                  <th className="py-1.5 font-semibold">For</th>
                  <th className="py-1.5 font-semibold">Mode</th>
                  <th className="py-1.5 pr-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-300">
                {payments.slice(0, 3).map((p) => (
                  <tr key={p.buyer}>
                    <td className="px-4 py-2 font-semibold">{p.buyer}</td>
                    <td className="py-2 text-ink-600">{p.plot}</td>
                    <td className="py-2 text-ink-600">{p.label}</td>
                    <td className="py-2">
                      {p.mode ? (
                        <Pill className="bg-emerald-50 text-emerald-700 ring-emerald-200">{p.mode}</Pill>
                      ) : (
                        <Pill className="bg-gold-50 text-gold-600 ring-gold-200">Due {p.date}</Pill>
                      )}
                    </td>
                    <td className="num py-2 pr-4 text-right font-semibold">{inr(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppShell>
    </AppWindow>
  );
}

function MiniBlock({ plots: list }: { plots: typeof plots }) {
  return (
    <div className="grid grid-cols-12 gap-[3px]">
      {list.map((p) => (
        <span
          key={p.id}
          className={`flex h-[22px] items-center justify-center rounded-[3px] border text-[8px] font-semibold ${plotStatusMeta[p.status].cell}`}
        >
          {p.id.slice(2)}
        </span>
      ))}
    </div>
  );
}

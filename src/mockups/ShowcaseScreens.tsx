import { useMemo, useState } from 'react';
import {
  Check,
  CheckCheck,
  Download,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Send,
  Share2,
  Upload,
} from 'lucide-react';
import { AppShell } from './AppShell';
import {
  followUps,
  leadStageMeta,
  leads,
  payments,
  plotCounts,
  plotStatusMeta,
  plots,
  project,
  type LeadStage,
  type Plot,
  type PlotStatus,
} from './data';
import { Pill } from '../ui/primitives';
import { inr, inrShort } from '../lib/format';

const screenBody = 'min-h-[500px] p-4 sm:p-5';

function HeaderButton({ icon: Icon, children, primary }: { icon: typeof Plus; children: string; primary?: boolean }) {
  return (
    <span
      className={`hidden h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-semibold sm:flex ${
        primary ? 'bg-emerald-600 text-white' : 'bg-white text-ink-700 ring-1 ring-inset ring-ivory-400'
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {children}
    </span>
  );
}

/* ───────────────────────────── Plot layout ───────────────────────────── */

export function PlotsScreen() {
  const [selectedId, setSelectedId] = useState('B-05');
  const [filter, setFilter] = useState<PlotStatus | 'all'>('all');
  const selected = plots.find((p) => p.id === selectedId)!;

  const blocks = (['A', 'B', 'C'] as const).map((b) => plots.filter((p) => p.block === b));

  return (
    <AppShell
      compact
      active="plots"
      title={`Plot layout · ${project.name}`}
      actions={<HeaderButton icon={Upload}>Price list</HeaderButton>}
    >
      <div className={`${screenBody} flex flex-col gap-4 xl:flex-row`}>
        <div className="min-w-0 flex-1">
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-none" role="group" aria-label="Filter plots by status">
            {(['all', 'available', 'hold', 'booked', 'sold'] as const).map((s) => {
              const active = filter === s;
              const count = s === 'all' ? plots.length : plotCounts[s];
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(s)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                    active ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 ring-1 ring-inset ring-ivory-300 hover:ring-ivory-500'
                  }`}
                >
                  {s !== 'all' && <span className={`h-2 w-2 rounded-sm ${plotStatusMeta[s].dot}`} />}
                  {s === 'all' ? 'All plots' : plotStatusMeta[s].label}
                  <span className={`num ${active ? 'text-ink-300' : 'text-ink-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-md bg-white p-3 shadow-hairline sm:p-4">
            <div className="rounded bg-[#F3F1EA] p-2 ring-1 ring-inset ring-ivory-300 sm:p-3">
              {blocks.map((list, i) => (
                <div key={i}>
                  {i > 0 && (
                    <div className="my-2 flex items-center gap-2 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-ink-400">
                      <span className="h-px flex-1 border-t border-dashed border-ink-300" />
                      {i === 1 ? '40 ft main road' : '30 ft road · Park ahead'}
                      <span className="h-px flex-1 border-t border-dashed border-ink-300" />
                    </div>
                  )}
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-ink-400">Block {list[0].block}</p>
                  <div className="grid grid-cols-12 gap-[3px] sm:gap-1">
                    {list.map((p) => (
                      <PlotCell
                        key={p.id}
                        plot={p}
                        selected={p.id === selectedId}
                        dimmed={filter !== 'all' && p.status !== filter}
                        onSelect={() => setSelectedId(p.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[10.5px] text-ink-500">Tap any plot to see its details.</p>
          </div>
        </div>

        <PlotDetail plot={selected} />
      </div>
    </AppShell>
  );
}

function PlotCell({
  plot,
  selected,
  dimmed,
  onSelect,
}: {
  plot: Plot;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Plot ${plot.id}, ${plotStatusMeta[plot.status].label}`}
      aria-pressed={selected}
      className={`num flex h-8 items-center sm:h-9 justify-center rounded-[3px] border text-[9px] font-bold transition-all duration-150 sm:text-[10px] ${
        plotStatusMeta[plot.status].cell
      } ${dimmed ? 'opacity-25' : ''} ${selected ? 'z-10 scale-110 shadow-lift ring-2 ring-ink-900 ring-offset-1' : ''}`}
    >
      {plot.id.slice(2)}
    </button>
  );
}

function PlotDetail({ plot }: { plot: Plot }) {
  const total = plot.sizeSqYd * plot.rate;
  const meta = plotStatusMeta[plot.status];
  return (
    <aside key={plot.id} className="w-full shrink-0 animate-fade-in rounded-md bg-white shadow-hairline xl:w-[248px]" aria-live="polite">
      <div className="border-b border-ivory-300 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Plot</p>
          <Pill className={meta.pill}>
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </Pill>
        </div>
        <p className="mt-1 font-display text-[26px] font-medium leading-none">{plot.id}</p>
        <p className="mt-1.5 text-[11px] text-ink-500">
          {plot.sizeSqYd} sq yd · {plot.facing} facing{plot.corner ? ' · Corner' : ''}
          {plot.park ? ' · Park facing' : ''}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-ivory-300 text-[11px]">
        <div className="bg-white p-3">
          <dt className="text-ink-500">Rate</dt>
          <dd className="num mt-0.5 font-semibold">{inr(plot.rate)}/sq yd</dd>
        </div>
        <div className="bg-white p-3">
          <dt className="text-ink-500">Total price</dt>
          <dd className="num mt-0.5 font-semibold">{inrShort(total)}</dd>
        </div>
      </dl>
      <div className="space-y-3 border-t border-ivory-300 p-4 text-[11px]">
        {plot.buyer ? (
          <>
            <Row label="Buyer" value={plot.buyer} />
            <Row label="Broker" value={plot.broker!} />
            <div>
              <div className="flex justify-between">
                <span className="text-ink-500">Payment received</span>
                <span className="num font-semibold">{plot.paidPct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ivory-300">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${plot.paidPct}%` }} />
              </div>
              <p className="num mt-1.5 text-[10.5px] text-ink-500">
                {inrShort((total * (plot.paidPct ?? 0)) / 100)} of {inrShort(total)}
              </p>
            </div>
            <span className="flex h-8 items-center justify-center gap-1.5 rounded-md bg-white text-[11px] font-semibold text-ink-800 ring-1 ring-inset ring-ivory-400">
              <FileText className="h-3.5 w-3.5" /> Allotment letter
            </span>
          </>
        ) : (
          <>
            <p className="text-ink-600">This plot is open for booking. Share it with a buyer or hold it for a few days.</p>
            <div className="grid grid-cols-2 gap-2">
              <span className="flex h-8 items-center justify-center rounded-md bg-emerald-600 text-[11px] font-semibold text-white">
                Book plot
              </span>
              <span className="flex h-8 items-center justify-center gap-1 rounded-md bg-white text-[11px] font-semibold text-ink-800 ring-1 ring-inset ring-ivory-400">
                <Share2 className="h-3 w-3" /> Share
              </span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-500">{label}</span>
      <span className="truncate font-semibold">{value}</span>
    </div>
  );
}

/* ──────────────────────────────── Leads ──────────────────────────────── */

const stageTotals: Record<LeadStage, number> = { New: 42, Contacted: 118, 'Site visit': 36, Negotiation: 14, Booked: 9 };

export function LeadsScreen() {
  const [stage, setStage] = useState<LeadStage | 'all'>('all');
  const rows = useMemo(() => (stage === 'all' ? leads : leads.filter((l) => l.stage === stage)), [stage]);
  const total = Object.values(stageTotals).reduce((a, b) => a + b, 0);

  return (
    <AppShell
      compact
      active="leads"
      title="Leads"
      actions={<HeaderButton icon={Plus} primary>Add lead</HeaderButton>}
    >
      <div className={screenBody}>
        <div className="grid grid-cols-5 overflow-hidden rounded-md bg-white shadow-hairline" role="group" aria-label="Filter leads by stage">
          {(Object.keys(stageTotals) as LeadStage[]).map((s) => {
            const active = stage === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => setStage(active ? 'all' : s)}
                className={`relative border-r border-ivory-300 px-2 py-2.5 text-left transition-colors last:border-r-0 sm:px-3 ${
                  active ? 'bg-ivory-100' : 'hover:bg-ivory-100/60'
                }`}
              >
                <p className="truncate text-[9.5px] font-semibold uppercase tracking-wider text-ink-500 sm:text-[10px]">{s}</p>
                <p className="num mt-0.5 text-[15px] font-bold sm:text-[17px]">{stageTotals[s]}</p>
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${active ? 'bg-ink-900' : 'bg-transparent'}`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[10.5px] text-ink-500">
          {total} open leads · tap a stage to filter
        </p>

        <div className="mt-3 overflow-hidden rounded-md bg-white shadow-hairline">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-ivory-300 bg-ivory-100 text-[10px] uppercase tracking-wider text-ink-400">
                <th className="px-3 py-2 font-semibold sm:px-4">Lead</th>
                <th className="hidden py-2 font-semibold sm:table-cell">Source</th>
                <th className="py-2 font-semibold">Budget</th>
                <th className="hidden py-2 font-semibold lg:table-cell">Looking for</th>
                <th className="py-2 font-semibold">Stage</th>
                <th className="hidden py-2 pr-4 font-semibold md:table-cell">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-300">
              {rows.map((l) => (
                <tr key={l.name} className="animate-fade-in transition-colors hover:bg-ivory-100/70">
                  <td className="px-3 py-2.5 sm:px-4">
                    <p className="font-semibold">{l.name}</p>
                    <p className="num text-[10px] text-ink-500">{l.phone} · {l.last}</p>
                  </td>
                  <td className="hidden py-2.5 text-ink-600 sm:table-cell">{l.source}</td>
                  <td className="num py-2.5 text-ink-700">{l.budget}</td>
                  <td className="hidden py-2.5 text-ink-600 lg:table-cell">{l.interest}</td>
                  <td className="py-2.5">
                    <Pill className={leadStageMeta[l.stage]}>{l.stage}</Pill>
                  </td>
                  <td className="hidden py-2.5 pr-4 md:table-cell">
                    <span className={l.owner === 'Unassigned' ? 'font-semibold text-rose-500' : 'text-ink-700'}>{l.owner}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

/* ────────────────────────────── Follow-ups ────────────────────────────── */

const kindMeta = {
  call: { icon: Phone, label: 'Call' },
  visit: { icon: MapPin, label: 'Site visit' },
  whatsapp: { icon: MessageCircle, label: 'WhatsApp' },
};

export function FollowUpsScreen() {
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(followUps.map((f) => [f.name, f.state === 'done'])),
  );
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <AppShell compact active="followups" title="Follow-ups · Today" actions={<HeaderButton icon={Plus}>Schedule</HeaderButton>}>
      <div className={`${screenBody} grid gap-4 lg:grid-cols-[1fr_260px]`}>
        <div className="rounded-md bg-white shadow-hairline">
          <div className="flex items-center justify-between border-b border-ivory-300 px-4 py-3">
            <p className="text-[12px] font-bold">Saturday, 3 October</p>
            <p className="num text-[11px] text-ink-500">
              {completed} of {followUps.length} done
            </p>
          </div>
          <ol className="relative px-4 py-2">
            {followUps.map((f) => {
              const isDone = done[f.name];
              const K = kindMeta[f.kind];
              const overdue = f.state === 'overdue' && !isDone;
              return (
                <li key={f.name} className="flex gap-3 py-2.5">
                  <span className="num w-10 shrink-0 pt-0.5 text-[11px] font-semibold text-ink-500">{f.time}</span>
                  <div
                    className={`flex min-w-0 flex-1 items-start gap-3 rounded-md p-2.5 ring-1 ring-inset transition-colors ${
                      overdue ? 'bg-rose-50 ring-rose-500/20' : f.state === 'next' && !isDone ? 'bg-gold-50 ring-gold-200' : 'ring-ivory-300'
                    }`}
                  >
                    <K.icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${overdue ? 'text-rose-500' : 'text-ink-500'}`} strokeWidth={2} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-[11.5px] font-semibold ${isDone ? 'text-ink-400 line-through' : ''}`}>{f.name}</p>
                      <p className="text-[10.5px] text-ink-500">
                        {K.label} · {f.note} · <span className="font-medium">{f.owner}</span>
                      </p>
                      {overdue && <p className="mt-1 text-[10px] font-semibold text-rose-500">Overdue by 2 hours</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setDone((d) => ({ ...d, [f.name]: !d[f.name] }))}
                      aria-label={isDone ? `Mark ${f.name} as not done` : `Mark ${f.name} as done`}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        isDone ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-ivory-500 bg-white hover:border-emerald-500'
                      }`}
                    >
                      {isDone && <Check className="h-3 w-3" strokeWidth={3} />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-md bg-[#ECE5DA] p-3 shadow-hairline">
          <p className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold text-ink-600">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> Sent automatically on WhatsApp
          </p>
          <div className="rounded-lg rounded-tl-none bg-white p-3 text-[11px] leading-relaxed text-ink-800 shadow-soft">
            <p>Namaste Mahesh ji 🙏</p>
            <p className="mt-1.5">
              Your site visit at <b>{project.name}, {project.phase}</b> is confirmed for <b>today, 4:30 PM</b>.
            </p>
            <div className="mt-2 flex items-center gap-2 rounded bg-ivory-100 p-2 ring-1 ring-inset ring-ivory-300">
              <MapPin className="h-4 w-4 shrink-0 text-rose-500" />
              <div>
                <p className="text-[10.5px] font-semibold">Site office, {project.name}</p>
                <p className="text-[10px] text-ink-500">{project.location}</p>
              </div>
            </div>
            <p className="mt-2">Kunal from our team will meet you at the gate.</p>
            <p className="mt-1.5 flex items-center justify-end gap-1 text-[9.5px] text-ink-400">
              10:02 AM <CheckCheck className="h-3 w-3 text-sky-500" />
            </p>
          </div>
          <div className="ml-auto mt-2 w-fit rounded-lg rounded-tr-none bg-[#D9F5D0] px-3 py-2 text-[11px] text-ink-800 shadow-soft">
            Thank you, see you at 4:30 👍
            <span className="ml-2 text-[9.5px] text-ink-400">10:15 AM</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ─────────────────────────────── Payments ─────────────────────────────── */

export function PaymentsScreen() {
  const [reminded, setReminded] = useState<Record<string, boolean>>({});

  const summary = [
    { label: 'Collected this month', value: '₹1.12 Cr', note: '38 receipts' },
    { label: 'Due in next 7 days', value: '₹18.4 L', note: '9 instalments' },
    { label: 'Overdue', value: '₹3.85 L', note: '1 buyer', warn: true },
  ];

  return (
    <AppShell compact active="payments" title="Payments" actions={<HeaderButton icon={Download}>Export</HeaderButton>}>
      <div className={screenBody}>
        <div className="grid grid-cols-3 divide-x divide-ivory-300 rounded-md bg-white shadow-hairline">
          {summary.map((s) => (
            <div key={s.label} className="p-3 sm:p-4">
              <p className="text-[10px] font-medium text-ink-500 sm:text-[10.5px]">{s.label}</p>
              <p className={`num mt-1 text-[15px] font-bold sm:text-[18px] ${s.warn ? 'text-rose-500' : ''}`}>{s.value}</p>
              <p className="text-[10px] text-ink-500">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-md bg-white shadow-hairline">
          <ul className="divide-y divide-ivory-300">
            {payments.map((p) => {
              const sent = reminded[p.buyer];
              return (
                <li key={p.buyer} className="flex items-center gap-3 px-3 py-3 sm:px-4">
                  <span
                    className={`h-8 w-1 shrink-0 rounded-full ${
                      p.status === 'received' ? 'bg-emerald-500' : p.status === 'overdue' ? 'bg-rose-500' : 'bg-gold-400'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11.5px] font-semibold">
                      {p.buyer} <span className="font-normal text-ink-500">· Plot {p.plot}</span>
                    </p>
                    <p className="truncate text-[10.5px] text-ink-500">
                      {p.label} ·{' '}
                      {p.status === 'received'
                        ? `Received ${p.date.toLowerCase()} via ${p.mode}`
                        : p.status === 'overdue'
                          ? `Was due ${p.date}`
                          : `Due ${p.date}`}
                    </p>
                  </div>
                  <p className="num text-[12px] font-bold">{inr(p.amount)}</p>
                  <div className="hidden w-[118px] justify-end sm:flex">
                    {p.status === 'received' ? (
                      <Pill className="bg-emerald-50 text-emerald-700 ring-emerald-200">
                        <Check className="h-3 w-3" strokeWidth={2.5} /> Receipt sent
                      </Pill>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReminded((r) => ({ ...r, [p.buyer]: true }))}
                        disabled={sent}
                        className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[10.5px] font-semibold transition-colors ${
                          sent
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-white text-ink-800 ring-1 ring-inset ring-ivory-400 hover:bg-ivory-100'
                        }`}
                      >
                        {sent ? <CheckCheck className="h-3.5 w-3.5" /> : <Send className="h-3 w-3" />}
                        {sent ? 'Reminder sent' : 'Remind on WhatsApp'}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}

/* ─────────────────────────────── Listings ─────────────────────────────── */

// Pick real available plots so the tour stays consistent with the layout tab.
const available = plots.filter((p) => p.status === 'available');
const listingPlots = [available.find((p) => p.corner), available.find((p) => p.block === 'B'), available.find((p) => p.block === 'C')]
  .filter((p): p is Plot => Boolean(p))
  .slice(0, 3);

export function ListingsScreen() {
  const [shared, setShared] = useState<string | null>(null);
  const items = listingPlots;

  return (
    <AppShell compact active="listings" title="Listings · Available now" actions={<HeaderButton icon={Plus} primary>New listing</HeaderButton>}>
      <div className={`${screenBody} grid content-start gap-3 sm:grid-cols-3`}>
        {items.map((p, i) => {
          const total = p.sizeSqYd * p.rate;
          const isShared = shared === p.id;
          return (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-md bg-white shadow-hairline">
              <PlotThumb variant={i} />
              <div className="flex flex-1 flex-col p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold">Plot {p.id}</p>
                  <Pill className={plotStatusMeta.available.pill}>Available</Pill>
                </div>
                <p className="mt-1 text-[10.5px] text-ink-500">
                  {project.name} · {project.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {[`${p.sizeSqYd} sq yd`, `${p.facing} facing`, ...(p.corner ? ['Corner'] : []), ...(p.park ? ['Park facing'] : [])].map(
                    (tag) => (
                      <span key={tag} className="rounded bg-ivory-200 px-1.5 py-0.5 text-[10px] font-medium text-ink-600">
                        {tag}
                      </span>
                    ),
                  )}
                </div>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <div>
                    <p className="text-[10px] text-ink-500">Price</p>
                    <p className="num text-[15px] font-bold">{inrShort(total)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShared(p.id)}
                    className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[10.5px] font-semibold transition-colors ${
                      isShared ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isShared ? <CheckCheck className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}
                    {isShared ? 'Shared' : 'Share'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}

/** Small site-plan drawing instead of stock photography. */
function PlotThumb({ variant }: { variant: number }) {
  const highlight = [5, 0, 1][variant];
  return (
    <div className="relative h-28 border-b border-ivory-300 bg-[#F3F1EA]">
      <svg viewBox="0 0 200 112" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="50" width="200" height="12" fill="#E4DED0" />
        <line x1="0" y1="56" x2="200" y2="56" stroke="#C2B8A2" strokeDasharray="4 4" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={`t${i}`}
            x={10 + i * 26}
            y="12"
            width="22"
            height="34"
            rx="2"
            fill={i === highlight ? '#1F7F66' : '#FFFEFB'}
            stroke={i === highlight ? '#156B55' : '#DDD5C3'}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`b${i}`} x={10 + i * 26} y="66" width="22" height="34" rx="2" fill="#FFFEFB" stroke="#DDD5C3" />
        ))}
        {variant === 0 && <circle cx="186" cy="83" r="9" fill="#A6D5C4" opacity="0.8" />}
      </svg>
      <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-ink-600 shadow-hairline">
        Site plan
      </span>
    </div>
  );
}

import { CalendarClock, ChevronRight, Home, IndianRupee, MapPin, Plus, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PhoneFrame, Pill, Reveal, SectionHeading } from '../ui/primitives';

export function Brokers() {
  const { t } = useLanguage();
  return (
    <section id="brokers" className="overflow-hidden py-24 sm:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading eyebrow={t.brokers.eyebrow} title={t.brokers.title} sub={t.brokers.sub} />
          <ol className="mt-10 space-y-1">
            {t.brokers.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="group grid grid-cols-[2.25rem_1fr] gap-3 rounded-lg p-3 transition-colors hover:bg-white">
                <span className="num flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-[13px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="relative flex justify-center lg:justify-end lg:pr-10">
          {/* Backdrop: a quiet plan sheet */}
          <div
            className="absolute inset-y-8 left-1/2 w-[120%] -translate-x-1/2 rounded-2xl bg-ivory-300/70 lg:left-auto lg:right-0 lg:w-[88%] lg:translate-x-0"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-2xl bg-plot-grid" />
          </div>
          <PhoneFrame className="relative w-[300px]">
            <BrokerApp />
          </PhoneFrame>
          <div className="absolute bottom-20 left-0 z-20 hidden w-[230px] rounded-lg bg-white p-3.5 shadow-float sm:block lg:left-0" aria-hidden="true">
            <p className="text-[11px] font-semibold text-ink-500">Commission credited</p>
            <p className="num mt-0.5 text-lg font-bold text-ink-900">₹66,800</p>
            <p className="text-[11px] text-ink-500">Plot B-06 · TDS deducted ₹1,336</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrokerApp() {
  return (
    <div className="h-[640px] text-ink-900" aria-hidden="true">
      <div className="bg-ink-900 px-5 pb-5 pt-12 text-ivory-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-300">Namaste,</p>
            <p className="text-[15px] font-bold">Vikas Rathore</p>
          </div>
          <Pill className="bg-gold-400/15 text-gold-200 ring-gold-300/30">Partner · 2%</Pill>
        </div>
        <div className="mt-4 rounded-lg bg-white/[0.06] p-3.5 ring-1 ring-inset ring-white/10">
          <p className="text-[10.5px] text-ink-300">Commission this year</p>
          <p className="num mt-0.5 font-display text-[26px] font-medium">₹4,82,300</p>
          <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="h-full bg-emerald-400" style={{ width: '62%' }} />
            <span className="h-full border-l-2 border-ink-900 bg-gold-300" style={{ width: '24%' }} />
          </div>
          <div className="mt-2 flex gap-3 text-[10px] text-ink-300">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Paid ₹2.99 L</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-gold-300" /> Approved ₹1.16 L</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-md bg-emerald-600 text-[12px] font-semibold text-white">
            <Plus className="h-4 w-4" /> Add lead
          </span>
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-md bg-white text-[12px] font-semibold ring-1 ring-inset ring-ivory-400">
            <MapPin className="h-3.5 w-3.5" /> Availability
          </span>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-500">Upcoming visits</p>
          <div className="divide-y divide-ivory-300 rounded-md bg-white shadow-hairline">
            {[
              { n: 'Meenakshi Soni', d: 'Today · 4:30 PM', p: 'B-05, B-07' },
              { n: 'Gaurav Bansal', d: 'Sat · 11:00 AM', p: 'A-12 (corner)' },
            ].map((v) => (
              <div key={v.n} className="flex items-center gap-3 p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-50 text-gold-600">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold">{v.n}</p>
                  <p className="text-[10.5px] text-ink-500">{v.d} · {v.p}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-ink-300" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-500">My leads</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ['12', 'Active'],
              ['4', 'Visits'],
              ['2', 'Booked'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-md bg-white py-2.5 shadow-hairline">
                <p className="num text-[17px] font-bold">{v}</p>
                <p className="text-[10px] text-ink-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-ivory-300 bg-white px-4 pb-5 pt-2.5 text-[9.5px] text-ink-500">
        {[
          [Home, 'Home', true],
          [Users, 'Leads'],
          [MapPin, 'Plots'],
          [IndianRupee, 'Earnings'],
        ].map(([Icon, l, a]) => {
          const I = Icon as typeof Home;
          return (
            <span key={l as string} className={`flex flex-col items-center gap-0.5 ${a ? 'font-semibold text-emerald-700' : ''}`}>
              <I className="h-[18px] w-[18px]" strokeWidth={a ? 2.25 : 1.75} />
              {l as string}
            </span>
          );
        })}
      </div>
    </div>
  );
}

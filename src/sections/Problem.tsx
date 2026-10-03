import { useLanguage } from '../i18n/LanguageContext';
import { Reveal, SectionHeading } from '../ui/primitives';

export function Problem() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32" aria-labelledby="problem-title">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t.problem.eyebrow} title={t.problem.title} sub={t.problem.sub} />
          <Reveal delay={120} className="mt-10">
            <ChaosCollage />
          </Reveal>
        </div>

        <div>
          <ol className="divide-y divide-ivory-400 border-y border-ivory-400">
            {t.problem.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-2 py-8 sm:py-9">
                <span className="num pt-1 font-display text-lg text-gold-500">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink-900">{item.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-ink-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={100}>
            <p className="mt-10 border-l-2 border-gold-400 pl-5 font-display text-xl leading-snug text-ink-800 sm:text-[1.4rem]">
              {t.problem.cost}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** A small, realistic scene of the double-booking problem: a spreadsheet and a WhatsApp group that disagree. */
function ChaosCollage() {
  return (
    <div className="relative h-[390px] sm:h-[350px]" aria-hidden="true">
      {/* Spreadsheet */}
      <div className="absolute left-0 top-0 w-[290px] -rotate-[1.5deg] overflow-hidden rounded-md bg-white shadow-lift sm:w-[320px]">
        <div className="flex items-center gap-2 bg-[#1E6E43] px-3 py-1.5 text-[10.5px] font-semibold text-white">
          <span className="rounded-sm bg-white/20 px-1">X</span> Plot_list_FINAL_v3.xlsx
        </div>
        <table className="w-full border-collapse font-mono text-[10.5px] text-ink-700">
          <thead>
            <tr className="bg-ivory-200 text-ink-500">
              {['', 'Plot', 'Buyer', 'Status'].map((h, i) => (
                <th key={i} className="border border-ivory-300 px-1.5 py-1 text-left font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['13', 'A-13', 'R. Sharma', 'Booked'],
              ['14', 'A-14', 'S. Meena', 'Booked', true],
              ['15', 'A-15', '', 'Avail.'],
              ['16', 'A-14', 'V. Jain', 'Booked?', true],
            ].map(([n, p, b, s, bad]) => (
              <tr key={String(n)} className={bad ? 'bg-rose-50' : ''}>
                <td className="border border-ivory-300 bg-ivory-200 px-1.5 py-1 text-ink-400">{n}</td>
                <td className={`border border-ivory-300 px-1.5 py-1 ${bad ? 'font-bold text-rose-600' : ''}`}>{p}</td>
                <td className="border border-ivory-300 px-1.5 py-1">{b}</td>
                <td className="border border-ivory-300 px-1.5 py-1">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WhatsApp group */}
      <div className="absolute right-0 top-[168px] w-[260px] sm:top-[136px] rotate-[1.5deg] overflow-hidden rounded-lg bg-[#ECE5DA] shadow-lift sm:right-4 sm:w-[280px]">
        <div className="flex items-center gap-2 bg-[#0B5E4E] px-3 py-2 text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">P2</span>
          <div>
            <p className="text-[11px] font-semibold leading-tight">Phase 2 Brokers</p>
            <p className="text-[9px] opacity-75">47 participants</p>
          </div>
        </div>
        <div className="space-y-1.5 p-2.5 text-[11px] leading-snug text-ink-800">
          <div className="w-fit max-w-[88%] rounded-md rounded-tl-none bg-white px-2.5 py-1.5 shadow-soft">
            <p className="text-[9.5px] font-bold text-[#B5473A]">Vikas (Broker)</p>
            Bhai A-14 abhi available hai na? Client token dene ko ready hai 🙏
          </div>
          <div className="ml-auto w-fit max-w-[80%] rounded-md rounded-tr-none bg-[#D9F5D0] px-2.5 py-1.5 shadow-soft">
            Haan ji, aa jao kal 👍
          </div>
          <div className="w-fit max-w-[88%] rounded-md rounded-tl-none bg-white px-2.5 py-1.5 shadow-soft">
            <p className="text-[9.5px] font-bold text-[#1F7F66]">Office – Accounts</p>
            Ruko, A-14 toh last week book ho gaya tha?
          </div>
        </div>
      </div>
    </div>
  );
}

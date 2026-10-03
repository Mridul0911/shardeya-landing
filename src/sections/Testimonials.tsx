import { useLanguage } from '../i18n/LanguageContext';
import { Initials, Reveal, SectionHeading } from '../ui/primitives';

// PLACEHOLDER testimonials — replace with real, approved customer quotes before launch.
const featured = {
  quote: {
    en: 'We had 240 plots across two phases and three Excel sheets that never matched. Within a month on Shardeya the double-bookings stopped — and our brokers stopped calling the office about commission.',
    hi: 'हमारे दो फेज़ में 240 प्लॉट थे और तीन एक्सेल शीट्स जो कभी मेल नहीं खाती थीं। शार्देय पर आने के एक महीने में डबल बुकिंग बंद हो गई — और ब्रोकर्स ने कमीशन के लिए ऑफ़िस फ़ोन करना भी बंद कर दिया।',
  },
  name: 'Rajendra Agarwal',
  role: { en: 'Managing Director', hi: 'मैनेजिंग डायरेक्टर' },
  company: 'Shubh Laxmi Developers',
  city: 'Jaipur',
  metric: { value: '3 days', label: { en: 'to move 240 plots off Excel', hi: 'में 240 प्लॉट्स एक्सेल से शिफ़्ट' } },
};

const quotes = [
  {
    quote: {
      en: 'The WhatsApp reminders alone paid for it. Overdue instalments dropped by almost half in the first quarter.',
      hi: 'सिर्फ़ व्हाट्सऐप रिमाइंडर से ही पैसा वसूल हो गया। पहली तिमाही में बकाया किस्तें लगभग आधी रह गईं।',
    },
    name: 'Priya Deshmukh',
    role: { en: 'Head of Sales', hi: 'हेड ऑफ़ सेल्स' },
    company: 'Godavari Greens, Nashik',
  },
  {
    quote: {
      en: 'I work with 30 brokers. Earlier every payout meant an argument. Now each broker sees their own statement on the phone, and the numbers match.',
      hi: 'मेरे साथ 30 ब्रोकर्स काम करते हैं। पहले हर पेआउट पर बहस होती थी। अब हर ब्रोकर फ़ोन पर अपना स्टेटमेंट देखता है, और हिसाब मेल खाता है।',
    },
    name: 'Harpreet Singh',
    role: { en: 'Founder', hi: 'फ़ाउंडर' },
    company: 'Singh Realty Partners, Ludhiana',
  },
  {
    quote: {
      en: 'Our site team is not very technical, but they picked it up in a day. Seeing the plot layout on the phone is what won them over.',
      hi: 'हमारी साइट टीम ज़्यादा टेक्निकल नहीं है, फिर भी एक दिन में सीख गई। फ़ोन पर प्लॉट लेआउट देखकर ही उन्हें यह पसंद आया।',
    },
    name: 'Anil Kushwaha',
    role: { en: 'Coloniser', hi: 'कॉलोनाइज़र' },
    company: 'Narmada Vihar Township, Indore',
  },
];

export function Testimonials() {
  const { t, language } = useLanguage();
  return (
    <section className="bg-ivory-200 py-24 sm:py-32" aria-label={t.testimonials.eyebrow}>
      <div className="container-site">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal as="article" className="flex flex-col">
            <svg width="40" height="30" viewBox="0 0 40 30" className="text-gold-400" aria-hidden="true">
              <path
                d="M0 30V17.6C0 7.9 5.2 1.7 15.4 0l1.5 4.2C11 5.8 8.3 9.3 8 14h8v16H0zm22 0V17.6C22 7.9 27.2 1.7 37.4 0l1.5 4.2C33 5.8 30.3 9.3 30 14h8v16H22z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="mt-6 font-display text-[1.6rem] leading-[1.35] tracking-[-0.01em] text-ink-900 sm:text-[1.95rem]">
              {featured.quote[language]}
            </blockquote>
            <footer className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ivory-400 pt-6">
              <div className="flex items-center gap-3.5">
                <Initials name={featured.name} className="h-12 w-12 bg-ink-900 text-sm text-gold-200 ring-0" />
                <div>
                  <p className="font-bold text-ink-900">{featured.name}</p>
                  <p className="text-sm text-ink-600">
                    {featured.role[language]}, {featured.company} · {featured.city}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="num font-display text-2xl font-medium text-emerald-700">{featured.metric.value}</p>
                <p className="text-xs text-ink-500">{featured.metric.label[language]}</p>
              </div>
            </footer>
          </Reveal>

          <ul className="divide-y divide-ivory-400 border-y border-ivory-400 lg:border-y-0 lg:border-l lg:pl-12">
            {quotes.map((q, i) => (
              <Reveal as="li" key={q.name} delay={i * 80} className="py-7 first:pt-7 lg:first:pt-0 lg:last:pb-0">
                <p className="leading-relaxed text-ink-800">“{q.quote[language]}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <Initials name={q.name} className="h-9 w-9 text-xs" />
                  <div className="text-sm">
                    <p className="font-bold text-ink-900">{q.name}</p>
                    <p className="text-ink-500">
                      {q.role[language]}, {q.company}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

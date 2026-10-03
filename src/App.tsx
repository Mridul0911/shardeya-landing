import { useCallback, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Trust } from './sections/Trust';
import { Problem } from './sections/Problem';
import { HowItWorks } from './sections/HowItWorks';
import { Features } from './sections/Features';
import { Showcase } from './sections/Showcase';
import { Brokers } from './sections/Brokers';
import { Builders } from './sections/Builders';
import { Commission } from './sections/Commission';
import { Insights } from './sections/Insights';
import { Why } from './sections/Why';
import { Testimonials } from './sections/Testimonials';
import { Faq } from './sections/Faq';
import { FinalCta } from './sections/FinalCta';
import { Footer } from './sections/Footer';
import { DemoModal } from './sections/DemoModal';

function Page() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar onOpenDemo={openDemo} />
      <main id="main">
        <Hero onOpenDemo={openDemo} />
        <Trust />
        <Problem />
        <HowItWorks />
        <Features />
        <Showcase />
        <Brokers />
        <Builders />
        <Commission />
        <Insights />
        <Why />
        <Testimonials />
        <Faq />
        <FinalCta onOpenDemo={openDemo} />
      </main>
      <Footer onOpenDemo={openDemo} />
      <DemoModal open={demoOpen} onClose={closeDemo} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

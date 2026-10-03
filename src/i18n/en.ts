// Marketing copy for the landing page. Hindi lives in ./hi.ts with the same shape.
// Product UI inside the mockups stays in English, as the app itself does.

export const en = {
  nav: {
    product: 'Product',
    builders: 'For builders',
    brokers: 'For brokers',
    commissions: 'Commissions',
    insights: 'Reports',
    faq: 'FAQ',
    demo: 'Book a demo',
    menu: 'Menu',
    close: 'Close',
    switchTo: 'हिंदी',
    switchLabel: 'Switch to Hindi',
  },

  hero: {
    eyebrow: 'For builders, colonisers & brokers',
    titleA: 'Your entire real-estate business,',
    titleB: 'managed from one place.',
    sub: 'Shardeya brings your plots, leads, site visits, broker commissions and buyer payments together — so you stop chasing registers, Excel sheets and WhatsApp groups, and spend your time closing deals.',
    primary: 'Book a free demo',
    secondary: 'See the product',
    trustLine: 'Trusted by 350+ real-estate firms across India',
    points: ['Setup done for you, from your Excel', 'Works on every phone', 'Hindi & English'],
  },

  trust: {
    title: 'Builders, colonisers and channel partners across 40+ cities run on Shardeya',
    stats: [
      { value: '₹2,400 Cr+', label: 'inventory managed' },
      { value: '18,000+', label: 'plots & units tracked' },
      { value: '3,200+', label: 'brokers paid on time' },
      { value: '40+', label: 'cities across India' },
    ],
  },

  problem: {
    eyebrow: 'The problem',
    title: 'Most real-estate firms still run on registers, Excel and WhatsApp groups.',
    sub: 'It works — until the project grows. Then small gaps start costing real money.',
    tools: ['Booking register', 'Plot_list_FINAL_v3.xlsx', '“Phase 2 Brokers” group', 'Phone diary'],
    items: [
      {
        title: 'Same plot, two buyers',
        text: 'Inventory sits in one sheet, bookings in another. One missed update and a plot is promised twice.',
      },
      {
        title: 'Commission disputes',
        text: 'Every broker keeps their own maths. Each payout turns into a negotiation — and a strained relationship.',
      },
      {
        title: 'Leads that go cold',
        text: 'Enquiries come from portals, ads and calls. Without reminders, follow-ups slip and buyers move on.',
      },
      {
        title: 'Collections in the dark',
        text: 'You find out which instalments are overdue at month-end — after calling the accounts team.',
      },
    ],
    cost: 'On a 200-plot project, one double-booking or one lost buyer can easily cost more than ₹10 lakh.',
  },

  how: {
    eyebrow: 'How Shardeya helps',
    title: 'One connected system, from first enquiry to final registry.',
    steps: [
      {
        title: 'Set up your project',
        text: 'Share your layout and price list. Every plot gets its size, facing, rate and a live status.',
      },
      {
        title: 'Capture every lead',
        text: 'Enquiries from portals, ads, calls and brokers land in one list, with follow-up reminders.',
      },
      {
        title: 'Book and collect',
        text: 'Book a plot in two taps. Instalments are tracked and reminders go out on WhatsApp.',
      },
      {
        title: 'Settle commissions',
        text: 'Brokerage is calculated on every booking — with TDS and GST — and paid without disputes.',
      },
    ],
  },

  features: {
    eyebrow: 'Everything in one place',
    title: 'Built around how real estate actually works.',
    sub: 'Not a generic CRM with real estate bolted on. Every screen is designed for plots, payments and partners.',
    items: [
      { title: 'Plot & inventory layout', text: 'A live, colour-coded map of every plot — available, on hold, booked or sold.' },
      { title: 'Lead management', text: 'Every enquiry in one list with source, budget, owner and stage.' },
      { title: 'Follow-ups & site visits', text: 'Daily reminders for your team, and WhatsApp confirmations for buyers.' },
      { title: 'Property listings', text: 'Share a clean listing with price and availability in one tap.' },
      { title: 'Broker network', text: 'Onboard brokers, protect their leads, and track their performance.' },
      { title: 'Payments & instalments', text: 'Payment plans, receipts and overdue alerts for every booking.' },
      { title: 'Commission engine', text: 'Slab-based brokerage with TDS and GST, calculated automatically.' },
      { title: 'Reports & insights', text: 'Sales, collections and lead sources at a glance — any day of the month.' },
    ],
  },

  showcase: {
    eyebrow: 'Product tour',
    title: 'See Shardeya the way your team will use it.',
    sub: 'Click through the screens — this is the real workflow, shown with sample data.',
    tabs: [
      { id: 'plots', label: 'Plot layout', text: 'Live status for every plot. Click any plot to see its buyer, broker and payments.' },
      { id: 'leads', label: 'Leads', text: 'Every enquiry with its source, budget and stage — and who is handling it.' },
      { id: 'followups', label: 'Follow-ups', text: 'Today’s calls and site visits for each person, so nothing slips.' },
      { id: 'payments', label: 'Payments', text: 'Collections, upcoming instalments and overdue amounts — buyer by buyer.' },
      { id: 'listings', label: 'Listings', text: 'Ready-to-share listings with live availability and price.' },
    ],
    hint: 'Interactive preview',
  },

  brokers: {
    eyebrow: 'For brokers & channel partners',
    title: 'Leads, site visits and commission — right on the broker’s phone.',
    sub: 'Your brokers get a simple mobile app. They sell more, call your office less, and always know where their money is.',
    steps: [
      { title: 'Register a lead in seconds', text: 'The lead is protected under the broker’s name — no more “whose client is this?”' },
      { title: 'Check live availability', text: 'See which plots are open, and their price, before calling the client.' },
      { title: 'Book a site visit', text: 'The client gets an automatic WhatsApp confirmation with the location.' },
      { title: 'Track every rupee', text: 'Commission earned, approved and paid — visible at any time.' },
    ],
  },

  builders: {
    eyebrow: 'For builders & colonisers',
    title: 'Every project, phase and plot — under control.',
    sub: 'From layout approval to final registry, see where each project stands without calling five different people.',
    points: [
      { title: 'All projects, one view', text: 'Inventory, bookings and collections across every colony and tower.' },
      { title: 'Payment plans that run themselves', text: 'Time-based or construction-linked — reminders and receipts are automatic.' },
      { title: 'Price lists & holds', text: 'Update rates by phase or facing. Hold a plot for a buyer for a fixed number of days.' },
      { title: 'Documents against each plot', text: 'Allotment letters, agreements and receipts — generated and stored in one place.' },
    ],
  },

  commission: {
    eyebrow: 'Brokerage & commission',
    title: 'Commission that everyone agrees on — calculated the moment a deal closes.',
    sub: 'Set your slabs once. Shardeya applies the right rate, handles TDS and GST, and keeps a clear statement for every broker.',
    calcTitle: 'Commission calculator',
    saleValue: 'Sale value',
    slab: 'Broker slab',
    gstToggle: 'Broker is GST registered',
    commission: 'Commission',
    gst: 'GST @ 18%',
    tds: 'TDS u/s 194H @ 2%',
    net: 'Net payable to broker',
    note: 'Illustrative. Slabs and rates are configurable for each project.',
    slabs: [
      { name: 'Associate', rule: 'Up to 5 sales', rate: 1.5 },
      { name: 'Partner', rule: '6–15 sales', rate: 2 },
      { name: 'Elite', rule: '16+ sales', rate: 2.5 },
    ],
    points: [
      'Slabs upgrade automatically as brokers sell more',
      'Split one deal between two brokers',
      'Payout statements every broker can see',
    ],
    ledgerTitle: 'Recent payouts',
  },

  insights: {
    eyebrow: 'Reports & insights',
    title: 'Know how the business is doing — without waiting for month-end.',
    sub: 'Sales, collections and lead sources update as your team works. Share a clean report with partners in one click.',
    highlights: [
      { value: '+18%', label: 'collections vs last quarter' },
      { value: '26 days', label: 'average enquiry-to-booking time' },
      { value: '₹42 L', label: 'overdue instalments flagged this week' },
    ],
  },

  why: {
    eyebrow: 'Why Shardeya',
    title: 'Made for Indian real estate — not adapted to it.',
    cols: ['Registers & Excel', 'Generic CRM', 'Shardeya'],
    rows: [
      { label: 'Plot-wise layout with live status', v: ['no', 'no', 'yes'] },
      { label: 'Broker slabs with TDS & GST', v: ['partial', 'no', 'yes'] },
      { label: 'Instalment reminders on WhatsApp', v: ['no', 'partial', 'yes'] },
      { label: 'Hindi & English for your team', v: ['partial', 'no', 'yes'] },
      { label: 'Works on any phone', v: ['no', 'partial', 'yes'] },
      { label: 'Data import & setup done for you', v: ['no', 'no', 'yes'] },
    ],
    legend: { yes: 'Included', partial: 'Partly / manual', no: 'Not available' },
    pillars: [
      { title: 'Simple enough for everyone', text: 'If your team can use WhatsApp, they can use Shardeya. We train them in a day.' },
      { title: 'Your data stays yours', text: 'Encrypted, backed up daily and visible only to people you allow. Export anytime.' },
      { title: 'Real people, real support', text: 'Onboarding and support on call and WhatsApp — in Hindi or English.' },
    ],
  },

  testimonials: {
    eyebrow: 'Customer stories',
    title: 'Firms that moved off Excel — and didn’t look back.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    sub: 'Can’t find what you’re looking for?',
    contact: 'Write to us',
    items: [
      {
        q: 'Do I need to be technical to use Shardeya?',
        a: 'Not at all. Shardeya is designed for busy owners, sales teams and brokers. If you can use WhatsApp, you can use Shardeya — and we train your team.',
      },
      {
        q: 'Can you move my existing data from Excel?',
        a: 'Yes. Share your plot list, bookings and broker sheets, and our team imports them for you — usually within two working days.',
      },
      {
        q: 'Does it work for apartments and commercial projects too?',
        a: 'Yes. Shardeya handles plotted colonies, villas, apartments and shops — each with its own layout, pricing and payment plans.',
      },
      {
        q: 'Can my brokers use it on their phone?',
        a: 'Yes. Brokers get their own mobile login to register leads, check availability and track their commission. They only see what you allow.',
      },
      {
        q: 'Is my data safe?',
        a: 'Your data is encrypted, backed up every day, and visible only to the people you give access to. You can export everything at any time.',
      },
      {
        q: 'How is pricing decided?',
        a: 'Pricing depends on the number of projects and users. Book a demo and we’ll share a plan that fits the size of your business.',
      },
    ],
  },

  cta: {
    title: 'See your own project on Shardeya.',
    sub: 'Book a free 30-minute demo. Share your layout beforehand and we’ll show it to you live — plots, prices and all.',
    primary: 'Book a free demo',
    secondary: 'Email us',
    points: ['No credit card', 'Setup help included', 'Hindi or English'],
  },

  footer: {
    tagline: 'Real-estate management software for builders, colonisers and brokers.',
    cols: {
      product: 'Product',
      solutions: 'Solutions',
      company: 'Company',
    },
    links: {
      plots: 'Plot layout',
      leads: 'Leads & follow-ups',
      commissions: 'Commissions',
      reports: 'Reports',
      builders: 'For builders',
      colonisers: 'For colonisers',
      brokers: 'For brokers',
      contact: 'Contact',
      demo: 'Book a demo',
      faq: 'FAQ',
    },
    rights: 'All rights reserved.',
    madeIn: 'Made in India',
  },

  demo: {
    title: 'Book your free demo',
    sub: 'Tell us a little about your business. We’ll call you within one working day.',
    name: 'Your name',
    phone: 'Mobile number',
    city: 'City',
    role: 'You are a',
    roles: ['Builder / Developer', 'Coloniser', 'Broker / Channel partner', 'Other'],
    size: 'Plots or units per year',
    sizes: ['Under 50', '50 – 200', '200 – 500', '500+'],
    submit: 'Request demo',
    submitting: 'Sending…',
    privacy: 'We’ll only use these details to contact you about Shardeya.',
    phoneError: 'Please enter a valid 10-digit mobile number.',
    successTitle: 'Thank you',
    successText: 'Our team will call you on {phone} within one working day to set up your demo.',
    mailtoText: 'Your email app has opened with your details filled in — just press send and we’ll call you back.',
    errorText: 'Something went wrong. Please email us at {email}.',
    done: 'Done',
    close: 'Close',
  },
};

export type Content = typeof en;

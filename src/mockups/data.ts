// Sample data shown inside the product mockups. Names and numbers are illustrative.

export type PlotStatus = 'available' | 'hold' | 'booked' | 'sold';

export interface Plot {
  id: string;
  block: 'A' | 'B' | 'C';
  sizeSqYd: number;
  facing: string;
  status: PlotStatus;
  rate: number; // ₹ per sq yd
  buyer?: string;
  broker?: string;
  paidPct?: number;
  corner?: boolean;
  park?: boolean;
}

export const project = {
  name: 'Aravali Greens',
  phase: 'Phase II',
  location: 'Ajmer Road, Jaipur',
  totalPlots: 220,
  baseRate: 18500,
};

// One letter per plot: a = available, h = hold, b = booked, s = sold
const blockPatterns: Record<Plot['block'], string[]> = {
  A: ['ssbsabsshasb', 'sbsasbhsbsas'],
  B: ['sbaasbsbhbsa', 'basbssabsbab'],
  C: ['sassbhabsbas', 'abssbasbsasa'],
};

const statusFromCode: Record<string, PlotStatus> = { a: 'available', h: 'hold', b: 'booked', s: 'sold' };
const sizes = [200, 167, 167, 200, 150, 150, 167, 200, 167, 150, 167, 222];
const buyers = [
  'Rakesh Sharma', 'Sunita Meena', 'Amit Khandelwal', 'Pooja Agarwal', 'Deepak Saini', 'Neha Choudhary',
  'Vikas Jain', 'Kavita Rathore', 'Manoj Gupta', 'Ritu Mathur', 'Sandeep Yadav', 'Anjali Purohit',
];
const brokers = ['Om Sai Properties', 'Rathore Realty', 'Direct', 'Pink City Estates', 'Shekhawat Associates'];

export const plots: Plot[] = (Object.keys(blockPatterns) as Plot['block'][]).flatMap((block, bi) =>
  blockPatterns[block].flatMap((row, ri) =>
    row.split('').map((code, i) => {
      const n = ri * 12 + i + 1;
      const status = statusFromCode[code];
      const corner = i === 0 || i === 11;
      const park = block === 'B' && ri === 0 && i >= 4 && i <= 7;
      const seed = bi * 31 + ri * 7 + i;
      const plot: Plot = {
        id: `${block}-${String(n).padStart(2, '0')}`,
        block,
        sizeSqYd: sizes[(i + ri * 3) % sizes.length],
        facing: ri === 0 ? 'North' : 'South',
        status,
        rate: project.baseRate + (corner ? 1500 : 0) + (park ? 1000 : 0),
        corner,
        park,
      };
      if (status !== 'available') {
        plot.buyer = buyers[seed % buyers.length];
        plot.broker = brokers[seed % brokers.length];
        plot.paidPct = status === 'sold' ? 100 : status === 'hold' ? 0 : [25, 40, 55, 70, 85][seed % 5];
      }
      return plot;
    }),
  ),
);

export const plotStatusMeta: Record<PlotStatus, { label: string; cell: string; dot: string; pill: string }> = {
  available: {
    label: 'Available',
    cell: 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100',
    dot: 'bg-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  hold: {
    label: 'On hold',
    cell: 'bg-gold-50 border-gold-300 text-gold-600 hover:bg-gold-100',
    dot: 'bg-gold-400',
    pill: 'bg-gold-50 text-gold-600 ring-gold-200',
  },
  booked: {
    label: 'Booked',
    cell: 'bg-sky-50 border-sky-500/40 text-sky-600 hover:bg-[#dde9f2]',
    dot: 'bg-sky-500',
    pill: 'bg-sky-50 text-sky-600 ring-sky-500/25',
  },
  sold: {
    label: 'Sold',
    cell: 'bg-ink-700 border-ink-700 text-ivory-200 hover:bg-ink-800',
    dot: 'bg-ink-700',
    pill: 'bg-ivory-200 text-ink-700 ring-ivory-400',
  },
};

export const plotCounts = plots.reduce(
  (acc, p) => ({ ...acc, [p.status]: acc[p.status] + 1 }),
  { available: 0, hold: 0, booked: 0, sold: 0 } as Record<PlotStatus, number>,
);

export type LeadStage = 'New' | 'Contacted' | 'Site visit' | 'Negotiation' | 'Booked';

export const leads: {
  name: string;
  phone: string;
  source: string;
  budget: string;
  interest: string;
  stage: LeadStage;
  owner: string;
  last: string;
}[] = [
  { name: 'Mahesh Kumawat', phone: '98290 ••• 41', source: 'Property portal', budget: '₹35–40 L', interest: '200 sq yd, East', stage: 'Site visit', owner: 'Kunal', last: 'Visit today, 4:30 PM' },
  { name: 'Shalini Verma', phone: '94140 ••• 07', source: 'Facebook ad', budget: '₹28–32 L', interest: '167 sq yd', stage: 'Contacted', owner: 'Priya', last: 'Called 2h ago' },
  { name: 'Gaurav Bansal', phone: '99280 ••• 63', source: 'Rathore Realty', budget: '₹45 L+', interest: 'Corner plot', stage: 'Negotiation', owner: 'Kunal', last: 'Offer sent' },
  { name: 'Asha Kanwar', phone: '96360 ••• 18', source: 'Walk-in', budget: '₹30 L', interest: '150–167 sq yd', stage: 'New', owner: 'Unassigned', last: 'Enquired 20m ago' },
  { name: 'Rohit Pareek', phone: '97830 ••• 92', source: 'Referral', budget: '₹38 L', interest: 'Park facing', stage: 'Booked', owner: 'Priya', last: 'Booked B-06' },
  { name: 'Farhan Qureshi', phone: '90010 ••• 55', source: 'Property portal', budget: '₹25–30 L', interest: '150 sq yd', stage: 'Contacted', owner: 'Ajay', last: 'WhatsApp brochure' },
  { name: 'Meenakshi Soni', phone: '98870 ••• 30', source: 'Om Sai Properties', budget: '₹40 L', interest: '200 sq yd, North', stage: 'Site visit', owner: 'Ajay', last: 'Visit Sat, 11 AM' },
];

export const leadStageMeta: Record<LeadStage, string> = {
  New: 'bg-ivory-200 text-ink-700 ring-ivory-400',
  Contacted: 'bg-sky-50 text-sky-600 ring-sky-500/25',
  'Site visit': 'bg-gold-50 text-gold-600 ring-gold-200',
  Negotiation: 'bg-amber-50 text-amber-600 ring-amber-500/25',
  Booked: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

export type FollowUpKind = 'call' | 'visit' | 'whatsapp';

export const followUps: {
  time: string;
  name: string;
  kind: FollowUpKind;
  note: string;
  owner: string;
  state: 'done' | 'next' | 'later' | 'overdue';
}[] = [
  { time: '10:00', name: 'Shalini Verma', kind: 'call', note: 'Share Phase II price list', owner: 'Priya', state: 'done' },
  { time: '11:30', name: 'Gaurav Bansal', kind: 'call', note: 'Final offer on A-12 (corner)', owner: 'Kunal', state: 'done' },
  { time: '13:00', name: 'Farhan Qureshi', kind: 'whatsapp', note: 'Send layout PDF & location', owner: 'Ajay', state: 'overdue' },
  { time: '16:30', name: 'Mahesh Kumawat', kind: 'visit', note: 'Site visit — show B-05, B-07', owner: 'Kunal', state: 'next' },
  { time: '18:00', name: 'Asha Kanwar', kind: 'call', note: 'First call — new walk-in lead', owner: 'Priya', state: 'later' },
];

export const payments: {
  buyer: string;
  plot: string;
  label: string;
  amount: number;
  date: string;
  mode?: string;
  status: 'received' | 'due' | 'overdue';
}[] = [
  { buyer: 'Rohit Pareek', plot: 'B-06', label: 'Booking amount', amount: 350000, date: 'Today', mode: 'UPI', status: 'received' },
  { buyer: 'Sunita Meena', plot: 'A-03', label: 'Instalment 3 of 6', amount: 450000, date: 'Today', mode: 'NEFT', status: 'received' },
  { buyer: 'Amit Khandelwal', plot: 'A-16', label: 'Instalment 2 of 4', amount: 825000, date: '05 Oct', status: 'due' },
  { buyer: 'Kavita Rathore', plot: 'C-04', label: 'Instalment 4 of 6', amount: 410000, date: '08 Oct', status: 'due' },
  { buyer: 'Deepak Saini', plot: 'B-11', label: 'Instalment 2 of 6', amount: 385000, date: '26 Sep', status: 'overdue' },
];

export const payouts: { broker: string; plot: string; amount: number; status: 'Paid' | 'Approved' | 'Pending' }[] = [
  { broker: 'Rathore Realty', plot: 'A-12', amount: 92500, status: 'Paid' },
  { broker: 'Om Sai Properties', plot: 'B-06', amount: 66800, status: 'Approved' },
  { broker: 'Pink City Estates', plot: 'C-09', amount: 55500, status: 'Pending' },
  { broker: 'Shekhawat Associates', plot: 'A-07', amount: 74000, status: 'Paid' },
];

// Collections, ₹ lakh per month
export const collections = [
  { m: 'Apr', v: 62 },
  { m: 'May', v: 74 },
  { m: 'Jun', v: 58 },
  { m: 'Jul', v: 91 },
  { m: 'Aug', v: 86 },
  { m: 'Sep', v: 112 },
];

export const leadSources = [
  { label: 'Property portals', v: 38 },
  { label: 'Facebook & Instagram', v: 24 },
  { label: 'Broker network', v: 21 },
  { label: 'Walk-ins & hoardings', v: 11 },
  { label: 'Referrals', v: 6 },
];

export const funnel = [
  { label: 'Enquiries', v: 412 },
  { label: 'Contacted', v: 318 },
  { label: 'Site visits', v: 126 },
  { label: 'Bookings', v: 38 },
];

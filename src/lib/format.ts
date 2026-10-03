const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** ₹12,34,567 — full Indian grouping */
export const inr = (n: number) => inrFormatter.format(Math.round(n));

/** ₹1.84 Cr / ₹37.0 L — the way Indian real-estate teams talk about money */
export function inrShort(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n >= 1e6 ? 1 : 2)} L`;
  return inr(n);
}

export const fmtInt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

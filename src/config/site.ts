// Single place for business details used across the page.
export const site = {
  name: 'Shardeya',
  email: 'hello@shardeya.in',
  // When set at build time, demo requests are POSTed here as JSON
  // (e.g. a Formspree / Google Apps Script / CRM webhook URL).
  // Without it, the form falls back to opening a pre-filled email.
  leadEndpoint: (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) || '',
};

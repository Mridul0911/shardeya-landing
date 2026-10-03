/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{ts,tsx}', './src/{sections,mockups,ui,i18n,lib,config}/**/*.{ts,tsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        // Deep navy / charcoal — text, dark surfaces, product chrome
        ink: {
          950: '#0A1420',
          900: '#0F1C2B',
          800: '#172738',
          700: '#24374B',
          600: '#3D4F63',
          500: '#5B6B7C',
          400: '#8593A2',
          300: '#B4BDC7',
        },
        // Warm ivory — page surfaces and hairlines
        ivory: {
          50: '#FFFEFB',
          100: '#FBF9F4',
          200: '#F5F1E8',
          300: '#ECE6D8',
          400: '#DDD5C3',
          500: '#C2B8A2',
        },
        // Emerald / teal — primary brand action
        emerald: {
          50: '#ECF6F2',
          100: '#D3EBE2',
          200: '#A6D5C4',
          300: '#6FB9A1',
          400: '#3E9A7F',
          500: '#1F7F66',
          600: '#156B55',
          700: '#105845',
          800: '#0C4536',
          900: '#083328',
        },
        // Gold — sparing warm accent
        gold: {
          50: '#FBF5E8',
          100: '#F4E7C8',
          200: '#E8D09A',
          300: '#D6B46C',
          400: '#C29A4C',
          500: '#A9823A',
          600: '#8A6A2F',
        },
        // Status (reserved for product UI states)
        rose: { 50: '#FBEEEC', 500: '#B5473A', 600: '#9A3B30' },
        amber: { 50: '#FCF3E3', 500: '#C9851F', 600: '#A86C14' },
        sky: { 50: '#EAF2F8', 500: '#3A6F98', 600: '#2E5B7E' },
      },
      fontFamily: {
        display: ['Fraunces', 'Noto Serif Devanagari', 'Georgia', 'serif'],
        sans: ['Manrope', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        // One consistent family: 6 (controls), 10 (panels), 16 (frames)
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        hairline: '0 0 0 1px rgba(15, 28, 43, 0.06)',
        soft: '0 1px 2px rgba(15, 28, 43, 0.04), 0 2px 8px rgba(15, 28, 43, 0.04)',
        lift: '0 2px 4px rgba(15, 28, 43, 0.04), 0 12px 32px -8px rgba(15, 28, 43, 0.12)',
        frame:
          '0 0 0 1px rgba(15, 28, 43, 0.08), 0 2px 6px rgba(15, 28, 43, 0.04), 0 24px 64px -16px rgba(15, 28, 43, 0.22)',
        float: '0 0 0 1px rgba(15, 28, 43, 0.06), 0 12px 28px -6px rgba(15, 28, 43, 0.18)',
        'inset-line': 'inset 0 -1px 0 rgba(15, 28, 43, 0.08)',
      },
      maxWidth: {
        site: '1200px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pulse_dot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulse_dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

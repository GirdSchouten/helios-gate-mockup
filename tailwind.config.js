/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'helios-dark': '#0f172a',
        'helios-card': '#1e293b',
        'helios-blue': '#3b82f6',
        'helios-green': '#4ade80',
        'helios-orange': '#fb923c',
        'helios-purple': '#a78bfa',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
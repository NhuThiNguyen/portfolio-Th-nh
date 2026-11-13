/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#F4F8FD',
          primary: '#A9CFF5',
          light: '#DCEEFF',
          accent: '#75AFE5',
          deep: '#315778',
          white: '#FFFFFF',
          text: '#263D55',
          subtext: '#8296AA',
          border: '#E4EDF6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(49, 87, 120, 0.08), 0 2px 6px -1px rgba(49, 87, 120, 0.04)',
        'soft-lg': '0 12px 30px -4px rgba(49, 87, 120, 0.12), 0 4px 12px -2px rgba(49, 87, 120, 0.06)',
        'glow': '0 0 25px rgba(169, 207, 245, 0.45)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(#A9CFF5 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        primary: '#0a0e27',
        secondary: '#1a1f3a',
        tertiary: '#252d47',
        // Neon accents
        accent: '#0ea5e9',
        accent2: '#06b6d4',
        accent3: '#84cc16',
        accent4: '#a855f7',
        accent5: '#ec4899',
      },
      backgroundColor: {
        'glass': 'rgba(15, 23, 42, 0.7)',
        'glass-light': 'rgba(30, 41, 59, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.6s ease-out',
        slideDown: 'slideDown 0.6s ease-out',
        glow: 'glow 2s ease-in-out infinite',
        pulse-glow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-lime': '0 0 30px rgba(132, 204, 22, 0.4)',
      },
    },
  },
  plugins: [],
}

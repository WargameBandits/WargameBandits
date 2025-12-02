/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Flagyard inspired colors
        dark: {
          900: '#0a0a0f',  // Main background
          800: '#12121a',  // Card background
          700: '#1a1a24',  // Lighter card
          600: '#22222e',  // Hover state
        },
        accent: {
          pink: '#ff0066',     // Main accent (like Flagyard pink)
          purple: '#8b5cf6',   // Purple accent
          blue: '#3b82f6',     // Blue accent
          green: '#10b981',    // Success green
          orange: '#f97316',   // Orange accent
          yellow: '#fbbf24',   // Yellow for stars/points
        },
        neon: {
          pink: '#ff0066',
          purple: '#a855f7',
          blue: '#0ea5e9',
          green: '#22c55e',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(255, 0, 102), 0 0 10px rgb(255, 0, 102)' },
          '100%': { boxShadow: '0 0 20px rgb(255, 0, 102), 0 0 30px rgb(255, 0, 102)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #feca57 75%, #48c6ef 100%)',
      }
    },
  },
  plugins: [],
}

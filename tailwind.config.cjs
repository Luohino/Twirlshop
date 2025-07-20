/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#0066FF', // Regular blue instead of cyan
          purple: '#8A2BE2',
          pink: '#FF1493',
          green: '#00FF00',
        },
        dark: {
          100: '#0a0a0a', // Very dark background
          200: '#1a1a1a', // Card backgrounds
          300: '#2a2a2a', // Lighter elements
          400: '#3a3a3a', // Even lighter
        }
      },
      fontFamily: {
        'futuristic': ['Orbitron', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 5px #0066FF, 0 0 10px #0066FF, 0 0 15px #0066FF',
          },
          '100%': {
            boxShadow: '0 0 10px #0066FF, 0 0 20px #0066FF, 0 0 30px #0066FF',
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

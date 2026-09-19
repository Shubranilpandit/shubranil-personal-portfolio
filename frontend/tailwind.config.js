/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tron: {
          void: "#020408",
          dark: "#050b14",
          panel: "#081324",
          surface: "rgba(10, 22, 40, 0.7)",
          card: "rgba(6, 16, 32, 0.85)",
          border: "#0e294b",
          borderGlow: "#00f0ff55",
          cyan: "#00f0ff",
          cyanDim: "rgba(0, 240, 255, 0.12)",
          cyanBright: "#70f7ff",
          blue: "#0077ff",
          blueGlow: "rgba(0, 119, 255, 0.4)",
          amber: "#ff9900",
          amberGlow: "rgba(255, 153, 0, 0.4)",
          red: "#ff3344",
          green: "#00ffaa",
          muted: "#64748b",
          text: "#e2e8f0",
          heading: "#f8fafc",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Rajdhani"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow-sm': '0 0 10px rgba(0, 240, 255, 0.35)',
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.45)',
        'cyan-glow-lg': '0 0 35px rgba(0, 240, 255, 0.65)',
        'amber-glow': '0 0 20px rgba(255, 153, 0, 0.45)',
        'blue-glow': '0 0 25px rgba(0, 119, 255, 0.4)',
        'panel-inner': 'inset 0 0 15px rgba(0, 240, 255, 0.08)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 24s linear infinite',
        'radar': 'radarSweep 4s linear infinite',
        'data-stream': 'dataStream 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(0, 240, 255, 0.8))' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

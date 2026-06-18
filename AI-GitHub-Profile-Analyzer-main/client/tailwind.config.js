/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070d1c',
        panel: '#151f32',
        panelSoft: '#1b263b',
        line: '#293550',
        lavender: '#b9a7ff',
        violet: '#9d6cff',
        mint: '#42e985',
        cyan: '#49c7d8'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        glow: '0 22px 90px rgba(157, 108, 255, 0.2)'
      }
    }
  },
  plugins: []
};

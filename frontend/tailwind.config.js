// frontend/tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        mb: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#60a5fa', // main accent
          600: '#3b82f6',
          700: '#2563eb',
          800: '#1d4ed8',
          900: '#1e40af'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        glass: 'rgba(30, 41, 59, 0.6)'
      },
      backgroundColor: {
        'main-bg': '#0f172a',
        'card-bg': '#1e293b',
        'surface-bg': '#334155'
      },
      borderRadius: {
        'xl-2': '1.25rem',
        '2xl-3': '1.75rem'
      },
      boxShadow: {
        'mb-soft': '0 6px 20px rgba(59, 130, 246, 0.15)',
        'mb-elev': '0 10px 30px rgba(59, 130, 246, 0.25)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
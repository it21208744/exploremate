/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#12302A', soft: '#3D5A53', mute: '#6B827C' },
        tea: { 50: '#EEF6F2', 100: '#D5EADF', 200: '#A9D3BE', 400: '#4C9C79', 500: '#2A7D5E', 600: '#1F6B52', 700: '#185440', 800: '#123F31', 900: '#0C2A21' },
        turmeric: { 50: '#FDF6E3', 100: '#FAE8B8', 300: '#F2C14E', 400: '#EDB12E', 500: '#E8A317', 600: '#C4850B', 700: '#93620A' },
        mist: { DEFAULT: '#E6EEF0', 50: '#F3F7F8', 200: '#D3E0E3', 300: '#B7CCD1' },
        lagoon: { 50: '#E8F3F7', 500: '#2A7F9E', 600: '#226A85' },
        paper: '#FBFCFB',
        chili: { 50: '#FCEEEC', 500: '#C9452F', 600: '#A93623' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 1px 2px rgba(18,48,42,.06), 0 8px 24px -12px rgba(18,48,42,.18)',
        ticket: '0 30px 60px -30px rgba(12,42,33,.45)',
      },
      borderRadius: { panel: '20px' },
    },
  },
  plugins: [],
}

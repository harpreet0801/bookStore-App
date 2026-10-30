/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f4',
          100: '#f9eee4',
          200: '#f3dcc8',
          300: '#e9c3a3',
          400: '#dda279',
          500: '#ce7c4e',
          600: '#b8613c',
          700: '#994a30',
          800: '#7c3c2b',
          900: '#653326',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1), -3px 0 6px -2px rgba(0,0,0,0.1)',
        'book-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.08), -5px 0 10px -3px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}

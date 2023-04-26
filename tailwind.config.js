/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        },
        primary: {
          50: '#FEFCE8',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        green: {
          50: '#ECFDF3',
          300: '#6CE9A6',
          500: '#12B76A',
          700: '#027948',
          900: '#054F31',
        },
        red: {
          50: '#FFE5E5',
          300: '#FFADAD',
          500: '#EF4444',
          700: '#005085',
          900: '#8A2727',
        },
        blue: {
          50: '#E5EFFF',
          300: '#A3C6FF',
          500: '#3B82F6',
          700: '#2E66C2',
          900: '#224B8F',
        },
        purple: {
          50: '#F3E5FF',
          300: '#DFBDFF',
          500: '#A855F7',
          700: '#8644C4',
          900: '#633291',
        },
        gray: {
          50: '#E0E0E0',
          300: '#ADADAD',
          500: '#71717A',
          700: '#424247',
          900: '#131314',
        },
        warning: {
          50: '#FFFAEB',
          300: '#FEC84B',
          500: '#F79009',
          700: '#B54708',
          900: '#792E0D',
        },
        error: {
          50: '#FEF3F2',
          300: '#FDA29B',
          500: '#F04438',
          600: '#D63D32',
          700: '#B32318',
          900: '#7A271A',
        },
        shades: {
          'white': '#FFFFFF',
          'black': '#00000'
        }

      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-seri']
    }
  },
  plugins: [],
}


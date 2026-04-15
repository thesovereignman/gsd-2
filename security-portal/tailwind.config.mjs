/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand palette from shield design system
        navy: {
          DEFAULT: '#1B3A6B',
          light: '#2A5298',
          dark: '#0F2040',
        },
        ice: '#E8F1F8',
        shield: {
          red: '#F04438',
          yellow: '#F5C842',
          green: '#12B76A',
        },
        page: '#F5F8FA',
        muted: '#EFF3F7',
        border: '#D1D9E0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

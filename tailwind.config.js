const vercelPreset = require('@vercel/examples-ui/tailwind');

module.exports = {
  presets: [vercelPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@vercel/examples-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
};

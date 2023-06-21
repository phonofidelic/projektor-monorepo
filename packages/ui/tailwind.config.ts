import { Config } from 'tailwindcss'

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./lib/**/*.{js,jsx,ts,tsx,mdx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

const config = {
  content: ['./lib/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

export default config

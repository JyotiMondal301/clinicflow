import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#192c34', muted: '#71818a', line: '#e6eceb', canvas: '#f6f8f7', teal: '#137c72', mint: '#e4f4ef' }, boxShadow: { soft: '0 8px 28px rgba(25,44,52,.06)' } } }, plugins: [] };
export default config;

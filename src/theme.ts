// ============================================================
// KDU Asset Tracker – Mantine Theme
// ============================================================
import { createTheme, type MantineColorsTuple } from '@mantine/core';

const kduGold: MantineColorsTuple = [
  '#fff9e1',
  '#fff2cc',
  '#ffe49b',
  '#ffd564',
  '#ffc838',
  '#ffc01b',
  '#ffbb09',
  '#e3a400',
  '#ca9200',
  '#af7d00',
];

const kduNavy: MantineColorsTuple = [
  '#e8f1ff',
  '#d1dffa',
  '#a0bcf2',
  '#6d96eb',
  '#4476e5',
  '#2b63e1',
  '#1d58e0',
  '#0f49c7',
  '#0041b3',
  '#00379e',
];

export const theme = createTheme({
  primaryColor: 'kduNavy',
  colors: {
    kduGold,
    kduNavy,
  },
  fontFamily: '"Inter", "Noto Sans Sinhala", system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: '"Inter", "Noto Sans Sinhala", system-ui, -apple-system, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
  cursorType: 'pointer',
});

export type ThemeMode = 'light' | 'dark';

export const spacing = { xs: 6, sm: 10, md: 16, lg: 22, xl: 32, xxl: 44 } as const;
export const radius = { sm: 12, md: 18, lg: 26, xl: 34, pill: 999 } as const;

export const palette = {
  mustard: '#F4C542',
  ember: '#FF7A3D',
  success: '#50E3A4',
  danger: '#FF5B6E',
  dark: {
    background: '#090A0B',
    surface: '#111316',
    elevated: '#191C20',
    border: '#2A2F35',
    text: '#F7F5EF',
    muted: '#A0A7B2',
    shadow: '#000000',
  },
  light: {
    background: '#F7F4EC',
    surface: '#FFFFFF',
    elevated: '#FFF9EA',
    border: '#E7DEC6',
    text: '#171717',
    muted: '#68717D',
    shadow: '#B8A66D',
  },
} as const;

export const makeTheme = (mode: ThemeMode, primary = palette.mustard) => {
  const base = palette[mode];
  return {
    mode,
    colors: {
      ...base,
      primary,
      primarySoft: mode === 'dark' ? 'rgba(244,197,66,0.14)' : 'rgba(244,197,66,0.22)',
      overlay: mode === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(20,18,10,0.32)',
      success: palette.success,
      danger: palette.danger,
      gradientStart: mode === 'dark' ? '#171B20' : '#FFFFFF',
      gradientEnd: mode === 'dark' ? '#0C0D0F' : '#FFF2C1',
    },
    spacing,
    radius,
    typography: {
      title: 36,
      h1: 28,
      h2: 22,
      body: 16,
      small: 13,
      tiny: 11,
    },
  };
};

export type AppTheme = ReturnType<typeof makeTheme>;

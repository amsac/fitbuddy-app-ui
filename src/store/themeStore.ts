import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { makeTheme, ThemeMode } from '@/theme/tokens';

const THEME_STORAGE_KEY = 'fitbuddy.theme.mode';

type ThemeState = {
  mode: ThemeMode;
  hydrated: boolean;
  theme: ReturnType<typeof makeTheme>;
  hydrate: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
};
const isThemeMode = (value: string | null): value is ThemeMode => value === 'light' || value === 'dark';
export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'dark',
  hydrated: false,
  theme: makeTheme('dark'),
  hydrate: async () => {
    const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    const mode = isThemeMode(saved) ? saved : 'dark';
        set({ mode, hydrated: true, theme: makeTheme(mode) });
  },
  toggleTheme: async () => {
    const next = get().mode === 'dark' ? 'light' : 'dark';
    await AsyncStorage.setItem(THEME_STORAGE_KEY, next);
    set({ mode: next, theme: makeTheme(next) });
  },
  setMode: async (mode) => {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    set({ mode, theme: makeTheme(mode) });
  },
}));

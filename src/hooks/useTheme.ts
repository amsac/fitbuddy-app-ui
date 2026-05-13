import { useThemeStore } from '@/store/themeStore';

export const useTheme = () => useThemeStore((state) => state.theme);
export const useThemeMode = () => useThemeStore((state) => state.mode);
export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme);

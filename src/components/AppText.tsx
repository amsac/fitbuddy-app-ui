import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Variant = 'title' | 'h1' | 'h2' | 'body' | 'small' | 'tiny';

export function AppText({ children, variant = 'body', muted, style }: { children: ReactNode; variant?: Variant; muted?: boolean; style?: TextStyle }) {
  const theme = useTheme();
  return <Text style={[styles.base, { color: muted ? theme.colors.muted : theme.colors.text, fontSize: theme.typography[variant] }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: { fontWeight: '600', letterSpacing: -0.2 },
});

import { ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { useTheme } from '@/hooks/useTheme';

export function Input(props: TextInputProps) {
  const theme = useTheme();
  return <TextInput placeholderTextColor={theme.colors.muted} {...props} style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }, props.style]} />;
}

export function Chip({ children, active, onPress }: { children: ReactNode; active?: boolean; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.chip, { backgroundColor: active ? theme.colors.primary : theme.colors.surface, borderColor: active ? theme.colors.primary : theme.colors.border }]}> 
      <AppText variant="small" style={{ color: active ? '#111' : theme.colors.text }}>{children}</AppText>
    </Pressable>
  );
}

export function SetPill({ label, value }: { label: string; value: string | number }) {
  const theme = useTheme();
  return <View style={[styles.pill, { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.border }]}><AppText variant="tiny" muted>{label}</AppText><AppText>{value}</AppText></View>;
}

const styles = StyleSheet.create({ input: { minHeight: 52, borderWidth: 1, paddingHorizontal: 16, fontSize: 16, fontWeight: '700' }, chip: { borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, marginRight: 8 }, pill: { minWidth: 76, borderWidth: 1, borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' } });

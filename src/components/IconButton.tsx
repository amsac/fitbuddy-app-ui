import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export function IconButton({ name, onPress }: { name: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.button, { backgroundColor: theme.colors.elevated, borderColor: theme.colors.border }]}>
      <Ionicons name={name} size={22} color={theme.colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({ button: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center' } });

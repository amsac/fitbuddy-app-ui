import { ReactNode } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

type Props = { children: ReactNode; scroll?: boolean; style?: ViewStyle };

export function Screen({ children, scroll = true, style }: Props) {
  const theme = useTheme();
  const content = [styles.content, { padding: theme.spacing.md }, style];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}> 
      {scroll ? (
        <ScrollView contentContainerStyle={content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 40 },
});

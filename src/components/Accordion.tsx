import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';

export function Accordion({ title, subtitle, right, open, onToggle, children }: { title: string; subtitle?: string; right?: ReactNode; open: boolean; onToggle: () => void; children: ReactNode }) {
  const theme = useTheme();
  return (
    <Animated.View layout={LinearTransition.springify().damping(18)}>
      <Card style={styles.wrapper} elevated>
        <Pressable onPress={onToggle} style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="h2">{title}</AppText>
            {subtitle ? <AppText variant="small" muted>{subtitle}</AppText> : null}
          </View>
          {right}
          <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={22} color={theme.colors.primary} />
        </Pressable>
        {open ? <Animated.View layout={LinearTransition.springify().damping(18)} style={styles.body}>{children}</Animated.View> : null}
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({ wrapper: { marginBottom: 14 }, header: { flexDirection: 'row', alignItems: 'center', gap: 10 }, headerText: { flex: 1 }, body: { marginTop: 16 } });

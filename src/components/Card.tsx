import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = { children: ReactNode; onPress?: () => void; style?: ViewStyle; elevated?: boolean };

export function Card({ children, onPress, style, elevated = true }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const commonStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.lg,
      shadowColor: theme.colors.shadow,
      shadowOpacity: elevated ? 0.22 : 0,
    },
    style,
  ];

  if (!onPress) return <View style={commonStyle}>{children}</View>;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.98))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[commonStyle, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 24,
    elevation: 8,
  },
});

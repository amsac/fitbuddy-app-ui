import { ReactNode } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AppText } from '@/components/AppText';
import { useTheme } from '@/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({ children, onPress, disabled, style }: { children: ReactNode; onPress: () => void; disabled?: boolean; style?: ViewStyle }) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: disabled ? 0.55 : 1, transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[animatedStyle, style]}
    >
      <LinearGradient colors={[theme.colors.primary, '#FFDE73']} style={[styles.button, { borderRadius: theme.radius.md }]}> 
        <AppText style={styles.text}>{children}</AppText>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({ button: { minHeight: 56, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 }, text: { color: '#111', fontWeight: '900' } });

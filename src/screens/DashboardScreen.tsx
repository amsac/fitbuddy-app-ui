import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/IconButton';
import { Screen } from '@/components/Screen';
import { useTheme, useThemeMode, useToggleTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const theme = useTheme();
  const mode = useThemeMode();
  const toggleTheme = useToggleTheme();
  const actions = [
    { title: 'View Exercises', subtitle: 'Browse movement demos and coaching cues', icon: 'barbell', route: 'Exercises' },
    { title: 'Create Template', subtitle: 'Build your next premium workout split', icon: 'add-circle', route: 'CreateTemplate' },
    { title: 'Start Workout', subtitle: 'Pick a template and begin tracking sets', icon: 'flash', route: 'StartWorkout' },
  ] as const;

  return (
    <Screen>
      <View style={styles.topbar}>
        <IconButton name={mode === 'dark' ? 'sunny' : 'moon'} onPress={toggleTheme} />
        <IconButton name="time" onPress={() => navigation.navigate('History')} />
      </View>
      <LinearGradient colors={[theme.colors.gradientStart, theme.colors.gradientEnd]} style={[styles.hero, { borderColor: theme.colors.border, borderRadius: theme.radius.xl }]}> 
        <View style={[styles.mark, { backgroundColor: theme.colors.primary }]}> 
          <Ionicons name="fitness" size={34} color="#111" />
        </View>
        <AppText variant="title" style={styles.logo}>FITBUDDY</AppText>
        <AppText muted style={styles.tagline}>Train with intention. Track every rep. Finish stronger.</AppText>
      </LinearGradient>
      <View style={styles.actions}>
        {actions.map((action) => (
          <Card key={action.title} onPress={() => navigation.navigate(action.route)} style={styles.actionCard}>
            <View style={[styles.iconBubble, { backgroundColor: theme.colors.primarySoft }]}> 
              <Ionicons name={action.icon} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.actionText}>
              <AppText variant="h2">{action.title}</AppText>
              <AppText variant="small" muted>{action.subtitle}</AppText>
            </View>
            <Ionicons name="chevron-forward" size={22} color={theme.colors.muted} />
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ topbar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 }, hero: { minHeight: 310, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 26, marginBottom: 24 }, mark: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }, logo: { fontWeight: '900', letterSpacing: 3 }, tagline: { textAlign: 'center', marginTop: 10, lineHeight: 22 }, actions: { gap: 14 }, actionCard: { flexDirection: 'row', alignItems: 'center', gap: 14 }, iconBubble: { width: 50, height: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, actionText: { flex: 1 } });

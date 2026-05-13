import { NavigationContainer, DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { ExerciseCatalogScreen } from '@/screens/ExerciseCatalogScreen';
import { CreateTemplateScreen } from '@/screens/CreateTemplateScreen';
import { StartWorkoutScreen } from '@/screens/StartWorkoutScreen';
import { WorkoutSessionScreen } from '@/screens/WorkoutSessionScreen';
import { WorkoutHistoryScreen } from '@/screens/WorkoutHistoryScreen';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const appTheme = useTheme();
  const isDark = appTheme.mode === 'dark';
  const baseNavTheme = isDark ? DarkTheme : DefaultTheme;
  const navTheme: NavigationTheme = {
    ...baseNavTheme,
    dark: isDark,
    colors: {
      ...baseNavTheme.colors,
      background: appTheme.colors.background,
      card: appTheme.colors.background,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
      primary: appTheme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: appTheme.colors.background },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Exercises" component={ExerciseCatalogScreen} />
        <Stack.Screen name="CreateTemplate" component={CreateTemplateScreen} />
        <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
        <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="History" component={WorkoutHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/navigation/AppNavigator';
import { ToastProvider } from '@/components/Toast';
import { useThemeStore } from '@/store/themeStore';

export default function App() {
  const hydrate = useThemeStore((state) => state.hydrate);
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
          <AppNavigator />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { AppText } from '@/components/AppText';
import { useTheme } from '@/hooks/useTheme';

type ToastType = 'success' | 'error' | 'info';
type ToastContextValue = { showToast: (message: string, type?: ToastType) => void };
const ToastContext = createContext<ToastContextValue>({ showToast: () => undefined });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const [toast, setToast] = useState<{ message: string; type: ToastType; id: number } | null>(null);
  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2800);
  }, []);
  const value = useMemo(() => ({ showToast }), [showToast]);
  const accent = toast?.type === 'error' ? theme.colors.danger : toast?.type === 'info' ? theme.colors.primary : theme.colors.success;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View entering={FadeInDown.springify()} exiting={FadeOutUp} style={[styles.toast, { backgroundColor: theme.colors.elevated, borderColor: accent }]}> 
          <AppText>{toast.message}</AppText>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({ toast: { position: 'absolute', left: 18, right: 18, bottom: 38, borderWidth: 1, borderRadius: 20, padding: 16, alignItems: 'center', zIndex: 50 } });

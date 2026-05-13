import { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';

export function AppModal({ visible, title, children, confirmLabel = 'Confirm', onConfirm, onCancel }: { visible: boolean; title: string; children: ReactNode; confirmLabel?: string; onConfirm: () => void; onCancel: () => void }) {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}> 
        <Card style={styles.card}>
          <AppText variant="h2" style={styles.title}>{title}</AppText>
          {children}
          <PrimaryButton onPress={onConfirm} style={styles.button}>{confirmLabel}</PrimaryButton>
          <Pressable onPress={onCancel} style={styles.cancel}><AppText muted>Cancel</AppText></Pressable>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({ backdrop: { flex: 1, justifyContent: 'center', padding: 22 }, card: { padding: 22 }, title: { textAlign: 'center', marginBottom: 12 }, button: { marginTop: 18 }, cancel: { alignItems: 'center', padding: 14 } });

import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getTemplates, startSession } from '@/api/fitbuddy';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/IconButton';
import { Screen } from '@/components/Screen';
import { useToast } from '@/components/Toast';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';
import { Template } from '@/types/models';
import { templateIdOf } from '@/utils/text';

type Props = NativeStackScreenProps<RootStackParamList, 'StartWorkout'>;

export function StartWorkoutScreen({ navigation }: Props) {
  const theme = useTheme();
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [startingId, setStartingId] = useState<number | null>(null);

  useEffect(() => { getTemplates().then(setTemplates).catch(() => showToast('Could not load templates.', 'error')); }, [showToast]);

  const begin = async (template: Template) => {
    const id = templateIdOf(template);
    if (!id) return;
    setStartingId(id);
    startSession(id)
      .then((session) => navigation.navigate('WorkoutSession', { session }))
      .catch(() => showToast('Failed to start workout.', 'error'))
      .finally(() => setStartingId(null));
  };

  return (
    <Screen>
      <View style={styles.header}><IconButton name="arrow-back" onPress={() => navigation.goBack()} /><AppText variant="h1">Start Workout</AppText></View>
      {templates.map((template) => {
        const id = templateIdOf(template);
        return <Card key={id || template.name} onPress={() => begin(template)} style={styles.card}><View style={[styles.badge, { backgroundColor: theme.colors.primarySoft }]}><Ionicons name="play" size={22} color={theme.colors.primary} /></View><View style={styles.flex}><AppText variant="h2">{template.name}</AppText><AppText muted>{template.description}</AppText>{template.level ? <AppText variant="tiny" muted>{template.level}</AppText> : null}</View><AppText variant="small" muted>{startingId === id ? 'Starting...' : 'Tap to begin'}</AppText></Card>;
      })}
      {templates.length === 0 ? <AppText muted>No templates yet. Create one first.</AppText> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }, card: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 }, badge: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, flex: { flex: 1, gap: 4 } });

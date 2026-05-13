import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCompletedSessions } from '@/api/fitbuddy';
import { Accordion } from '@/components/Accordion';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/IconButton';
import { Screen } from '@/components/Screen';
import { SetPill } from '@/components/FormControls';
import { useToast } from '@/components/Toast';
import { RootStackParamList } from '@/navigation/types';
import { CompletedSession } from '@/types/models';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export function WorkoutHistoryScreen({ navigation }: Props) {
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<CompletedSession[]>([]);
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  useEffect(() => { getCompletedSessions().then(setSessions).catch(() => showToast('Could not load history.', 'error')); }, [showToast]);

  return (
    <Screen>
      <View style={styles.header}><IconButton name="arrow-back" onPress={() => navigation.goBack()} /><AppText variant="h1">Workout History</AppText></View>
      {sessions.map((session) => {
        const open = activeSession === session.sessionId;
        return (
          <Accordion key={session.sessionId} title={session.templateName} subtitle={session.completedAt ? new Date(session.completedAt).toLocaleDateString() : session.date} open={open} onToggle={() => setActiveSession(open ? null : session.sessionId)}>
            {session.exercises.map((exercise) => {
              const id = `${session.sessionId}-${exercise.exerciseName}`;
              const exerciseOpen = activeExercise === id;
              return <Card key={id} onPress={() => setActiveExercise(exerciseOpen ? null : id)} style={styles.exercise}><AppText>{exercise.exerciseName}</AppText>{exerciseOpen ? <View style={styles.sets}>{exercise.sets.map((set, index) => <View key={`${id}-${index}`} style={styles.setRow}><SetPill label="Set" value={set.setNumber ?? index + 1} /><SetPill label="Reps" value={set.reps} /><SetPill label="Kg" value={set.weight} /></View>)}</View> : <AppText variant="small" muted>{exercise.sets.length} logged sets</AppText>}</Card>;
            })}
          </Accordion>
        );
      })}
      {sessions.length === 0 ? <AppText muted style={styles.empty}>Completed workouts will appear here.</AppText> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }, exercise: { marginBottom: 10, gap: 10 }, sets: { gap: 8, marginTop: 6 }, setRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 }, empty: { textAlign: 'center', marginTop: 40 } });

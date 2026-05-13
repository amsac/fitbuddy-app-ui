import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { completeSession, logSet } from '@/api/fitbuddy';
import { Accordion } from '@/components/Accordion';
import { AppModal } from '@/components/AppModal';
import { AppText } from '@/components/AppText';
import { Input, SetPill } from '@/components/FormControls';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useToast } from '@/components/Toast';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';
import { LoggedSet } from '@/types/models';
import { splitPipes } from '@/utils/text';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutSession'>;
type Inputs = Record<number, { reps: string; weight: string }>;

export function WorkoutSessionScreen({ route, navigation }: Props) {
  const { session } = route.params;
  const theme = useTheme();
  const { showToast } = useToast();
  const [active, setActive] = useState<number | null>(session.exercises[0]?.exerciseLogId ?? null);
  const [logs, setLogs] = useState<Record<number, LoggedSet[]>>({});
  const [inputs, setInputs] = useState<Inputs>({});
  const [timers, setTimers] = useState<Record<number, number>>({});
  const [confirmFinish, setConfirmFinish] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimers((prev) => Object.fromEntries(Object.entries(prev).map(([key, value]) => [key, Math.max(0, value - 1)]))), 1000);
    return () => clearInterval(interval);
  }, []);

  const allDone = useMemo(() => session.exercises.every((ex) => (logs[ex.exerciseLogId] ?? []).length >= ex.targetSets), [logs, session.exercises]);

  const updateInput = (id: number, key: 'reps' | 'weight', value: string) => setInputs((prev) => ({ ...prev, [id]: { reps: prev[id]?.reps ?? '', weight: prev[id]?.weight ?? '', [key]: value } }));

  const submitSet = async (exerciseLogId: number) => {
    const input = inputs[exerciseLogId];
    const reps = Number(input?.reps);
    const weight = Number(input?.weight || 0);
    if (!reps) { showToast('Enter reps for this set.', 'error'); return; }
    await logSet({ exerciseLogId, reps, weight });
    setLogs((prev) => ({ ...prev, [exerciseLogId]: [...(prev[exerciseLogId] ?? []), { reps, weight }] }));
    setInputs((prev) => ({ ...prev, [exerciseLogId]: { reps: '', weight: '' } }));
    setTimers((prev) => ({ ...prev, [exerciseLogId]: 60 }));
  };

  const finish = () => {
    completeSession(session.sessionId)
      .then(() => { setConfirmFinish(false); showToast('Workout completed 🎉'); navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] }); })
      .catch(() => showToast('Could not finish workout.', 'error'));
  };

  return (
    <Screen>
      <AppText variant="h1" style={styles.title}>{session.templateName}</AppText>
      {session.exercises.map((exercise) => {
        const done = logs[exercise.exerciseLogId] ?? [];
        const timer = timers[exercise.exerciseLogId] ?? 0;
        const complete = done.length >= exercise.targetSets;
        const open = active === exercise.exerciseLogId;
        return (
          <Accordion key={exercise.exerciseLogId} title={exercise.exerciseName} subtitle={`${done.length}/${exercise.targetSets} sets complete`} open={open} onToggle={() => setActive(open ? null : exercise.exerciseLogId)} right={complete ? <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} /> : null}>
            <VideoPlayer uri={exercise.videoUrl} />
            <AppText muted style={styles.overview}>{splitPipes(exercise.overview).slice(0, 2).join(' ') || exercise.overview}</AppText>
            <View style={styles.sets}>{done.map((set, index) => <View key={`${exercise.exerciseLogId}-${index}`} style={styles.setRow}><SetPill label="Set" value={index + 1} /><SetPill label="Reps" value={set.reps} /><SetPill label="Kg" value={set.weight} /></View>)}</View>
            {complete ? <AppText style={[styles.completed, { color: theme.colors.success }]}>Completed — great work.</AppText> : <View style={styles.logging}><AppText>Set {done.length + 1} / {exercise.targetSets}</AppText><View style={styles.inputs}><Input placeholder="Reps" keyboardType="number-pad" value={inputs[exercise.exerciseLogId]?.reps ?? ''} onChangeText={(value) => updateInput(exercise.exerciseLogId, 'reps', value)} style={styles.input} /><Input placeholder="Weight" keyboardType="decimal-pad" value={inputs[exercise.exerciseLogId]?.weight ?? ''} onChangeText={(value) => updateInput(exercise.exerciseLogId, 'weight', value)} style={styles.input} /></View><PrimaryButton onPress={() => submitSet(exercise.exerciseLogId)} disabled={timer > 0}>{timer > 0 ? `Rest ${timer}s` : '+ Log Set'}</PrimaryButton></View>}
          </Accordion>
        );
      })}
      <PrimaryButton onPress={() => setConfirmFinish(true)} disabled={!allDone} style={styles.finish}>{allDone ? 'Finish Workout' : 'Complete all target sets'}</PrimaryButton>
      <AppModal visible={confirmFinish} title="Finish workout?" confirmLabel="Complete Workout" onConfirm={finish} onCancel={() => setConfirmFinish(false)}><AppText muted style={styles.modalText}>This will save the session and return you to the dashboard.</AppText></AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({ title: { textAlign: 'center', marginBottom: 20 }, overview: { marginTop: 12, lineHeight: 22 }, sets: { gap: 8, marginVertical: 14 }, setRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 }, logging: { gap: 12, alignItems: 'center' }, inputs: { flexDirection: 'row', gap: 10 }, input: { width: 118, textAlign: 'center' }, completed: { textAlign: 'center', marginTop: 14 }, finish: { marginTop: 12 }, modalText: { textAlign: 'center', lineHeight: 22 } });

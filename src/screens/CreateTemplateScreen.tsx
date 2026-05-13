import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { createTemplate, getExercises } from '@/api/fitbuddy';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { Chip, Input } from '@/components/FormControls';
import { IconButton } from '@/components/IconButton';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useToast } from '@/components/Toast';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';
import { Exercise } from '@/types/models';

const MUSCLE_GROUPS = ['ALL', 'chest', 'legs', 'back', 'biceps', 'triceps', 'shoulders', 'core'];
const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

type SelectedExercise = { exerciseId: number; externalId?: string; name: string; targetSets: number; targetReps: number };
type Props = NativeStackScreenProps<RootStackParamList, 'CreateTemplate'>;

export function CreateTemplateScreen({ navigation }: Props) {
  const theme = useTheme();
  const { showToast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selected, setSelected] = useState<SelectedExercise[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('BEGINNER');
  const [search, setSearch] = useState('');
  const [muscle, setMuscle] = useState('ALL');
  const [saving, setSaving] = useState(false);

  useEffect(() => { getExercises().then(setExercises); }, []);

  const filtered = useMemo(() => exercises.filter((ex) => ex.name.toLowerCase().includes(search.toLowerCase()) && (muscle === 'ALL' || ex.muscleGroup === muscle)), [exercises, muscle, search]);
  const isSelected = (id: number) => selected.some((ex) => ex.exerciseId === id);

  const toggleExercise = (exercise: Exercise) => {
    if (isSelected(exercise.id)) setSelected((items) => items.filter((item) => item.exerciseId !== exercise.id));
    else setSelected((items) => [...items, { exerciseId: exercise.id, externalId: exercise.externalId, name: exercise.name, targetSets: 3, targetReps: 10 }]);
  };

  const updateSelected = (index: number, key: 'targetSets' | 'targetReps', value: string) => {
    setSelected((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: Number(value) || 0 } : item));
  };

  const submit = async () => {
    if (!name.trim() || selected.length === 0) {
      showToast('Add a name and at least one exercise.', 'error');
      return;
    }
    setSaving(true);
    createTemplate({ name, description, level, exercises: selected.map(({ name: _name, ...rest }) => rest) })
      .then(() => { showToast('Template created 🎉'); navigation.replace('Dashboard'); })
      .catch(() => showToast('Failed to create template.', 'error'))
      .finally(() => setSaving(false));
  };

  return (
    <Screen>
      <View style={styles.header}><IconButton name="arrow-back" onPress={() => navigation.goBack()} /><AppText variant="h1">Create Template</AppText></View>
      <Card style={styles.form}>
        <Input placeholder="Template name" value={name} onChangeText={setName} />
        <Input placeholder="Description" value={description} onChangeText={setDescription} multiline style={styles.description} />
        <View style={styles.row}>{LEVELS.map((item) => <Chip key={item} active={level === item} onPress={() => setLevel(item)}>{item}</Chip>)}</View>
      </Card>
      <Input placeholder="Search exercises..." value={search} onChangeText={setSearch} style={styles.search} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>{MUSCLE_GROUPS.map((item) => <Chip key={item} active={muscle === item} onPress={() => setMuscle(item)}>{item}</Chip>)}</ScrollView>
      <View style={styles.list}>{filtered.map((exercise) => <Card key={exercise.id} style={styles.exerciseCard}><Image source={{ uri: exercise.imageUrl }} style={[styles.image, { borderRadius: theme.radius.md }]} /><View style={styles.flex}><AppText>{exercise.name}</AppText><AppText variant="small" muted>{exercise.muscleGroup}</AppText></View><Pressable onPress={() => toggleExercise(exercise)} style={[styles.add, { backgroundColor: isSelected(exercise.id) ? theme.colors.danger : theme.colors.primary }]}><AppText variant="small" style={{ color: '#111' }}>{isSelected(exercise.id) ? 'Remove' : 'Add'}</AppText></Pressable></Card>)}</View>
      <AppText variant="h2" style={styles.sectionTitle}>Selected Exercises</AppText>
      {selected.map((exercise, index) => <Card key={exercise.exerciseId} style={styles.selected}><AppText style={styles.flex}>{exercise.name}</AppText><Input keyboardType="number-pad" value={String(exercise.targetSets)} onChangeText={(value) => updateSelected(index, 'targetSets', value)} style={styles.smallInput} /><Input keyboardType="number-pad" value={String(exercise.targetReps)} onChangeText={(value) => updateSelected(index, 'targetReps', value)} style={styles.smallInput} /></Card>)}
      <PrimaryButton onPress={submit} disabled={saving} style={styles.submit}>{saving ? 'Creating...' : 'Create Template'}</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }, form: { gap: 12 }, description: { minHeight: 86, paddingTop: 14 }, row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, search: { marginTop: 16 }, chips: { marginVertical: 14 }, list: { gap: 12 }, exerciseCard: { flexDirection: 'row', alignItems: 'center', gap: 12 }, image: { width: 58, height: 58, backgroundColor: '#111' }, flex: { flex: 1 }, add: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 }, sectionTitle: { marginTop: 24, marginBottom: 10 }, selected: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }, smallInput: { width: 70, textAlign: 'center', paddingHorizontal: 4 }, submit: { marginTop: 18 } });

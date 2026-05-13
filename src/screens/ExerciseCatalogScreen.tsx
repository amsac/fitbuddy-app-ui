import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Accordion } from '@/components/Accordion';
import { AppText } from '@/components/AppText';
import { IconButton } from '@/components/IconButton';
import { Screen } from '@/components/Screen';
import { VideoPlayer } from '@/components/VideoPlayer';
import { getExercises } from '@/api/fitbuddy';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';
import { Exercise } from '@/types/models';
import { splitPipes } from '@/utils/text';

type Props = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

export function ExerciseCatalogScreen({ navigation }: Props) {
  const theme = useTheme();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExercises().then(setExercises).finally(() => setLoading(false));
  }, []);

  return (
    <Screen>
      <View style={styles.header}><IconButton name="arrow-back" onPress={() => navigation.goBack()} /><AppText variant="h1">Exercise Catalog</AppText></View>
      {loading ? <AppText muted>Loading exercise library...</AppText> : null}
      {exercises.map((exercise) => {
        const open = active === exercise.id;
        return (
          <Accordion key={exercise.id} title={exercise.name} subtitle={exercise.muscleGroup} open={open} onToggle={() => setActive(open ? null : exercise.id)} right={<Image source={{ uri: exercise.imageUrl }} style={[styles.thumb, { borderRadius: theme.radius.md }]} />}>
            <VideoPlayer uri={exercise.videoUrl} />
            <AppText style={styles.overview}>{exercise.overview}</AppText>
            <View style={styles.instructions}>{splitPipes(exercise.instructions).map((step, index) => <AppText key={`${step}-${index}`} muted style={styles.bullet}>• {step}</AppText>)}</View>
          </Accordion>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }, thumb: { width: 58, height: 58, backgroundColor: '#111' }, overview: { marginTop: 14, lineHeight: 23 }, instructions: { marginTop: 10, gap: 6 }, bullet: { lineHeight: 21 } });

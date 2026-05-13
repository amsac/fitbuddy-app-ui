import { StartedSession } from '@/types/models';

export type RootStackParamList = {
  Dashboard: undefined;
  Exercises: undefined;
  CreateTemplate: undefined;
  StartWorkout: undefined;
  WorkoutSession: { session: StartedSession };
  History: undefined;
};

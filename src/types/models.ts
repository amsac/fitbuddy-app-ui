export type Exercise = {
  id: number;
  externalId?: string;
  imageUrl: string;
  instructions: string;
  muscleGroup: string;
  name: string;
  overview: string;
  videoUrl: string;
};

export type Template = {
  id?: number;
  templateId?: number;
  name: string;
  description: string;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
};

export type SessionExercise = {
  exerciseLogId: number;
  exerciseName: string;
  videoUrl: string;
  overview: string;
  targetSets: number;
  targetReps: number;
};

export type StartedSession = {
  sessionId: number;
  templateName: string;
  exercises: SessionExercise[];
};

export type LoggedSet = {
  setNumber?: number;
  reps: number;
  weight: number;
};

export type CompletedSession = {
  sessionId: number;
  templateName: string;
  date: string;
  completedAt: string;
  exercises: Array<{
    exerciseName: string;
    sets: LoggedSet[];
  }>;
};

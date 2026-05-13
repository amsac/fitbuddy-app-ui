import { api } from '@/api/client';
import { CompletedSession, Exercise, StartedSession, Template } from '@/types/models';

export const USER_ID = 1;

export type TemplateExerciseInput = {
  exerciseId: number;
  externalId?: string;
  targetSets: number;
  targetReps: number;
};

export const getExercises = async () => (await api.get<Exercise[]>('/exercises')).data;

export const createTemplate = async (payload: {
  name: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  exercises: TemplateExerciseInput[];
}) => api.post('/templates', { ...payload, createdBy: USER_ID });

export const getTemplates = async () => (await api.get<Template[]>('/templates')).data;

export const startSession = async (templateId: number) =>
  (await api.post<StartedSession>('/sessions/start', { userId: USER_ID, templateId })).data;

export const logSet = async (payload: { exerciseLogId: number; reps: number; weight: number }) =>
  api.post('/sets', payload);

export const completeSession = async (sessionId: number) => api.post(`/sessions/${sessionId}/complete`);

export const getCompletedSessions = async () =>
  (await api.get<CompletedSession[]>(`/sessions/users/${USER_ID}/completed`)).data;

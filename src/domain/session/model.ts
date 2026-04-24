import type { ExerciseId } from "../exercise";
import type { ExerciseSet } from "../set";
import type { WorkoutId } from "../workout";

export type WorkoutSessionId = string;

export type WorkoutSession = {
  id: WorkoutSessionId;
  template?: WorkoutId;
  notes?: string;
  started_at: number;
  finished_at?: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
};

export type ExerciseLog = {
  id: string;
  session_id: WorkoutSessionId;
  planned_exercise_id?: ExerciseId;
  actual_exercise_id: ExerciseId;
  notes?: string;
  order: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
};

export type ExerciseSetLog = {
  id: string;
  exercise_log_id: string;
  order: number;
  completed_at: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
} & ExerciseSet;

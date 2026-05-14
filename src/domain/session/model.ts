import { type Branded, nominal } from "../shared";
import { type ExerciseId } from "../exercise";
import { type ExerciseSet } from "../set";
import { type WorkoutId } from "../workout";

export type WorkoutSessionId = Branded<string, "workout_session_id">;

export const WorkoutSessionId = nominal<WorkoutSessionId>();

export type WorkoutSession = {
  id: WorkoutSessionId;
  template: WorkoutId | null;
  notes?: string;
  started_at: number;
  finished_at: number | null;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

export type ExerciseLogId = Branded<string, "exercise_log_id">;

export const ExerciseLogId = nominal<ExerciseLogId>();

export type ExerciseLog = {
  id: ExerciseLogId;
  session_id: WorkoutSessionId;
  planned_exercise_id: ExerciseId | null;
  actual_exercise_id: ExerciseId;
  notes?: string;
  order: number;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

export type SetLogId = Branded<string, "set_log_id">;

export const SetLogId = nominal<SetLogId>();

export type SetLog = {
  id: SetLogId;
  exercise_log_id: ExerciseLogId;
  set: ExerciseSet;
  order: number;
  completed_at: number;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

import type { ExerciseId } from "../exercise";
import type { ExerciseSet } from "../set";

export type WorkoutId = string;

export type Workout = {
  id: WorkoutId;
  name: string;
  exercise_plans: {
    exercise_id: ExerciseId;
    target?: ExerciseSet[];
    order: number;
  }[];
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

import type { ExerciseId } from "../exercise";
import type { ExerciseSet } from "../set";
import { nominal } from "../shared";

export type WorkoutId = string & { readonly _brand: "workout_id" };

export const WorkoutId = nominal<WorkoutId>();

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

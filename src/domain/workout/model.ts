import { type ExerciseId } from "../exercise";
import { type ExerciseSet } from "../set";
import { type Branded, nominal } from "../shared";

export type WorkoutId = Branded<string, "workout_id">;

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

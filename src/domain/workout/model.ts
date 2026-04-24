import { ExerciseId } from "../exercise";

export type WorkoutId = string;

export type Workout = {
  id: WorkoutId;
  name: string;
  exercise_plans: {
    exercise_id: ExerciseId;
    target_sets?: number;
    target_reps?: number;
    order: number;
  }[];
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

import { type Branded, nominal } from "../shared";
import { type WorkoutId } from "../workout";

export type RoutineId = Branded<string, "routine_id">;

export const RoutineId = nominal<RoutineId>();

export type Routine = {
  id: RoutineId;
  name: string;
  workouts: RoutineWorkout[];
  archived_at: number | null;
  updated_at: number;
  created_at: number;
  deleted_at: number | null;
};

export type RoutineWorkout = {
  id: WorkoutId;
  order: number;
};

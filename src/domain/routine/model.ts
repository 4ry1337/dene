import { type Branded, nominal } from "../shared";
import { type WorkoutId } from "../workout";

export type RoutineId = Branded<string, "routine_id">;

export const RoutineId = nominal<RoutineId>();

export type Routine = {
  id: RoutineId;
  name: string;
  workouts: {
    id: WorkoutId;
    order: number;
  }[];
  archived_at?: number;
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

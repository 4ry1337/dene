import { nominal } from "../shared";
import type { WorkoutId } from "../workout";

export type RoutineId = string & { readonly _brand: "routine_id" };

export const RoutineId = nominal<RoutineId>();

export type Routine = {
  id: RoutineId;
  name: string;
  workouts: {
    id: WorkoutId;
    order: number;
  }[];
  archived_at: number | null;
  updated_at: number;
  created_at: number;
  deleted_at?: number | null;
};

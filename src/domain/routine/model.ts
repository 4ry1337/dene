import { WorkoutId } from "../workout";

export type RoutineId = string;

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

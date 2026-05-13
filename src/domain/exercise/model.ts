import { MuscleId } from "../muscle";

export type ExerciseId = string;

export const ExerciseId = {
  from(value: string): ExerciseId {
    return value as ExerciseId;
  },
} as const;

export type Exercise = {
  id: ExerciseId;
  name: string;
  primary_muscles: MuscleId[];
  secondary_muscles: MuscleId[];
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

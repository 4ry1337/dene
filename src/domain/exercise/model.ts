import { MuscleId } from "../muscle";
import { nominal } from "../shared";

export type ExerciseId = string & { readonly _brand: "exercise_id" };

export const ExerciseId = nominal<ExerciseId>();

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

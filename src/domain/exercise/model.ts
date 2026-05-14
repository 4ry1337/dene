import { type MuscleId } from "../muscle";
import { type Branded, nominal } from "../shared";

export type ExerciseId = Branded<string, "exercise_id">;

export const ExerciseId = nominal<ExerciseId>();

export type Exercise = {
  id: ExerciseId;
  name: string;
  primary_muscles: MuscleId[];
  secondary_muscles: MuscleId[];
  updated_at: number;
  created_at: number;
  deleted_at: number | null;
};

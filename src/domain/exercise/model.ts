export type ExerciseId = string;

export type Exercise = {
  id: ExerciseId;
  name: string;
  primary_muscles: MuscleId[];
  secondary_muscles: MuscleId[];
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

export type MuscleId = string;

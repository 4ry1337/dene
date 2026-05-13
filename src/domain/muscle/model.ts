export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "core"
  | "legs";

export type MuscleId = string;

export type Muscle = {
  id: MuscleId;
  name: string;
  group: MuscleGroup;
  updated_at: number;
  created_at: number;
  deleted_at?: number;
};

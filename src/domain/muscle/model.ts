import { type Branded, nominal } from "../shared";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "core"
  | "legs";

export type MuscleId = Branded<string, "muscle_id">;

export const MuscleId = nominal<MuscleId>();

export type Muscle = {
  id: MuscleId;
  name: string;
  group: MuscleGroup;
  updated_at: number;
  created_at: number;
  deleted_at: number | null;
};

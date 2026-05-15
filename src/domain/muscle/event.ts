import { type Event } from "../event";
import { type MuscleGroup, type MuscleId } from "./model";

export type MuscleEvent =
  | Event<"muscle_created", { id: MuscleId; name: string; group?: MuscleGroup }>
  | Event<
      "muscle_updated",
      { id: MuscleId; name?: string; group?: MuscleGroup }
    >
  | Event<"muscle_deleted", { id: MuscleId }>;

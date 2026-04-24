import { WorkoutId } from "../workout"

export type WorkoutSessionId = string

export type WorkoutSession = {
  id: WorkoutSessionId,
  workout_template: WorkoutId,
  started_at: number,
  finished_at: number,
  created_at: number,
  updated_at: number,
  deleted_at?: number
}

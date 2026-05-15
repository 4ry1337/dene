import { type Event } from "../event";
import { type ExerciseSet } from "../set";
import { type WorkoutId } from "../workout";
import { type ExerciseId } from "../exercise";
import {
  type ExerciseLogId,
  type SetLogId,
  type WorkoutSessionId,
} from "./model";

export type WorkoutSessionEvent =
  | Event<
      "workout_session_started",
      {
        session_id: WorkoutSessionId;
        template_id?: WorkoutId;
      }
    >
  | Event<
      "workout_session_finished",
      {
        session_id: WorkoutSessionId;
      }
    >;

export type ExerciseLogEvent =
  | Event<
      "exercise_log_created",
      {
        exercise_log_id: ExerciseLogId;
        session_id: WorkoutSessionId;
        order: number;
        exercise_id: ExerciseId;
        planned_exercise_id?: ExerciseId;
      }
    >
  | Event<
      "exercise_log_removed",
      {
        exercise_log_id: ExerciseLogId;
      }
    >;

export type SetLogEvent =
  | Event<
      "set_log_created",
      {
        set_log_id: SetLogId;
        exercise_log_id: ExerciseLogId;
        order: number;
        completed_at: number;
        set: ExerciseSet;
      }
    >
  | Event<
      "set_log_removed",
      {
        set_log_id: SetLogId;
      }
    >;

import type { Event } from "../shared";
import type { ExerciseSet } from "../set";
import type { WorkoutId } from "../workout";
import type { ExerciseId } from "../exercise";

export type WorkoutSessionEvent =
  | Event<
      "workout_session_started",
      {
        session_id: string;
        template_id?: WorkoutId;
      }
    >
  | Event<
      "workout_session_finished",
      {
        session_id: string;
      }
    >;

export type ExerciseLogEvent =
  | Event<
      "exercise_log_created",
      {
        exercise_log_id: string;
        session_id: string;
        planned_exercise_id?: ExerciseId;
        actual_exercise_id: ExerciseId;
        order: number;
      }
    >
  | Event<
      "exercise_log_removed",
      {
        exercise_log_id: string;
      }
    >;

export type ExerciseSetLogEvent =
  | Event<
      "exercise_set_log_created",
      {
        set_id: string;
        exercise_log_id: string;
        order: number;
        completed_at: number;
        data: ExerciseSet;
      }
    >
  | Event<
      "exercise_set_log_removed",
      {
        set_id: string;
      }
    >;

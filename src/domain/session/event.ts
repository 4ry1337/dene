import type { Event } from "../shared";
import type { ExerciseSet } from "../set";
import type { WorkoutId } from "../workout";
import type { ExerciseId } from "../exercise";
import { ExerciseLogId, SetLogId, WorkoutSessionId } from "./model";

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

export const WorkoutSessionEvent = {
  start: (
    session_id: WorkoutSessionId,
    template_id?: WorkoutId,
  ): Extract<WorkoutSessionEvent, { type: "workout_session_started" }> => ({
    type: "workout_session_started",
    created_at: Date.now(),
    data: { session_id, template_id },
  }),
  finish: (
    session_id: WorkoutSessionId,
  ): Extract<WorkoutSessionEvent, { type: "workout_session_finished" }> => ({
    type: "workout_session_finished",
    created_at: Date.now(),
    data: { session_id },
  }),
};

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

export const ExerciseLogEvent = {
  create: (
    exercise_log_id: ExerciseLogId,
    session_id: WorkoutSessionId,
    order: number,
    exercise_id: ExerciseId,
    planned_exercise_id?: ExerciseId,
  ): Extract<ExerciseLogEvent, { type: "exercise_log_created" }> => ({
    type: "exercise_log_created",
    created_at: Date.now(),
    data: {
      exercise_log_id,
      session_id,
      planned_exercise_id,
      exercise_id,
      order,
    },
  }),
  remove: (
    exercise_log_id: ExerciseLogId,
  ): Extract<ExerciseLogEvent, { type: "exercise_log_removed" }> => ({
    type: "exercise_log_removed",
    created_at: Date.now(),
    data: { exercise_log_id },
  }),
};

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

export const SetLogEvent = {
  create: (
    set_log_id: SetLogId,
    exercise_log_id: ExerciseLogId,
    order: number,
    completed_at: number,
    set: ExerciseSet,
  ): Extract<SetLogEvent, { type: "set_log_created" }> => ({
    type: "set_log_created",
    created_at: Date.now(),
    data: {
      set_log_id,
      exercise_log_id,
      order,
      completed_at,
      set,
    },
  }),
  remove: (
    set_log_id: SetLogId,
  ): Extract<SetLogEvent, { type: "set_log_removed" }> => ({
    type: "set_log_removed",
    created_at: Date.now(),
    data: { set_log_id },
  }),
};

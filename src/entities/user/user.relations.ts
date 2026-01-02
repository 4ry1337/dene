import { relations, sql } from 'drizzle-orm'
import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { users } from './user.schema'
import { exercises } from '../exercise'
import { workouts } from '../workout'
import { routines } from '../routine'

export const user_relations = relations( users, ( { many } ) => ( {
  exercises: many( user_exercise ),
  workouts: many( user_workout ),
  routines: many( user_routine ),
} ) )

export const user_exercise = sqliteTable( 'user_exercise', {
  user_id: integer().notNull().references( () => users.id, { onDelete: 'cascade' } ),
  exercise_id: integer().notNull().references( () => exercises.id, { onDelete: 'cascade' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.user_id, t.exercise_id ] } )
] )

export const user_exercise_relations = relations( user_exercise, ( { one } ) => ( {
  user: one( users, {
    fields: [ user_exercise.user_id ],
    references: [ users.id ],
  } ),
  workout: one( exercises, {
    fields: [ user_exercise.exercise_id ],
    references: [ exercises.id ],
  } ),
} ) )

export const user_workout = sqliteTable( 'user_workout', {
  user_id: integer().notNull().references( () => users.id, { onDelete: 'cascade' } ),
  workout_id: integer().notNull().references( () => workouts.id, { onDelete: 'cascade' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.user_id, t.workout_id ] } )
] )

export const user_workout_relations = relations( user_workout, ( { one } ) => ( {
  user: one( users, {
    fields: [ user_workout.user_id ],
    references: [ users.id ],
  } ),
  workout: one( workouts, {
    fields: [ user_workout.workout_id ],
    references: [ workouts.id ],
  } ),
} ) )

export const user_routine = sqliteTable( 'user_routine', {
  user_id: integer().notNull().references( () => users.id ),
  routine_id: integer().notNull().references( () => routines.id, { onDelete: 'cascade' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.user_id, t.routine_id ] } )
] )

export const user_routine_relations = relations( user_routine, ( { one } ) => ( {
  user: one( users, {
    fields: [ user_routine.user_id ],
    references: [ users.id ],
  } ),
  routine: one( workouts, {
    fields: [ user_routine.routine_id ],
    references: [ workouts.id ],
  } ),
} ) )

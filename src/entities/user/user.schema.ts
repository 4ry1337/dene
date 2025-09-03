import { integer, sqliteTable, text, real, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import { workouts } from '../workout/workout.schema'
import { routines } from '../routine/routine.schema'
import { exercises } from '../exercise/exercise.schema'

export const users = sqliteTable( 'users', {
  id: integer().primaryKey( { autoIncrement: true } ),
  email: text().notNull().unique(),
  gender: text( { enum: [ 'male', 'female', 'other' ] } ),
  date_of_birth: integer( { mode: 'timestamp' } ),

  height: real(), // Height in cm or inches based on unit preference
  weight: real(), // Weight in kg or lbs based on unit preference
  unit: text( { enum: [ 'metric', 'imperial' ] } ).default( 'metric' ),

  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  updated_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
} )

export const user_relations = relations( users, ( { many, one } ) => ( {
  exercises: many( user_exercise ),
  workouts: many( user_workout ),
  routines: many( user_routine ),
} ) )

export const user_exercise = sqliteTable( 'user_exercise', {
  user_id: integer().references( () => users.id, { onDelete: 'cascade' } ),
  exercise_id: integer().references( () => exercises.id, { onDelete: 'cascade' } ),
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
  user_id: integer().references( () => users.id, { onDelete: 'cascade' } ),
  workout_id: integer().references( () => workouts.id, { onDelete: 'cascade' } ),
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
  user_id: integer().references( () => users.id ),
  routine_id: integer().references( () => routines.id, { onDelete: 'cascade' } ),
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

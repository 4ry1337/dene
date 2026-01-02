import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import { users } from '../user/user.schema'
import { exercises } from '../exercise/exercise.schema'

export const workouts = sqliteTable( 'workouts', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull(),
  description: text(),
  created_by: integer().references( () => users.id, { onDelete: 'set null' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  updated_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
} )

export const workout_relations = relations( workouts, ( { many, one } ) => ( {
  created_by: one( users, {
    fields: [ workouts.created_by ],
    references: [ users.id ]
  } ),
  exercises: many( workout_exercise )
} ) )

export const workout_exercise = sqliteTable( 'workout_exercise', {
  workout_id: integer().notNull().references( () => workouts.id, { onDelete: 'cascade' } ),
  exercise_id: integer().notNull().references( () => exercises.id, { onDelete: 'cascade' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  order: real().notNull().default( 0 ),
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.workout_id, t.exercise_id ] } )
] )

export const workout_exercise_relations = relations( workout_exercise, ( { one } ) => ( {
  workout: one( workouts, {
    fields: [ workout_exercise.workout_id ],
    references: [ workouts.id ]
  } ),
  exercise: one( exercises, {
    fields: [ workout_exercise.exercise_id ],
    references: [ exercises.id ]
  } )
} ) )

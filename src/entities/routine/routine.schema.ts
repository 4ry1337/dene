import { sql, relations } from 'drizzle-orm'
import { integer, text, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'
import { users } from '../user/user.schema'
import { workouts } from '../workout/workout.schema'

export const routines = sqliteTable( 'routines', {
  id: integer().primaryKey( { autoIncrement: true } ),
  current: integer( { mode: 'boolean' } ).notNull().default( false ),
  title: text().notNull(),
  description: text(),
  created_by: integer().references( () => users.id, { onDelete: 'set null' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  updated_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
} )

export const routine_relations = relations( routines, ( { many, one } ) => ( {
  creator: one( users, {
    fields: [ routines.created_by ],
    references: [ users.id ]
  } ),
  workouts: many( routine_workout ),
} ) )

export const routine_workout = sqliteTable( 'routine_workout', {
  routine_id: integer().notNull().references( () => routines.id, { onDelete: 'cascade' } ),
  workout_id: integer().notNull().references( () => workouts.id, { onDelete: 'cascade' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.routine_id, t.workout_id ] } )
] )

export const routine_workout_relations = relations( routine_workout, ( { one } ) => ( {
  routine: one( routines, {
    fields: [ routine_workout.routine_id ],
    references: [ routines.id ]
  } ),
  workout: one( workouts, {
    fields: [ routine_workout.workout_id ],
    references: [ workouts.id ]
  } )
} ) )

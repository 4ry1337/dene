import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable( 'users', {
  id: integer( 'id' ).primaryKey( { autoIncrement: true } ),
  email: text( 'email' ).notNull().unique(),
  gender: text( 'gender', { enum: [ 'male', 'female', 'other' ] } ),
  height: real( 'height' ), // Height in cm or inches based on unit preference
  weight: real( 'weight' ), // Weight in kg or lbs based on unit preference
  unit: text( 'unit_system', { enum: [ 'metric', 'imperial' ] } ).default( 'metric' ),
  created_at: integer( 'created_at', { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  updated_at: integer( 'updated_at', { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
} )

export const exercise_type = sqliteTable( 'exercise_types', {
  id: integer( 'id' ).primaryKey( { autoIncrement: true } ),
  name: text( 'name' ).notNull(),
  description: text( 'description' ),
  created_at: integer( 'created_at', { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
} )

export const exercises = sqliteTable( 'exercises', {
  id: integer( 'id' ).primaryKey( { autoIncrement: true } ),
  name: text( 'name' ).notNull(),
  exercie_type: integer( 'exercise_id' ).notNull().references( () => exercise_type.id ),
  created_at: integer( 'created_at', { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  update_at: integer( 'update_at', { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
} )

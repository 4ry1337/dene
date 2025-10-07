import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable( 'users', {
  id: integer().primaryKey( { autoIncrement: true } ),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  gender: text( { enum: [ 'male', 'female', 'other' ] } ),
  date_of_birth: integer( { mode: 'timestamp' } ),

  height: real(), // Height in cm or inches based on unit preference
  weight: real(), // Weight in kg or lbs based on unit preference
  unit: text( { enum: [ 'metric', 'imperial' ] } ).default( 'metric' ),

  created_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  updated_at: integer( { mode: 'timestamp' } ).default( sql`(CURRENT_TIMESTAMP)` ),
  deleted_at: integer( { mode: 'timestamp' } )
} )

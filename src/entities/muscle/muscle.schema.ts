import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const muscles = sqliteTable( 'muscles', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull().unique(),
  image: blob( { mode: 'buffer' } )
} )

export const muscle_group = sqliteTable( 'muscle_group', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull().unique(),
  image: blob( { mode: 'buffer' } )
} )

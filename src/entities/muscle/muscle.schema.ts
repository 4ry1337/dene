import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

export const muscle_group = sqliteTable( 'muscle_group', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull().unique(),
  image: blob( { mode: 'buffer' } )
} )

export const muscle_group_relations = relations( muscle_group, ( { many } ) => ( {
  muscles: many( muscles )
} ) )

export const muscles = sqliteTable( 'muscles', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull().unique(),
  muscle_group_id: integer().references( () => muscle_group.id, { onDelete: 'set null' } ),
  image: blob( { mode: 'buffer' } )
} )

export const muscle_relations = relations( muscles, ( { one } ) => ( {
  group: one( muscle_group, {
    fields: [ muscles.muscle_group_id ],
    references: [ muscle_group.id ]
  } )
} ) )

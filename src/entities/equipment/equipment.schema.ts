import { sqliteTable, integer, blob, text } from 'drizzle-orm/sqlite-core'

export const equipments = sqliteTable( 'equipments', {
  id: integer().primaryKey( { autoIncrement: true } ),
  name: text().notNull().unique(),
  image: blob( { mode: 'buffer' } )
} )

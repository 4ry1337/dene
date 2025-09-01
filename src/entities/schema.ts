import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'

export const exercies = sqliteTable( 'exercies', {
  id: int( 'id' ).primaryKey( { autoIncrement: true } ),
  name: text( 'name' ).notNull(),
} )


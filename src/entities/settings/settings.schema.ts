import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const settings = sqliteTable( 'settings', {
  push_notifications: integer( { mode: 'boolean' } ),
} )

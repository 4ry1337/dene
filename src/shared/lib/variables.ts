import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

export const DATABASE_NAME = 'dene.db'

// Initialize database connection
export const expo_db = openDatabaseSync( DATABASE_NAME, { enableChangeListener: true } )
export const drizzle_db = drizzle( expo_db, { logger: true } )

/* import { DATABASE_NAME } from '@/shared/lib'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { users } from '@/entities/user/user.schema'
import { CreateUserSchema, type CreateUserDTO } from './create-user.contract'

const expo = openDatabaseSync( DATABASE_NAME )
const db = drizzle( expo, { logger: true } )

export type CreateUserResult = {
  id: number
}

export async function createUser( input: CreateUserDTO ): Promise<CreateUserResult> {
  const parsed = CreateUserSchema.parse( input )

  const [ inserted ] = await db.insert( users ).values( parsed ).returning( { id: users.id } )

  return { id: inserted.id }
} */

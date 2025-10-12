import { users } from '@/entities/user/user.schema'
import { CreateUserSchema, type CreateUserDTO } from './create-user.contract'
import { drizzle_db } from '@/shared/lib'

export type CreateUserResult = {
  id: number,
  username: string,
  email: string,
}

export async function createUser( input: CreateUserDTO ): Promise<CreateUserResult> {
  const parsed = CreateUserSchema.parse( input )

  const [ inserted ] = await drizzle_db.insert( users )
    .values( parsed )
    .returning( {
      id: users.id,
      username: users.username,
      email: users.email
    } )

  return {
    id: inserted.id,
    username: inserted.username,
    email: inserted.email
  }
}

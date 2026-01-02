import { users } from '@/entities/user/user.schema'
import { drizzle_db } from '@/shared/lib'
import { CreateExerciseDTO, CreateExerciseSchema } from './create-exercise.contract'
import { exercises } from '@/entities/exercise'

export type CreateExerciseResult = {
  id: number,
}

export async function createExercise( input: CreateExerciseDTO ): Promise<CreateExerciseResult> {
  const parsed = CreateExerciseSchema.parse( input )

  const [ inserted ] = await drizzle_db.insert( exercises )
    .values( parsed )
    .returning( {
      id: users.id,
    } )

  return {
    id: inserted.id,
  }
}
